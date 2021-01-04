// User controller
var User = require('../models/user')

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

// Insert student
module.exports.insert = user => {
    print("entrei")
    var newUser = new Student(user)
    return newUser.save()
}

module.exports.remove = id => {
    return User
        .deleteOne({email: id})
        .exec()
}
