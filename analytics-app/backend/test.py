from collections import defaultdict

new_list = [{'interventionType': 'EDUCATION', 'name': {'languageKeys': ['en-US', 'es-BO', 'tr-TR'], 'languageTexts': ['', 'Filtro', '']}}, {'interventionType': 'TECHNOLOGY', 'name': {'languageKeys': ['en-US', 'es-BO', 'tr-TR'], 'languageTexts': ['', 'Nutrición', '']}}, {'interventionType': 'TECHNOLOGY', 'name': {'languageKeys': ['en-US', 'es-BO', 'tr-TR'], 'languageTexts': ['', 'Cocina', '']}}, {'interventionType': 'TECHNOLOGY', 'name': {'languageKeys': ['en-US', 'es-BO', 'tr-TR'], 'languageTexts': ['', 'Datos de la familia', '']}}, {'interventionType': 'TECHNOLOGY', 'name': {'languageKeys': ['en-US', 'es-BO', 'tr-TR'], 'languageTexts': ['', 'Baño', '']}}, {'interventionType': 'TECHNOLOGY', 'name': {'languageKeys': ['en-US', 'es-BO', 'tr-TR'], 'languageTexts': ['', 'Lavamanos', '']}}, {'interventionType': 'TECHNOLOGY', 'name': {'languageKeys': ['en-US', 'es-BO', 'tr-TR'], 'languageTexts': ['', 'Tara', '']}}]

# create new dict 
unique_interventions = []
new_dict = defaultdict(lambda: defaultdict(list))

for item in new_list:
    interventionType = item["interventionType"]
    if interventionType in unique_interventions:
        break
    else:
        unique_interventions.append(interventionType)
        new_dict[interventionType]["name"]
        new_dict[interventionType]["items"]

print(new_dict)

final_dict = dict(new_dict)

print(final_dict)

# for item in new_list:
#     languageKeys = item["name"]["languageKeys"]
#     languageTexts = item["name"]["languageTexts"]

#     name_dict = dict(zip(languageKeys, languageTexts))
#     interventionType = item["interventionType"]
#     new_dict["interventions"][interventionType].append(name_dict)

# final_dict = dict(new_dict["interventions"])

# print(final_dict)

# lang = "es-BO"

# for k,v in final_dict.items():
#     for item in v:
#         print(item[lang])

# for k,v in new_dict["interventions"].items():
#     print(k, v)

# for item in new_list:
#     print(item)
#     print(type(item))

# d = defaultdict(lambda: defaultdict(list))
# d['s1']['port1'].append([0, 0, 0])
# d['s1']['port1'].append([1, 1, 1])
# d['s1']['port2'].append([2, 2, 2])
# print(d)