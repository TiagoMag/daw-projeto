// Recurso controller
var Recurso = require("../models/recurso");
var Voto = require("../controllers/voto");

/* Retorna a lista de recursos */
module.exports.list = () => {
  return Recurso.find().sort({ dataRegisto: 1 }).exec();
};

/* Retorna a lista de recursos de um utilizador */
module.exports.listByUser = (email) => {
  return Recurso.find({ autor: email }).sort({ dataRegisto: 1 }).exec();
};

/* Retorna a lista de recursos de um utilizador com dado nome */
module.exports.listByNome = (nome) => {
  return Recurso.find({ nome: nome }).sort({ dataRegisto: 1 }).exec();
};

/* Retorna a lista de recursos de um tipo */
module.exports.listByTipo = (tipo) => {
  return Recurso.find({ tipo: tipo }).sort({ dataRegisto: 1 }).exec();
};

/* Retorna a lista de recursos de um ano */
module.exports.listByAno = (ano) => {
  return Recurso.find({
    dataCriacao: { $regex: `^${ano}` },
  })
    .sort({ dataRegisto: 1 })
    .exec();
};

/* Retorna a lista de recursos com tags em comum */
module.exports.listByTags = (tags) => {
  return Recurso.find({
    hashtags: { $in: tags },
  })
    .sort({ dataRegisto: 1 })
    .exec();
};

/* Insere um recurso na bd */
module.exports.insert = (r) => {
  var novo = new Recurso(r);
  return novo.save();
};

/* Devolve uma lista de tipo de recursos e sua contagem. */
module.exports.tipos = () => {
  return Recurso.aggregate([
    { $group: { _id: "$tipo", count: { $sum: 1 } } },
    { $project: { _id: 1, count: 1 } },
  ]);
};

/* Devolve a informação de um recurso */
module.exports.consultar = id => {
  return Recurso
      .findOne({_id: id})
      .exec()
}

/* Update do rating e número de votos de um recurso */
function updateRating(id,newRating,numVotantes){
  return Recurso.updateOne({_id: id }, {
    rating: newRating, 
    numVotantes: numVotantes
  }).exec();
};

/* Devolve o numero de ficheiros de um utilizador */
module.exports.numFich = (id) => {
  return Recurso.countDocuments({ autorID: id })
};


/* Calcula nova média */
module.exports.updateAverage = (email,rating,id,flag) => {
  // Insere um voto
    if (flag==0){ // new voto
      return Promise.all([
        Voto.insert(id,email,rating)
        .then(data => {
          return Voto.numVotantes(id)
          .then(result => {
            numVotantes = result
            return Voto.sumRating(id)
            .then(result => {
              ratingSum = result[0].total
              newRating = ratingSum / numVotantes
              // Update no rating e número de votantes do recurso
              return updateRating(id,newRating,numVotantes)
              .then(result =>{return result})
              .catch(err => console.log("Erro no updateRating,"+err))
            })
            .catch(err => console.log("Erro no sumRating,"+err))
          })
          .catch(err => console.log("Erro no numVotantes"+err))
        })
        .catch(err => console.log("Erro ao introduzir voto")+err)
      ])
    } 
    else if (flag==1){ // new voto
      return Promise.all([
        Voto.remove(id,email)
        .then(data => {
          return Voto.numVotantes(id)
          .then(result => {
            numVotantes = result
            return Voto.sumRating(id)
            .then(result => {
              console.log(result)
              ratingSum = result[0].total
              newRating = ratingSum / numVotantes
              // Update no rating e número de votantes do recurso
              return updateRating(id,newRating,numVotantes)
              .then(result =>{return result})
              .catch(err => console.log("Erro no updateRating,"+err))
            })
            .catch(err => console.log("Erro no sumRating,"+err))
          })
          .catch(err => console.log("Erro no numVotantes"+err))
        })
        .catch(err => console.log("Erro ao introduzir voto")+err)
      ])
    }
  };
