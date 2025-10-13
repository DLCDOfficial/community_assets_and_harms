// This file contains the main calculation function to render colored hexes.
// & helper functions to facilitate this

//Hexes are colored based on average harms and assets values
// These scores are calculated based on the selected indicators and the comparison region (state, county, ugb)
// Each hex is assigned a bin (1-4) for harms and assets based on the average value for that hex
// The bin numbers are then combined into a string like "1,3" which maps to a defined color
import { formatHeader } from './htmlHelpers.js';



/**
 * assign a bin (1-4) for a value based on provided thresholds
 * This function is called to assign a bin number for assets and harms
 * 
 * @param {double} value the numeric value to bin
 * @returns {int} the bin number (1-4). the bin number is used to facilitate rendering the map with different colors.
 */
function assignBin(value) {

  // the quartile thresholds for the bins
  const thresholds = {q1:.25,q2:.5,q3:.75};

  if (value <= thresholds.q1) return 1;
  if (value <= thresholds.q2) return 2;
  if (value <= thresholds.q3) return 3;
  return 4;
}

/**
 * 
 * @param {int} bin // the bin number (1-4)
 * @returns  {string|null} the corresponding percentile string, or null if bin is out of range
 */
function getPercentileFromBin(bin) {
  //mapping of bin numbers to percentile strings
  const percentage_strings = { 1: "0-25%", 2: "25-50%", 3: "50-75%", 4: "75-100%" };
  return percentage_strings[bin] || null;}


//standard thresholds. We could change these if we wanted. 


/**
 * This function is a helper to build the display string for the popup.
 * It appends the newString to the appropriate bin in the displayStringObject.
 * This ensures that when we build the final display string, the variables are displayed from highest to lowest percentile.
 * 
 * @param {int} bin // the bin number (1-4)
 * @param {obj} displayStringObject // the object holding strings for each bin. 
 * @param {string} newString // the string to append (a single variable and its value)
 * @returns 
 */
function appendDisplayString(bin, displayStringObject, newString) {
  if(bin == 1){
    displayStringObject[1] += newString
    return;
  }
  if(bin == 2){
    displayStringObject[2] += newString
    return;
  }
  if(bin == 3){
    displayStringObject[3] += newString
    return;
  }
  if(bin == 4){
    displayStringObject[4] += newString
    return;
  }
  return;}
/**
 * main calculation function.
 * 
 * Calculates average values for harms and assets, then assigns bins based on thresholds.
 * @param {string} field the percentage rank field to use for calculations. ugb, county or state.
 * @param {object} rows the data rows for a single hexagon. A dictionary where the key is the hex ID, 
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

  //object to hold strings for each bin to facilitate ordered display in popup
  let displayStringObject = {1: '', 2: '', 3: '', 4: ''};

  //string to display in popup
  let displayString = '';

  //iterate through each row of data for this hex
  rows.forEach(row => {
    //skip if this variable is not in the selected indicators set
    if (!indicator_set.has(row.var)) return;

    const value = row[field];
    const quartileValue = assignBin(value);

    const percentageRange = getPercentileFromBin(quartileValue);
      
    const formatted_var = formatHeader(row.var)
    let currentString = `${formatted_var}: ${percentageRange} <br>`;
    appendDisplayString(quartileValue, displayStringObject, currentString);


    if (row.type === 'harm') {
      totalHarms += value;
      countHarms += 1;
    } else {
      totalAssets += value;
      countAssets += 1;
    }
  });


  // build the display string by concatenating in order of bins (4,3,2,1)
  // this ensures that higher percentile variables appear first in the popup

  // e.g. if a hex has one variable in the 75-100% bin and two in the 0-25% bin,
  // we want the 75-100% variable to appear first in the popup

 //sort ensures order is always 4,3,2,1
 //then we are checking if there is any string for that bin
 //if so, we append it to the displayString
  Object.keys(displayStringObject).sort((a, b) => b - a).forEach(bin => {
    
    if (displayStringObject[bin] !== '') {
      displayString += displayStringObject[bin];
      displayStringObject[bin] = '';
    }
  });

  const avgHarms = countHarms > 0 ? totalHarms / countHarms : 0;
  const avgAssets = countAssets > 0 ? totalAssets / countAssets : 0;

  const harmsBin = assignBin(avgHarms);
  const assetsBin = assignBin(avgAssets);

  const harmsRange = getPercentileFromBin(harmsBin);
  const assetsRange = getPercentileFromBin(assetsBin);

  // create the quartile string for rendering
  // based on what percentile bin the average harms and assets fall into
  const quartile_string = `${assignBin(avgAssets)},${assignBin(avgHarms)}`;

  return {
    avg_harms: harmsRange,
    avg_assets: assetsRange,
    quartile_string,
    displayString
  };
};

export { calculateValue };