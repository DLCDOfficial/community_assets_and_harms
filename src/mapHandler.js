// mapHandler.js
import Graphic from "@arcgis/core/Graphic.js";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer.js";
import { cellToBoundary } from "h3-js";
import { generateRenderer } from './renderer.js';
import { calculateValue } from './calculate.js';
import { loadHexData } from './dataProcessor.js';
import { attachHoverTooltip } from './htmlHelpers.js';
import "@arcgis/map-components/components/arcgis-map";
import "@arcgis/map-components/components/arcgis-zoom";
import "@arcgis/map-components/components/arcgis-legend";
import "@arcgis/map-components/components/arcgis-search";

// ------------------ State Variables ------------------
let view = null;
let hexLayer = null;
let hexStore = null;
let cityFile = null;
let indicators = null;
let region = 'ugb_pct_rank';

// ------------------ Hex Layer Utilities ------------------

/**
 *  Create a FeatureLayer of hexagons from a list of unique hex IDs.
 * 
 * @param {Array} uniqueHexes 
 * @param {} map 
 * @returns  {FeatureLayer}
 */
export function createHexLayer(uniqueHexes, map) {
  if (map) {
    const layersToRemove = map.layers.filter(layer => layer instanceof FeatureLayer);
    layersToRemove.forEach(layer => map.layers.remove(layer));
  }

  const graphics = uniqueHexes.map(hex => {
    const polygon = { type: "polygon", rings: cellToBoundary(hex, true) };
    const fillSymbol = {
      type: "simple-fill",
      color: [227, 139, 79, 0.6],
      outline: { color: [255, 255, 255, 0.8], width: 1 }
    };
    return new Graphic({
      geometry: polygon,
      symbol: fillSymbol,
      attributes: { grid_id: hex, hex_id: hex, final_value_assets: 0.0, final_value_harms: 0.0 }
    });
  });

  return new FeatureLayer({
    objectIdField: 'grid_id',
    popupEnabled: true,
    popupTemplate: {
      outFields: ['*'],
      content: (feature) =>
        `${feature.graphic.attributes.displayString}, ${feature.graphic.attributes.compositeKey}, ${feature.graphic.attributes.final_value_assets}, ${feature.graphic.attributes.final_value_harms}`
    },
    fields: [
      { name: "grid_id", type: "oid" },
      { name: "hex_id", type: "string" },
      { name: "final_value_harms", type: "double"},
      { name: "final_value_assets", type: "double"},
      { name: "compositeKey", type: "string" },
      { name: "displayString", type: "string" }
    ],
    renderer: generateRenderer(),
    source: graphics
  });
}

/**
 * Update hex layer attributes based on calculations from hexStore and user options.
 * @param {FeatureLayer} hexLayer 
 * @param {Object} hexStore the hexStore loaded from the parquet file. hexId -> array of data rows.
 * @param {Object} userOptions  
 *  userOptions: { indicators_set: Set<string>, region: string }      
 *       indicators_set: Set of selected indicator variable names.  
 *       region: The field to use for calculations (e.g., 'ugb_pct_rank', 'county_pct_rank', 'state_pct_rank').
 */

export async function updateHexValues(hexLayer, hexStore, userOptions) {
  const { indicators_set, region } = userOptions;
  const results = await hexLayer.queryFeatures();
  const edits = results.features.map(feature => {
    const hexId = feature.getAttribute('hex_id');
    const values = calculateValue(region, hexStore[hexId], indicators_set);

    feature.setAttribute('final_value_harms', values.avg_harms);
    feature.setAttribute('final_value_assets', values.avg_assets);
    feature.setAttribute('compositeKey', values.quartile_string);
    feature.setAttribute('displayString', values.displayString);

    return feature;
  });

  await hexLayer.applyEdits({ updateFeatures: edits });

  // Update in-memory graphics for hover tooltip
  //this is necessary because the hover tooltip uses the in-memory graphics, not the FeatureLayer source
  hexLayer.source.items.forEach(graphic => {
    const hexId = graphic.attributes.hex_id;
    if (hexStore[hexId]) {
      const values = calculateValue(region, hexStore[hexId], indicators_set);
      graphic.attributes.final_value_harms = values.avg_harms;
      graphic.attributes.final_value_assets = values.avg_assets;
      graphic.attributes.compositeKey = values.quartile_string;
      graphic.attributes.displayString = values.displayString;
    }
  });

  hexLayer.refresh();
}

// ------------------ Map Handler Functions ------------------

/** Initialize map handler with the map view.
 * @param {Object} mapView - The map view object.
 */
export function initMapHandler(mapView) { view = mapView; }

//getters and setters for state variables

/**
 * 
 * @param {*} selectedIndicators 
 */
export function setIndicators(selectedIndicators) {
  indicators = selectedIndicators;
  refreshHexLayer();
}

/**
 * 
 * @param {*} selectedRegion 
 */
export function setRegion(selectedRegion) {
  region = selectedRegion;
  refreshHexLayer();
}

/**
 * Load city data from a Parquet file and create/update the hex layer.
 * @param {string} fileName - The name of the Parquet file to load.
 */

export async function loadCity(fileName) {
  cityFile = fileName;
  const { hexStore: newHexStore, uniqueHexes } = await loadHexData(fileName);

  if (hexLayer) view.map.layers.remove(hexLayer);

  hexLayer = createHexLayer(uniqueHexes, view.map);
  hexStore = newHexStore;

  view.map.add(hexLayer);
  hexLayer.when(() => view.goTo(hexLayer.fullExtent.expand(1.15)));

  refreshHexLayer();
  attachHoverTooltip(view, hexLayer);
}

/** Clear the current city data and remove the hex layer from the map.
 */

export function clearCity() {
  if (hexLayer) view.map.layers.remove(hexLayer);
  hexLayer = null;
  hexStore = null;
  cityFile = null;
}

/** Refresh the hex layer by recalculating values based on current indicators and region.
 */

function refreshHexLayer() {
  if (!hexLayer || !hexStore || !indicators) return;
  const userOptions = { indicators_set: new Set(indicators), region };
  updateHexValues(hexLayer, hexStore, userOptions);
}
