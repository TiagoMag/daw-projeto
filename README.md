# Projeto DAW

## Elementos
Todo o repositório foi realizado pelos elementos:
- [André Morais, A83899](https://github.com/Demorales1998)
- [João Abreu, A84802](https://github.com/JoaoNunoAbreu)
- [Tiago Magalhães, A84485](https://github.com/TiagoMag)

## About
### Plataforma de Gestão e Disponibilização de Recursos Educativos
Plataforma que disponibiliza recursos educativos de vários tipos: livros, artigos, aplicações, trabalhos de alunos, monografias, relatórios

# Requisitos

**nodejs** - 3.5-3.9 </br>
**npm** - Installs package dependencies</br>
**mongodb** - Database</br>

# Instalação


## Comandos úteis:

```bash
# Importa dados dos utilizadores de um ficheiro json para o mongo
mongoimport -d PGR -c users --jsonArray datasets/db.json

# Importa dados dos recursos de um ficheiro json para o mongo
mongoimport -d PGR -c recursos --jsonArray datasets/dbrecurso.json

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
- [X] Download
- [X] Upload
- [X] Disponibilizar recursos educativos 
- [ ] Permitir adicionar novos tipos de recursos e novos recursos;
- [ ] Ter os recursos classificados por ano, tipo, tema, ... (utilização de hashtags ou de uma taxonomia classificativa);
- [ ] Permitir que um utilizador faça um Post sobre um recurso;
- [ ] Permitir que os outros utilizadores comentem Posts;
- [ ] Criar um sistema de ranking para os recursos (atribuição de estrelas pelos utilizadores);
- [X] Auth com password + user + token
- [X] Só aceitar zips
- [ ] Funções auxiliares ficheiro à parte
