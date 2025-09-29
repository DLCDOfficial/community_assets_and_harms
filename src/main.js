import "./styles.css";
import { loadHexData } from './dataProcessor.js';
import FeatureLayer from "@arcgis/core/layers/FeatureLayer.js";

import { createHexLayer, updateHexValues } from './mapHandler.js';
import { createPlaceElements, createIndicatorElements, attachRadioListener, attachHoverTooltip} from "./htmlHelpers.js";

// Individual imports for each component
import HighlightOptions from "@arcgis/core/views/support/HighlightOptions.js";

import "@arcgis/map-components/components/arcgis-map";
import "@arcgis/map-components/components/arcgis-zoom";
import "@arcgis/map-components/components/arcgis-legend";
import "@arcgis/map-components/components/arcgis-search";

const indicator_combo = document.querySelector('#indicator-combobox');
let city = null;
let indicators = null;
let region = 'ugb_pct_rank'; // default region

let previous_hex_layer = null;
let previous_hex_store = null;

createIndicatorElements(
  indicator_combo,
   (val) => {
    if (val) {
      indicators = val
    } else {
      indicators = null
    }
    if(city){
      const indicators_set = new Set(indicators);

      updateHexValues(previous_hex_layer, previous_hex_store, indicators_set, region);

    }
  }
);


// Force Calcite to respect selected-items-label
indicator_combo.selectionDisplay = "single";
indicator_combo.selectAllEnabled = true;
indicator_combo.requestUpdate(); // tells Calcite to re-render the label


// Dropdowns
createPlaceElements(
  document.querySelector('#place-combobox'),
  (val) => {
    if (val) {
      selectCity(`${val}.parquet`)
    } else {
      clearCity();
    }
  }
);

const radioGroup = document.querySelector("#comparison-region calcite-radio-button-group");

attachRadioListener(radioGroup, (selected) => {
  region =  radioGroup.selectedItem.value;
  if (indicators && city){
    const indicators_set = new Set(indicators);

    updateHexValues(previous_hex_layer, previous_hex_store, indicators_set, region);
  }   
  // update filters, map, etc.
});



// When the map loads, create a layer from the hexagons. THEN, update the values of each hexagon.
const viewElement = document.querySelector("arcgis-map");
//get the view in order to add hover event 
const view = viewElement.view;


// viewElement.addEventListener("arcgisViewReadyChange", async () => {
// });




async function selectCity(fileName) {
  city = fileName;

  if (!indicators) {
    console.log("no indicators selected");
  }

  const indicators_set = new Set(indicators);

  const { hexStore, uniqueHexes } = await loadHexData(fileName);

  // Create the layer
  const hexLayer = createHexLayer(uniqueHexes, view.map);
  previous_hex_layer = hexLayer;
  previous_hex_store = hexStore;

  // Add layer to the map
  view.map.add(hexLayer);

  // Zoom to layer once it’s ready
  hexLayer.when(() => {
    view.goTo(hexLayer.fullExtent.expand(1.15));
  });


  
  // Update hex values (color, fill, etc.)
  await updateHexValues(hexLayer, hexStore, indicators_set, region);
  attachHoverTooltip(view, hexLayer);
 
}

  




function clearCity() {
  console.log('clearCity')
    if (viewElement.map && previous_hex_layer) {
    const layersToRemove = viewElement.map.layers.filter(layer => layer instanceof FeatureLayer);
    layersToRemove.forEach(layer => viewElement.map.layers.remove(layer));}
  // clear city and reset extent to statewide
}

