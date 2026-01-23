// htmlHelpers.js
// Utilities for loading data, creating calcite-combobox items, and handling tooltips

import { loadParquet } from './dataProcessor.js';


/**
 * Append <calcite-combobox-item> elements to a parent element.
 * @param {HTMLElement} comboboxEl - The combobox container.
 * @param {string[]} values - Array of values to append.
 */
function appendComboboxItems(comboboxEl, values) {
  if (!comboboxEl) return;
  values.sort().forEach(val => {
    const item = document.createElement('calcite-combobox-item');
    item.setAttribute('value', val);
    const header = formatHeader(val)
    //The display name should be different than the value
    item.setAttribute('heading', header);
    comboboxEl.append(item);
  });
}

/**
 * Format a header string: remove underscores, capitalize words,
 * and handle specific exceptions
 * @param {string} str - The string to format
 * @returns {string} - Formatted string
 */
export function formatHeader(str) {
  if (!str) return "";

  // Define exceptions
  const exceptions = {
    "community_center_dist": "Community Center Distance",
    "library_dist": "Library Distance",
    "burn_prob": "Burn Probability",
    "flame_length": "Flame Length"	  
  };

  // Check if str matches an exception
  if (exceptions[str]) return exceptions[str];

  //remove underscores, capitalize each word
  return str
    .replace(/_/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}


/**
 * Attach a change listener to a calcite-combobox.
 * Always returns an array of selected values (or empty array).
 * @param {HTMLElement} comboboxEl
 * @param {Function} callback - Receives selected values array.
 */
function attachComboboxListener(comboboxEl, callback) {
  if (!comboboxEl) return;

  comboboxEl.addEventListener('calciteComboboxChange', () => {
    const values = comboboxEl.selectedItems?.map(item => item.value) || [];
    callback(values);
  });
}

/**
 * Append items to a grouped combobox section based on type.
 * @param {HTMLElement} groupEl
 * @param {Array} data
 * @param {string} type - "asset" or "harm"
 */
function appendGroupedItems(groupEl, data, type) {
  if (!groupEl) return;
  const values = data.filter(d => d.type === type).map(d => d.value);
  appendComboboxItems(groupEl, values);
}

/**
 * Creates and populates place selection items.
 * @param {HTMLElement} comboboxEl
 * @param {Function} callback - Receives a single normalized string or null.
 * @param {string} filename - Optional Parquet file name
 */
export async function createPlaceElements(comboboxEl, callback, filename = 'places.parquet') {
  try {
    const data = await loadParquet(filename);
    const placeNames = data.map(d => d.name);
    appendComboboxItems(comboboxEl, placeNames);

    attachComboboxListener(comboboxEl, (values) => {
      // Take first value and normalize
      const normalized = values[0]?.replaceAll(/[ /]/g, "_").toLowerCase() || null;
      callback(normalized);
    });
  } catch (err) {
    console.error("Failed to create place elements:", err);
  }
}

/**
 * Creates and populates indicator items grouped by "Harms" and "Assets".
 * @param {HTMLElement} comboboxEl
 * @param {Function} callback - Receives an array of selected values or null.
 * @param {string} filename - Optional Parquet file name
 */
export async function createIndicatorElements(comboboxEl, callback, filename = 'harms_assets.parquet') {
  try {
    const data = await loadParquet(filename);
    const harmsGroup = comboboxEl.querySelector('calcite-combobox-item-group[label="Harms"]');
    const assetsGroup = comboboxEl.querySelector('calcite-combobox-item-group[label="Assets"]');

    appendGroupedItems(assetsGroup, data, 'asset');
    appendGroupedItems(harmsGroup, data, 'harm');

    attachComboboxListener(comboboxEl, (values) => {
      callback(values.length ? values : null);
    });
  } catch (err) {
    console.error("Failed to create indicator elements:", err);
  }
}

/**
 * Attach a listener to a calcite-radio-button-group.
 * @param {HTMLElement|string} radioGroupEl - Element or selector.
 * @param {Function} callback - Receives selected value.
 */
export function attachRadioListener(radioGroupEl, callback) {
  const el = typeof radioGroupEl === 'string' ? document.getElementById(radioGroupEl) : radioGroupEl;
  if (!el) return;

  el.addEventListener("calciteRadioButtonGroupChange", () => {
    callback(el.value);
  });
}

/**
 * Tooltip helper functions
 */
function showTooltip(tooltipEl, content, x, y) {
  if (!tooltipEl) return;
  tooltipEl.innerHTML = content;
  tooltipEl.style.left = `${x}px`;
  tooltipEl.style.top = `${y}px`;
  tooltipEl.style.display = 'block';
}

function hideTooltip(tooltipEl) {
  if (tooltipEl) tooltipEl.style.display = 'none';
}

/**
 * Attach a hover tooltip to a map view for a hex layer.
 * @param {Object} view - Map view object
 * @param {Object} hexLayer - Layer containing hex graphics
 */
export function attachHoverTooltip(view, hexLayer) {
  const tooltip = document.getElementById("hover-tooltip");
  if (!tooltip) return;

  let scheduled = false;

  async function updateTooltip(event) {
    const response = await view.hitTest(event, { include: hexLayer });
    if (response.results.length) {
      const hitGraphic = response.results[0].graphic;
      const originalGraphic = hexLayer.source.items.find(
        g => g.attributes.grid_id === hitGraphic.attributes.grid_id
      );

      if (originalGraphic) {
        const attrs = originalGraphic.attributes;
        const { native: { clientX: x, clientY: y } } = event;
        showTooltip(
          tooltip,
          `<div><strong>Harms:</strong> ${attrs.final_value_harms}</div>
           <div><strong>Assets:</strong> ${attrs.final_value_assets}</div>`,
          x,
          y
        );
      }
    } else {
      hideTooltip(tooltip);
    }
  }

  view.on("pointer-move", (event) => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(async () => {
      scheduled = false;
      await updateTooltip(event);
    });
  });

  view.on("pointer-leave", () => hideTooltip(tooltip));
}
