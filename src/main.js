import "./styles.css";

import { 
  initMapHandler, 
  loadCity, 
  clearCity, 
  setIndicators, 
  setRegion,
  toggleLayer
} from './mapHandler.js';


import { 
  createPlaceElements, 
  createIndicatorElements, 
  attachRadioListener 
} from "./htmlHelpers.js";

import "@arcgis/map-components/components/arcgis-map";
import "@arcgis/map-components/components/arcgis-zoom";
import "@arcgis/map-components/components/arcgis-legend";
import "@arcgis/map-components/components/arcgis-search";

// ------------------ UI Elements ------------------
const indicatorCombo = document.querySelector('#indicator-combobox');
const placeCombo = document.querySelector('#place-combobox');
const radioGroup = document.querySelector("#comparison-region calcite-radio-button-group");
const mapComponent = document.querySelector("arcgis-map");
const view = mapComponent.view;

// ------------------ Initialize Map ------------------
initMapHandler(view);

const legendEl = document.getElementById('legend-container');
view.ui.add(legendEl, "bottom-left");
legendEl.style.display = "block";

// ------------------ Indicator Dropdown ------------------
createIndicatorElements(indicatorCombo, (selectedIndicators) => {
  setIndicators(selectedIndicators);
});

// Force Calcite to only show a single selected item in the combobox display, but allow multiple selection.
indicatorCombo.selectionDisplay = "single";
indicatorCombo.selectAllEnabled = true;
indicatorCombo.requestUpdate();

// ------------------ Place Dropdown ------------------
createPlaceElements(placeCombo, (selectedPlace) => {
  if (selectedPlace) {
    loadCity(`${selectedPlace}.parquet`);
  } else {
    clearCity();
  }
});

// ------------------ Region Radio Buttons ------------------
attachRadioListener(radioGroup, () => {
  setRegion(radioGroup.selectedItem.value);
});

// ------------------ Layer Checkbox Controls ------------------
["tsunami_zone","electric_transmission_lines","highway"].forEach(layerName => {
  const checkbox = document.getElementById(layerName);
  if (checkbox) {
    checkbox.addEventListener("change", (e) => {
      toggleLayer(layerName, e.target.checked);
    });
  }
});

