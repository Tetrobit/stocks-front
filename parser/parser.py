import os
from pathlib import Path

import pandas as pd

excel_files = list(filter(lambda fname: fname.endswith('.xlsx') and not fname.startswith('~'), os.listdir('.')))

code = """export const histories = {
"""

for excel_file in excel_files:
    print(excel_file)
    country_name = excel_file.split('.')[0]
    data = pd.read_excel(Path('.') / excel_file)
    data = data.sort_values(by='data', ascending=True)

    code += f"    '{country_name}': ["
    for i in range(data.shape[0]):
        code += '[\'' + str(data['data'].iloc[i]).split()[0] + '\', ' + str(data['curs'].iloc[i]) + '], '
    code += f"],\n"

code += '}\n'

with open('history.ts', 'w') as f:
    f.write(code)
