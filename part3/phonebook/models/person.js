const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
require('dotenv').config()
const uri = process.env.MONGODB_URI

mongoose
    .connect(uri)
    .then(() => {
        console.log('connected to database')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB Atlas', error.message)
    })

const personSchema = new mongoose.Schema({
    name: { type:String, required: true, unique: true, minLength:3 },
    number: { type:String, required: true, unique: true, minLength:8 },
})

personSchema.plugin(uniqueValidator)
personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    },
})

module.exports = mongoose.model('Person', personSchema)
