# Projeto DAW

## Sobre
### Plataforma de Gestão e Disponibilização deRecursos Educativos
*** Plataforma que disponibiliza recursos educativos de vários tipos: livros, artigos, aplicações, trabalhos de alunos, monografias, relatórios ***

## Comandos úteis:

```bash
# Importa dados de um ficheiro json para o mongo
mongoimport -d PGR -c users --jsonArray db.json

# Correr servers que dão restart em saves (ctrl+s)
npm run devstart

# Limpa o fileStore e o dbFiles.json
sh clean.sh
```

## Comandos úteis mongo:

```bash
show dbs;
db.users.find()
db.users.deleteOne({"_id":ObjectId("5fe0fb1e752091173a8732e8")})
```

## To Do list:
- [ ] Feed
- [ ] 




