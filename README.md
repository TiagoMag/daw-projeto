# daw-projeto

## Comandos úteis:

```bash
# Importa dados de um ficheiro json para o mongo
mongoimport -d PGR -c users --jsonArray db.json

# Correr servers que dão restart em saves (ctrl+s)
npm run devstart
```

## Comandos úteis mongo:

```bash
show dbs;
db.users.find()
db.users.deleteOne({"_id":ObjectId("5fe0fb1e752091173a8732e8")})
```

## To Do list:

```bash
Interface registo
API login
Interface login
API auth
```

