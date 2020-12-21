// User controller
var User = require('../models/User')

// Returns user list
module.exports.list = () => {
    return User
        .find()
        .sort({nome:1})
        .exec()
}

module.exports.lookup = id => {
    return User
        .findOne({email: id})
        .exec()
}

module.exports.insert = user => {
    return new User(user).save()
}

module.exports.remove = id => {
    return User
        .deleteOne({email: id})
        .exec()
}
