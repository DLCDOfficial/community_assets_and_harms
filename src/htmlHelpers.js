// htmlHelpers.js
// Utility to load harms/assets and place names
// and create HTML components for dropdown selections

import { snappyUncompressor } from 'hysnappy';

/**
 * Load and parse a Parquet file.
 * @param {string} filename - The parquet filename (relative to VITE_PATH).
 * @returns Parsed parquet data.
 */
async function loadParquet(filename) {
  const { asyncBufferFromUrl, parquetQuery } = await import('hyparquet');
  const prefix = import.meta.env.VITE_PATH;
  const file = await asyncBufferFromUrl({ url: `${prefix}/${filename}` });
  return parquetQuery({
    file,
    compressors: { SNAPPY: snappyUncompressor() }
  });
}

/**
 * Create <calcite-combobox-item> elements from an array of strings.
 * @param {HTMLElement} parentEl - The element to append items to.
 * @param {string[]} values - The list of values/headings.
 */
function appendComboboxItems(parentEl, values) {
  values.sort().forEach(val => {
    const el = document.createElement('calcite-combobox-item');
    el.setAttribute('value', val);
    el.setAttribute('heading', val);
    parentEl.append(el);
  });
}

/**
 * Attach a change listener to a combobox.
 * @param {HTMLElement} parentEl - The combobox element.
 * @param {Function} cb - Callback for selection change.
 * @param {object} options
 * @param {boolean} [options.multi=false] - Whether multiple selection is allowed.
 * @param {boolean} [options.normalize=false] - Whether to normalize single values.
 */
function attachComboboxListener(parentEl, cb, { multi = false, normalize = false } = {}) {
  parentEl.addEventListener('calciteComboboxChange', () => {
    if (parentEl.selectedItems.length > 0) {
      let values = parentEl.selectedItems.map(item => item.value);
      if (!multi) {
        values = values[0];
        if (normalize && values) {
          values = values.replaceAll(/[ /]/g, "_").toLowerCase();
        }
      }
      cb(values);
    } else {
      cb(null);
    }
  });
}

/**
 * Creates and appends `<calcite-combobox-item>` elements to a given parent element
 * based on place names loaded from a Parquet file (`places.parquet`).
 *
 * @param {HTMLElement} parentEl - The `<calcite-combobox>` container.
 * @param {Function} cb - Callback receiving the selected place string or null.
 */
export async function createPlaceElements(parentEl, cb) {
  const data = await loadParquet('places.parquet');
  const placeNames = data.map(d => d.name);
  appendComboboxItems(parentEl, placeNames);
  attachComboboxListener(parentEl, cb, { multi: false, normalize: true });
}

/**
 * Creates and appends `<calcite-combobox-item>` elements grouped as harms/assets
 * based on data from `harms_assets.parquet`.
 *
 * @param {HTMLElement} parentEl - The `<calcite-combobox>` container.
 * @param {Function} cb - Callback receiving array of selected values or null.
 */
export async function createIndicatorElements(parentEl, cb) {
  const data = await loadParquet('harms_assets.parquet');

  const harmsGroup = parentEl.querySelector('calcite-combobox-item-group[label="Harms"]');
  const assetsGroup = parentEl.querySelector('calcite-combobox-item-group[label="Assets"]');

  appendComboboxItems(assetsGroup, data.filter(d => d.type === 'asset').map(d => d.value));
  appendComboboxItems(harmsGroup, data.filter(d => d.type === 'harm').map(d => d.value));

  attachComboboxListener(parentEl, cb, { multi: true });
}


/**
 * Attach a listener to a calcite-radio-button-group
 * @param {string|HTMLElement} selectorOrEl - ID selector or element
 * @param {Function} cb - Callback receiving selected value
 */
export function attachRadioListener(radioGroup, callback) {
  if (!radioGroup) return; // safety check

  radioGroup.addEventListener("calciteRadioButtonGroupChange", () => {
    const selectedValue = radioGroup.value;
    callback(selectedValue);
  });
}

 export function attachHoverTooltip(view, hexLayer) {
  let tooltip = document.getElementById("hover-tooltip");
  let lastUpdate = 0;
  const milliseconds = 30; // milliseconds

  view.on("pointer-move", async (event) => {
    const now = performance.now();
    if (now - lastUpdate < milliseconds) return; // skip if within throttle window
    lastUpdate = now;

    const response = await view.hitTest(event, { include: hexLayer });
    if (response.results.length) {
      const hitGraphic = response.results[0].graphic;
      const originalGraphic = hexLayer.source.items.find(
        g => g.attributes.grid_id === hitGraphic.attributes.grid_id
      );

      if (originalGraphic) {
        const attrs = originalGraphic.attributes;
        tooltip.innerHTML = `
          <div><strong>Harms:</strong> ${attrs.final_value_harms}</div>
          <div><strong>Assets:</strong> ${attrs.final_value_assets}</div>
        `;
        tooltip.style.left = event.x + -50 + "px";
        tooltip.style.top = event.y + 200 + "px";
        tooltip.style.display = "block";
      }
    } else {
      tooltip.style.display = "none";
    }
  });

  view.on("pointer-leave", () => {
    const tooltip = document.getElementById("hover-tooltip");
    if (tooltip) tooltip.style.display = "none";
  });
}