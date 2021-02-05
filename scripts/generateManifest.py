import os,json,sys
if(len(sys.argv) == 1): print("Pasta não foi fornecida. Passar como argumento...") ; sys.exit()
folder = sys.argv[1]
paths = [os.path.join(root,filename) for root, directories, filenames in os.walk(folder) for filename in filenames]
data = {}
data["ficheiros"] = paths
json.dump(data, open("manifesto.json", "w+", encoding='utf-8'),indent=4,ensure_ascii=False)
print("Ficheiro manifesto.json foi criado com sucesso.")