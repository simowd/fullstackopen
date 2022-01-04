const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        return authorization.substring(7)
    }
    return null
}

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { blogs: 0 })
    response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
    const body = request.body
    const token = getTokenFrom(request)
    const decodedToken = jwt.verify(token, process.env.SECRET)

    if(!decodedToken.id) {
        return response.status(401).json({error: 'token missing or invalid'})
    }

    if (!body.url || !body.title) {
        response.status(400).send({ error: 'url or title not sent' })
    }

    if (!body.userId) {
        response.status(400).send({ error: 'userId not sent' })
    }

    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0,
        user: user._id
    })

    const result = await blog.save()
    user.blogs = user.blogs.concat(result._id)

    await user.save()
    response.status(201).json(result)
})

blogsRouter.delete('/:id', async (request, response) => {
    const id = request.params.id
    const result = await Blog.findByIdAndRemove(id)
    response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
    const id = request.params.id
    const blogpost = request.body
    if (!blogpost.likes) {
        return response.status(400).json({
            error: 'content missing',
        })
    }

    const result = await Blog.findByIdAndUpdate(id, blogpost, { new: true })

    response.json(result)
})


module.exports = blogsRouter