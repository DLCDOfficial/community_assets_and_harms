import pandas as pd


import statistics as stat







def get_val(e):
    return e['value']
file_path = 'yamhill.parquet'

# Read just the columns (efficient for large files)
df = pd.read_parquet(file_path) 


childcare = df['var'] == 'childcare'

childcare_vals = df[childcare]
sorted_df = childcare_vals.sort_values(by='value')

print(sorted_df)

new_data = '../../uber-h3-playground-newdata/data/' + file_path
new_df = pd.read_parquet(new_data)
new_childcare = df['var'] == 'childcare'

new_childcare_vals = new_df[new_childcare]
new_sorted = new_childcare_vals.sort_values(by='value')
print(new_sorted)