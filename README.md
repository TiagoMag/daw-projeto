# Projeto DAW

## Elementos

Todo o repositório foi realizado pelos elementos:

- [André Morais, A83899](https://github.com/Demorales1998)
- [João Abreu, A84802](https://github.com/JoaoNunoAbreu)
- [Tiago Magalhães, A84485](https://github.com/TiagoMag)

## Plataforma de Gestão e Disponibilização de Recursos Educativos

Plataforma que disponibiliza recursos educativos de vários tipos: livros, artigos, aplicações, trabalhos de alunos, monografias, relatórios

## Requisitos

**nodejs** - 3.5-3.9 </br>
**npm** - Installs package dependencies</br>
**mongodb** - Database</br>

## Comandos úteis

```bash
# Importa dados dos utilizadores de um ficheiro json para o mongo
mongoimport -d PGR -c users --jsonArray datasets/db.json

# Importa dados dos recursos de um ficheiro json para o mongo
mongoimport -d PGR -c recursos --jsonArray datasets/dbrecurso.json

# Importa dados das publicações de um ficheiro json para o mongo
mongoimport -d PGR -c pubs --jsonArray datasets/dbpub.json

# Correr servers que dão restart em saves (ctrl+s)
npm run devstart

# Limpa o fileStore e o dbFiles.json
sh clean.sh

# Gera um ficheiro manifesto.json a partir duma pasta chamada "data"
python generateManifest.py
```

## Comandos úteis mongo

```bash
show dbs;
db.users.find()
db.users.deleteOne({"_id":ObjectId("5fe0fb1e752091173a8732e8")})
```

## To Do list

- [X] Feed
- [X] Download
- [X] Upload
- [X] Disponibilizar recursos educativos
- [X] Permitir adicionar novos tipos de recursos e novos recursos;
- [X] Ter os recursos classificados por ano, tipo, tema, ... (utilização de hashtags ou de uma taxonomia classificativa);
- [X] Permitir que um utilizador faça um Post sobre um recurso;
- [X] Permitir que os outros utilizadores comentem Posts;
- [X] Criar um sistema de ranking para os recursos (atribuição de estrelas pelos utilizadores);
- [X] Auth com password + user + token
- [X] Só aceitar zips
- [X] Funções auxiliares ficheiro à parte
- [X] Upload foto de perfil dentro do perfil
- [X] Fix uploads por tipos
- [X] Fix upload não aparecer no menu
- [X] Quando é pdf/pptx só aceitar se for 1
- [ ] Quando o token for de vela avisar
- [X] Ter recursos públicos e privados
- [ ] URL inválidos
- [ ] Top 10 melhores ratings
- [ ] Tirar excesso de tempo no token
- [ ] Tirar cinza do css?
_ Mongo case insensetive
