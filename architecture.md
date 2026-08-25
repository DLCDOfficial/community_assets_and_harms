# Harms and Assets Mapping Application – Architecture Overview

## 1. Purpose / Concept
- Displays harms and assets rankings at **H3 hex level 9** for Oregon cities.  
- Users select **indicators** (harms or assets) and a **comparison region** (UGB, county, or state).  
- Each hex has a **percentile score** for each selected indicator within the chosen comparison region.  
  - **Harm and asset scores** are then averaged across the selected indicators.  
  - Example: `Childcare: 0.65, Tree Canopy: 0.83, Park Proximity: 0.94` → average asset score = 0.81 → binned to **75–100% asset quartile**.  
- Hexes are colored via a **16-color matrix** based on harm quartile × asset quartile. 

## 2. System Context
- **Setup:** Node.js environment, npm for dependencies, Vite for bundling/development server
- **Frontend:** JavaScript, ArcGIS API (`MapView`) for 2D maps, ArcGIS Calcite Components for UI
- **Data:** Precomputed Parquet files, one per city, no geometry stored (geometry generated dynamically via **Uber H3 API**)
- **Hosting:** GitHub Pages
- **Main modules:**
  - `maphandler.js` → UI event handling
  - `dataprocessor.js` → Load and preprocess Parquet data
  - `calculate.js` → Compute average scores and quartiles
  - `renderer.js` → Apply colors & popups, publish hex layer
  - `htmlHelpers.js` → Populate Calcite UI components


---

## 3. Score & Color Logic
- **Score calculation:** Average percentile ranks of selected indicators in chosen region. Separated by Harms vs Assets. 
- **Quartile binning:**  
  - 0–25%, 25–50%, 50–75%, 75–100% for both harms and assets.  
  - Combination of harm + asset quartiles → hex color (16-color matrix).  
- **Example:** Hex in 0–25% harms and 75–100% assets → specific color in matrix.  

---

## 4. Data Model
- **Parquet structure (per city):**  
- **Key points:**  
- One row per `(grid_id, var)` pair.  
- No geometry stored — generated dynamically via Uber H3 API.  
- Rankings (`ugb_pct_rank`, `region_pct_rank`, `st_pct_rank`) provide relative percentile values.  

When a parquet file is loaded, a dict is created that maps the hexID to all associated variables: 
- **In-memory structure (runtime):**  
```js
{
  grid_id_1: [row1, row2, row3],
  grid_id_2: [...],
  ...
}
```

- Each object (row1,row2,row3) in the array contains **all fields from the Parquet row**, the rows that MUST be in the parquet file for the app to work are as follows:
  - `var` (variable name)  ex: 'Flood' 
  - `type`  ex: 'Harm'
  - Percentile ranks (`ugb_pct_rank`, `region_pct_rank`, `st_pct_rank`)  

- A separate `flags_data` object tracks special **“flag” variables** for quick access, which will be displayed as toggleable vector layers.
 ```js
  {
    electric_transmission_lines: [grid_id1, grid_id2, ...],
    highway: [...],
    tsunami_zone: [...]
  }
```

### 4.1 Runtime State

In addition to `hexStore` and `flags_data`, the application maintains the following runtime state:

- `view` → Reference to the ArcGIS `MapView` instance.
- `hexLayer` → Reference to the currently displayed hex layer.
- `hexStore` → Loaded Parquet data, keyed by `grid_id` (maps each hex to an array of data rows).
- `screenerLayers` → References to togglable screener layers (for visibility toggling).
- `highlightedCell` → Currently highlighted cell in the legend.
- `cityFile` → Currently loaded city Parquet file.
- `indicators` → Currently selected indicators.
- `region` → Currently selected comparison region (e.g., `'ugb_pct_rank'`).

These variables collectively manage the state of the map view, data, and UI selections, enabling real-time updates and efficient rendering. As well as deletion of old layers.

