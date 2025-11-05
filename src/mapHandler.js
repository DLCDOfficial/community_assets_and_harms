// mapHandler.js
import Graphic from "@arcgis/core/Graphic.js";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer.js";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer.js";

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

// Reference to the map view
let view = null;

// Reference to the hex layer that is currently displayed
let hexLayer = null;

// hex data loaded from Parquet file. where hexStore[hexId] = array of data rows for that hex
let hexStore = null;

// Store references to screener layers for toggling visibility
let screenerLayers = {};

//currently highlighted cell in the legend
let highlightedCell = null;

//current city file, indicators, and region
let cityFile = null;
let indicators = null;
let region = 'ugb_pct_rank';

//screener colors
let colors = {tsunami_zone: [255, 0, 0, 1],electric_transmission_lines: [0, 0, 255, 1],highway: [0, 255, 0, 1]};

// ------------------ Hex Layer Utilities ------------------

/**
 *  Create a FeatureLayer of hexagons from a list of unique hex IDs.
 * 
 * @param {Array} uniqueHexes 
 * @param {} map 
 * @returns  {FeatureLayer}
 */
export function createHexLayer(uniqueHexes, map) {
 

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
    opacity: 0.85,
    popupEnabled: true,
    popupTemplate: {
      
      outFields: ['*'],
      content: (feature) =>
        `${feature.graphic.attributes.displayString}`
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
 * Adds an array of H3 hex IDs to a map as outlined hexes.
 * Used for displaying screener layers like tsunami zones, highways, etc.
 * 
 * @param {Map} map - The ArcGIS Map object.
 * @param {string[]} hexIds - Array of H3 hex IDs.
 */
function addHexOutlinesToMap(map, screenerInfo) {
  const { hexIds, color, layerName } = screenerInfo;
  const hexGraphics = hexIds.map(hexId => {
    const boundary = cellToBoundary(hexId, true); // true = GeoJSON [lng, lat]

    return new Graphic({
      geometry: {
        type: "polygon",
        rings: boundary.map(([lng, lat]) => [lng, lat]),
        spatialReference: { wkid: 4326 }
      },
      symbol: {
        type: "simple-fill",
        color: [0, 0, 0, 0],       // Transparent fill
        outline: {
          color: color,  // Red outline [255, 0, 0, 1]
          width: 1
        }
      }
    });
  });

  const layer = new GraphicsLayer({
    graphics: hexGraphics,
    visible: false
  });

  map.add(layer);
  console.log("Added screener layer:", layerName);
  screenerLayers[layerName] = layer;
}

/**
 * Update hex layer attributes based on calculations from hexStore and user options.
 * updates the FeatureLayer and in-memory graphics for hover tooltips.
 * 
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

  const hexValuesMap = {}; // to store calculated values for each hex
  // so we can update the in-memory graphics for hover tooltip without recalling calculateValue
  const edits = results.features.map(feature => {
    const hexId = feature.getAttribute('hex_id');
    const values = calculateValue(region, hexStore[hexId], indicators_set);

    feature.setAttribute('final_value_harms', values.avg_harms);
    feature.setAttribute('final_value_assets', values.avg_assets);
    feature.setAttribute('compositeKey', values.quartile_string);
    feature.setAttribute('displayString', values.displayString);
    hexValuesMap[hexId] = values; // save for later
    return feature;
  });

  await hexLayer.applyEdits({ updateFeatures: edits });

  // Update in-memory graphics for hover tooltip
  //this is necessary because the hover tooltip uses the in-memory graphics, not the FeatureLayer source
  hexLayer.source.items.forEach(graphic => {
    const hexId = graphic.attributes.hex_id;
    if (hexStore[hexId]) {
      const values = hexValuesMap[hexId];
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
export function initMapHandler(mapView) { view = mapView; 

    // Configure popup so it never goes offscreen
  view.popup.dockEnabled = true;
  view.popup.dockOptions = {
    buttonEnabled: false,
    breakpoint: false,
  };
  view.popup.maxHeight = 200; 

  // Add click handler for hexes
  view.on("click", async (event) => {
    const response = await view.hitTest(event);

  if (highlightedCell) {
    highlightedCell.style.border = '';
  }
    
    // Filter for  hex layer only
    const results = response.results.filter(r => r.graphic.layer === hexLayer);
    
    if (results.length > 0) {
      const graphic = results[0].graphic;
      const hexId = graphic.attributes.hex_id;
      const rendererString = graphic.attributes.compositeKey;
      
      console.log("Hex clicked:", rendererString);

     const legend_div = document.getElementById(rendererString)
     console.log(legend_div)

     legend_div.style.border = "3px solid yellow";  
     highlightedCell =legend_div    

    }
  });
}


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
  const { hexStore: newHexStore, uniqueHexes, flags_data } = await loadHexData(fileName);

  if (view.map) {
    clearAllLayers();
  }

  hexLayer = createHexLayer(uniqueHexes, view.map);

 
  hexStore = newHexStore;

  view.map.add(hexLayer);
  hexLayer.when(() => view.goTo(hexLayer.fullExtent.expand(1.15)));

  refreshHexLayer();
  attachHoverTooltip(view, hexLayer);
   for (const flag in flags_data) {
    if (flags_data[flag].length > 0) {
      console.log("Adding screener layer for:", flag);
      addHexOutlinesToMap(view.map, {hexIds: flags_data[flag], color: colors[flag], layerName: flag} );
    }
  }

  ["tsunami_zone","electric_transmission_lines","highway"].forEach(layerName => {
  const checkbox = document.getElementById(layerName);
  if (checkbox) {
    toggleLayer(layerName, checkbox.checked);
    }
  });
  

  
}

/** Clear the current city data and remove the hex layer from the map.
 */

export function clearCity() {
  clearAllLayers();

   view.goTo({
    center: [-120.5, 44.0], // [longitude, latitude]
    zoom: 6            // replace with your original zoom level
  });
}


/** Refresh the hex layer by recalculating values based on current indicators and region.
 */

function refreshHexLayer() {
  if (!hexLayer || !hexStore || !indicators) return;
  const userOptions = { indicators_set: new Set(indicators), region };
  updateHexValues(hexLayer, hexStore, userOptions);
}


/** 
 *  Clear all layers that have been added to a map.
 */
function clearAllLayers() {
  if (hexLayer) view.map.layers.remove(hexLayer);
  if (screenerLayers) {
    for (const layer in screenerLayers) {
      view.map.layers.remove(screenerLayers[layer]);  }
    }
  hexLayer = null;
  hexStore = null;
  screenerLayers = {};
  cityFile = null;
}

/**
 * Toggle visibility of a stored layer.
 * @param {string} layerName - The name of the layer to toggle.
 * @param {boolean} visible - true = show, false = hide
 */
export function toggleLayer(layerName, visible = true) {
  console.log("Toggling layer:", layerName, "to", visible);
  console.log(screenerLayers);
  const layer = screenerLayers[layerName]; // screenerLayers is object storing layer references
  if (layer) {
    console.log(`Toggling layer "${layerName}" to ${visible}`);
    layer.visible = visible;
  } else {
    console.warn(`Layer "${layerName}" not found.`);
  }
}