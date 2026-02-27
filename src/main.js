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

// Wait until DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {

  // ------------------ DOM ELEMENTS ------------------
  const indicatorCombo = document.querySelector('#indicator-combobox');
  const placeCombo = document.querySelector('#place-combobox');
  const radioGroup = document.querySelector("#comparison-region calcite-radio-button-group");
  const mapComponent = document.querySelector("arcgis-map");
  const view = mapComponent.view;

  const info_dialog = document.getElementById("info-dialog");
  const user_guide_dialog = document.getElementById("guide-dialog");

  const aboutAction = document.getElementById("about-action");
  const userAction = document.getElementById("guide-action");
  const legendEl = document.getElementById('legend-container');


  // --------------------CLICK FUNCTIONALITY -----------------
  aboutAction.addEventListener("click", () => info_dialog.open = true);
  userAction.addEventListener("click", () => user_guide_dialog.open = true);

  // ------------------ MAP ------------------
  initMapHandler(view);

  if (legendEl) {
    view.ui.add(legendEl, "bottom-left");
    legendEl.style.display = "block";
  }

  // ------------------ INDICATOR DROPDOWN ------------------
  if (indicatorCombo) {
    createIndicatorElements(indicatorCombo, (selectedIndicators) => {
      setIndicators(selectedIndicators);
    });

    indicatorCombo.addEventListener("calciteComboboxChange", () => {
      setIndicators(indicatorCombo.selectedItems.length ? indicatorCombo.selectedItems : []);
    });

    indicatorCombo.selectionDisplay = "single";
    indicatorCombo.selectAllEnabled = true;
    indicatorCombo.requestUpdate();
  }

  // ------------------ PLACE DROPDOWN ------------------
  if (placeCombo) {
    createPlaceElements(placeCombo, (selectedPlace) => {
      if (selectedPlace) loadCity(`${selectedPlace}.parquet`);
      else clearCity();
    });
  }

  // ------------------ REGION RADIO BUTTONS ------------------
  if (radioGroup) {
    attachRadioListener(radioGroup, () => {
      setRegion(radioGroup.selectedItem.value);
    });
  }

  // ------------------ LAYER CHECKBOXES ------------------
  ["tsunami_zone", "electric_transmission_lines", "highway"].forEach(layerName => {
    const checkbox = document.getElementById(layerName);
    if (checkbox) {
      checkbox.addEventListener("change", (e) => toggleLayer(layerName, e.target.checked));
    }
  });

});
