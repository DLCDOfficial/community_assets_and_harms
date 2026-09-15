/**
 * generates a unique value renderer for the hex layer based on the compositeKey attribute.
 * the compositeKey is a string like "1,3" that indicates the bin for assets and harms.
 *
 * @param {string} field the field to use for unique value rendering. should be "compositeKey" to match the feature attribute set in updateHexValues. ( see mapHandler.js)
 * @returns {object} renderer object for use in FeatureLayer
 */
export const generateRenderer = (field = 'compositeKey') => ({
  type: 'unique-value',
  field,
  legendOptions: { title: 'UGB Assets vs Harms' },
  defaultSymbol: {
    type: 'simple-fill',
    color: '#cccccc',
    outline: { color: [0, 0, 0, 0.2], width: 0.5 }
  },
  uniqueValueInfos: [
    {
      value: '1,1',
      label: 'Assets:1, Harms:1',
      symbol: {
        type: 'simple-fill',
        color: '#d3d3d3',
        outline: { color: [0, 0, 0, 0.2], width: 0.5 }
      }
    },
    {
      value: '1,2',
      label: 'Assets:1, Harms:2',
      symbol: {
        type: 'simple-fill',
        color: '#d6b3a0',
        outline: { color: [0, 0, 0, 0.2], width: 0.5 }
      }
    },
    {
      value: '1,3',
      label: 'Assets:1, Harms:3',
      symbol: {
        type: 'simple-fill',
        color: '#d9926a',
        outline: { color: [0, 0, 0, 0.2], width: 0.5 }
      }
    },
    {
      value: '1,4',
      label: 'Assets:1, Harms:4',
      symbol: {
        type: 'simple-fill',
        color: '#dd6a29',
        outline: { color: [0, 0, 0, 0.2], width: 0.5 }
      }
    },
    {
      value: '2,1',
      label: 'Assets:2, Harms:1',
      symbol: {
        type: 'simple-fill',
        color: '#9cc4d2',
        outline: { color: [0, 0, 0, 0.2], width: 0.5 }
      }
    },
    {
      value: '2,2',
      label: 'Assets:2, Harms:2',
      symbol: {
        type: 'simple-fill',
        color: '#9ea69f',
        outline: { color: [0, 0, 0, 0.2], width: 0.5 }
      }
    },
    {
      value: '2,3',
      label: 'Assets:2, Harms:3',
      symbol: {
        type: 'simple-fill',
        color: '#a08769',
        outline: { color: [0, 0, 0, 0.2], width: 0.5 }
      }
    },
    {
      value: '2,4',
      label: 'Assets:2, Harms:4',
      symbol: {
        type: 'simple-fill',
        color: '#a36229',
        outline: { color: [0, 0, 0, 0.2], width: 0.5 }
      }
    },
    {
      value: '3,1',
      label: 'Assets:3, Harms:1',
      symbol: {
        type: 'simple-fill',
        color: '#5fb2d1',
        outline: { color: [0, 0, 0, 0.2], width: 0.5 }
      }
    },
    {
      value: '3,2',
      label: 'Assets:3, Harms:2',
      symbol: {
        type: 'simple-fill',
        color: '#60979f',
        outline: { color: [0, 0, 0, 0.2], width: 0.5 }
      }
    },
    {
      value: '3,3',
      label: 'Assets:3, Harms:3',
      symbol: {
        type: 'simple-fill',
        color: '#617b69',
        outline: { color: [0, 0, 0, 0.2], width: 0.5 }
      }
    },
    {
      value: '3,4',
      label: 'Assets:3, Harms:4',
      symbol: {
        type: 'simple-fill',
        color: '#635929',
        outline: { color: [0, 0, 0, 0.2], width: 0.5 }
      }
    },
    {
      value: '4,1',
      label: 'Assets:4, Harms:1',
      symbol: {
        type: 'simple-fill',
        color: '#169dd0',
        outline: { color: [0, 0, 0, 0.2], width: 0.5 }
      }
    },
    {
      value: '4,2',
      label: 'Assets:4, Harms:2',
      symbol: {
        type: 'simple-fill',
        color: '#16869e',
        outline: { color: [0, 0, 0, 0.2], width: 0.5 }
      }
    },
    {
      value: '4,3',
      label: 'Assets:4, Harms:3',
      symbol: {
        type: 'simple-fill',
        color: '#166d68',
        outline: { color: [0, 0, 0, 0.2], width: 0.5 }
      }
    },
    {
      value: '4,4',
      label: 'Assets:4, Harms:4',
      symbol: {
        type: 'simple-fill',
        color: '#174f28',
        outline: { color: [0, 0, 0, 0.2], width: 0.5 }
      }
    }
  ]
})
