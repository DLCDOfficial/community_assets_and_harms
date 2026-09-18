const defaultSym = {
    type: "simple-fill", // autocasts as new SimpleFillSymbol()
    outline: {
        // autocasts as new SimpleLineSymbol()
        color: [128, 128, 128, 1],
        width: "0.5px",
    },
};


/**
 * generates a unique value renderer for the hex layer based on the compositeKey attribute.
 * the compositeKey is a string like "1,3" that indicates the bin for assets and harms.
 * 
 * @param {string} field the field to use for unique value rendering. should be "compositeKey" to match the feature attribute set in updateHexValues. ( see mapHandler.js)
 * @returns {object} renderer object for use in FeatureLayer
 */
export const generateRenderer = (field = "compositeKey") => {
  return {
    type: "unique-value",
    field,
    legendOptions: { title: "UGB Assets vs Harms" },
    defaultSymbol: {
      type: "simple-fill",
      color: "#cccccc",
      outline: { color: [0, 0, 0, 0.2], width: 0.5 }
    },
    uniqueValueInfos: [
      { value: "1,1", label: "Assets:1, Harms:1", symbol: { type: "simple-fill", color: "#ffffff5b", outline: { color: [0, 0, 0, 0.2], width: 0.5 } } },
      { value: "1,2", label: "Assets:1, Harms:2", symbol: { type: "simple-fill", color: "#f5eef1", outline: { color: [0, 0, 0, 0.2], width: 0.5 } } },
      { value: "1,3", label: "Assets:1, Harms:3", symbol: { type: "simple-fill", color: "#f1d6f0", outline: { color: [0, 0, 0, 0.2], width: 0.5 } } },
      { value: "1,4", label: "Assets:1, Harms:4", symbol: { type: "simple-fill", color: "#d9b7f4", outline: { color: [0, 0, 0, 0.2], width: 0.5 } } },
      { value: "2,1", label: "Assets:2, Harms:1", symbol: { type: "simple-fill", color: "#eadedc", outline: { color: [0, 0, 0, 0.2], width: 0.5 } } },
      { value: "2,2", label: "Assets:2, Harms:2", symbol: { type: "simple-fill", color: "#ddcece", outline: { color: [0, 0, 0, 0.2], width: 0.5 } } },
      { value: "2,3", label: "Assets:2, Harms:3", symbol: { type: "simple-fill", color: "#e5aacd", outline: { color: [0, 0, 0, 0.2], width: 0.5 } } },
      { value: "2,4", label: "Assets:2, Harms:4", symbol: { type: "simple-fill", color: "#e88ce5", outline: { color: [0, 0, 0, 0.2], width: 0.5 } } },
      { value: "3,1", label: "Assets:3, Harms:1", symbol: { type: "simple-fill", color: "#e4beaa", outline: { color: [0, 0, 0, 0.2], width: 0.5 } } },
      { value: "3,2", label: "Assets:3, Harms:2", symbol: { type: "simple-fill", color: "#e09a93", outline: { color: [0, 0, 0, 0.2], width: 0.5 } } },
      { value: "3,3", label: "Assets:3, Harms:3", symbol: { type: "simple-fill", color: "#ca8e8e", outline: { color: [0, 0, 0, 0.2], width: 0.5 } } },
      { value: "3,4", label: "Assets:3, Harms:4", symbol: { type: "simple-fill", color: "#d8649c", outline: { color: [0, 0, 0, 0.2], width: 0.5 } } },
      { value: "4,1", label: "Assets:4, Harms:1", symbol: { type: "simple-fill", color: "#edae69", outline: { color: [0, 0, 0, 0.2], width: 0.5 } } },
      { value: "4,2", label: "Assets:4, Harms:2", symbol: { type: "simple-fill", color: "#e28959", outline: { color: [0, 0, 0, 0.2], width: 0.5 } } },
      { value: "4,3", label: "Assets:4, Harms:3", symbol: { type: "simple-fill", color: "#d5634b", outline: { color: [0, 0, 0, 0.2], width: 0.5 } } },
      { value: "4,4", label: "Assets:4, Harms:4", symbol: { type: "simple-fill", color: "#c54040", outline: { color: [0, 0, 0, 0.2], width: 0.5 } } }    ]
  };
};