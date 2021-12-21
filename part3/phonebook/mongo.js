const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Please provide the password of the mongo database')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://user:${password}@cluster0.31ala.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url)

const PersonSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', PersonSchema)

if (process.argv.length === 3) {
    Person.find({}).then((result) => {
        result.forEach((element) => {
            console.log(element)
        })
        mongoose.connection.close()
    })
}

if (process.argv.length === 5) {
    const name = process.argv[3]
    const number = process.argv[4]

    const person = new Person({
        name: name,
        number: number,
    })

    person.save().then(() => {
        console.log('Added person')
        mongoose.connection.close()
    })
}
