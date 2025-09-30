// this file contains functions to calculate quartiles and assign bins
// as well as the main calculation function that returns a string to inform the rendering of the map

/**
 * assign a bin (1-4) for a value based on provided thresholds
 * 
 * This function is called to assign a bin number for assets and harms, which is then used to create a string like "1,3" that informs the rendering of the map.
 * 
 * @param {double} value the numeric value to bin
 * @param {{q1: number, q2: number, q3: number}} an object with q1, q2, and q3 properties representing the quartile thresholds. this is returned from getQuartileThresholds.
 * @returns {int} the bin number (1-4). the bin number is used to facilitate rendering the map with different colors for each bin.
 */
function assignBin(value, thresholds) {
  if (value <= thresholds.q1) return 1;
  if (value <= thresholds.q2) return 2;
  if (value <= thresholds.q3) return 3;
  return 4;
}


//standard thresholds. We could change these if we wanted. 

const fixed_thresholds = {q1:.25,q2:.5,q3:.75};



/**
 * main calculation function.
 * 
 * Calculates average values for harms and assets, then assigns bins based on thresholds.
 * @param {string} field the percentage rank field to use for calculations. ugb, county or state.
 * @param {object} rows <p>the data rows for a single hexagon. A dictionary where the key is the hex ID, 
 * and the value is an array of objects where each row is a variable (harm or asset) with its value and type.</p>
 * 
 * @returns {{avg_harms: number, avg_assets: number, quartile_string: string}} avg_harms, avg_assets, and a quartile_string like "1,3" that informs the rendering of the map.
 */
const calculateValue = (field = 'ugb_pct_rank', rows = [], indicator_set) => {
  //total harms/assets values (numerator for averaging)
  let totalHarms = 0;
  let totalAssets = 0;

  //number of harms/assets counted (denominator for averaging)
  let countHarms = 0;
  let countAssets = 0;

  //string to display in popup
  let displayString = '';

  //iterate through each row of data for this hex
  rows.forEach(row => {
    //skip if this variable is not in the selected indicators set
    if (!indicator_set.has(row.var)) return;

    const value = row[field];
    const quartileValue = assignBin(value, fixed_thresholds);
    displayString += `${row.var}: ${quartileValue} (${row.type})<br>`;

    if (row.type === 'harm') {
      totalHarms += value;
      countHarms += 1;
    } else {
      totalAssets += value;
      countAssets += 1;
    }
  });

  const avgHarms = countHarms > 0 ? totalHarms / countHarms : 0;
  const avgAssets = countAssets > 0 ? totalAssets / countAssets : 0;

  // create the quartile string for rendering
  // based on what percentile bin the average harms and assets fall into
  const quartile_string = `${assignBin(avgAssets, fixed_thresholds)},${assignBin(avgHarms, fixed_thresholds)}`;

  return {
    avg_harms: avgHarms,
    avg_assets: avgAssets,
    quartile_string,
    displayString
  };
};

export { calculateValue };