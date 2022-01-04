const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        minlength: 3
    },
    name: String,
    passwordHash: String
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        //Never return the password
        delete returnedObject.passwordHash
    }
})

userSchema.plugin(uniqueValidator)
module.exports = mongoose.model('User', userSchema)