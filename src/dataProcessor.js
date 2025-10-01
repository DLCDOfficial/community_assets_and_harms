// dataProcessor.js
// Utility function for loading and structuring h3 hex data from a parquet fil
//  used as input for map handling. 

import { snappyUncompressor } from 'hysnappy';

/**
 * Load and parse a Parquet file.
 * Low-level function, returns raw data.
 *
 * @param {string} filename - Parquet file path relative to VITE_PATH.
 * @returns {Promise<Array<object>>} Parsed parquet data.
 */
export async function loadParquet(filename) {
  const { asyncBufferFromUrl, parquetQuery } = await import('hyparquet');
  const prefix = import.meta.env.VITE_PATH;
  const file = await asyncBufferFromUrl({ url: `${prefix}/${filename}` });

  return parquetQuery({
    file,
    compressors: { SNAPPY: snappyUncompressor() }
  });
}

/**
 * Load and structure hex grid data from a Parquet file.
 * Builds a hexStore keyed by 'grid_id' and a list of unique hex IDs.
 *
 * @param {string} parquetFile - Parquet file path relative to VITE_PATH.
 * @returns {Promise<{hexStore: Record<string, object[]>, uniqueHexes: string[]}>}
 */
export async function loadHexData(parquetFile) {
  const data = await loadParquet(parquetFile);

  const flags_data = {electric_transmission_lines: [],highway: [],tsunami_zone: []}
  const hexStore = {};
  data.forEach(d => {
    const id = d['grid_id'];

    const data_value = d['value'];
    const data_type = d['type'];
    if (data_type === 'flag' && data_value != 0) {
      console.log("FLAG!")
      const data_var= d['var'];
      console.log(data_var);
      flags_data[data_var].push(id);
    }
    if (!hexStore[id]) {
      hexStore[id] = [];
    }
    hexStore[id].push(d);
    
  });

  const uniqueHexes = Object.keys(hexStore);

  return { hexStore, uniqueHexes, flags_data };
}