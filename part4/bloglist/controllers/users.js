const userRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const user = require('../models/user')

userRouter.get('/', async (request, response) => {
    const result = await User.find({})
    response.json(result)
})

userRouter.post('/', async (request, response) => {
    const newUser = request.body
    const saltRounds = 10
   

    if(!newUser.username || !newUser.password){
        response.status(400).send({error:'incomplete request'})
    }

    if(newUser.password.length < 3){
        response.status(400).send({error:'Password too short'})
    }

    const passwordHash = await bcrypt.hash(newUser.password, saltRounds)

    const newUserObject = new User({
        username: newUser.username,
        name: newUser.name,
        passwordHash
    })

    const savedUser = await newUserObject.save()
    response.json(savedUser)
})

module.exports = userRouter