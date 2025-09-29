// mapRenderer.js
// Utility functions for creating and updating ArcGIS FeatureLayers using H3 hexes

import Graphic from "@arcgis/core/Graphic.js";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer.js";
import { cellToBoundary } from "h3-js";
import { generateRenderer } from './renderer.js';
import { calculateValue} from './calculate.js';


/**
 * Create a FeatureLayer from a list of H3 hex IDs.
 *
 * @param {string[]} uniqueHexes - Array of H3 hex IDs.
 * @param {Object} map - ArcGIS Map object to which the layer will be added.
 * @returns {FeatureLayer} ArcGIS FeatureLayer ready to be added to the map.
 */
export function createHexLayer(uniqueHexes, map) {

  //if a layer has already been added, remove it
  if (map){
  const layersToRemove = map.layers.filter(layer => layer instanceof FeatureLayer);
  layersToRemove.forEach(layer => map.layers.remove(layer));}

  // Create graphics for each hex
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
      attributes: { grid_id: hex, hex_id: hex, final_value_assets: 0.0, final_value_harms: 0.0} }
    );
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
 * Update the attribute of each hex in the given FeatureLayer.
 *
 * @param {FeatureLayer} hexLayer - The FeatureLayer created by createHexLayer.
 * @param {Object<string, Object[]>} hexStore - Map of hex_id → array of data rows.
 */
export async function updateHexValues(hexLayer, hexStore, indicator_set, region) {

  const results = await hexLayer.queryFeatures();
  const edits = results.features.map(feature => {
    const hexId = feature.getAttribute('hex_id');
    const values = calculateValue(region, hexStore[hexId], indicator_set);

    feature.setAttribute('final_value_harms', values.avg_harms);
    feature.setAttribute('final_value_assets', values.avg_assets);
    feature.setAttribute('compositeKey', values.quartile_string);
    feature.setAttribute('displayString', values.displayString);

    return feature;
  });


  await hexLayer.applyEdits({ updateFeatures: edits });

   // 2️⃣ Update the in-memory graphics directly so hitTest sees them
  hexLayer.source.items.forEach(graphic => {
    const hexId = graphic.attributes.hex_id;
    if (hexStore[hexId]) {
      const values = calculateValue(region, hexStore[hexId], indicator_set);
      graphic.attributes.final_value_harms = values.avg_harms;
      graphic.attributes.final_value_assets = values.avg_assets;
      graphic.attributes.compositeKey = values.quartile_string;
      graphic.attributes.displayString = values.displayString;
    }
  });
  hexLayer.refresh();

 

}
