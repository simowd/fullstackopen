const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { blogs: 0 })
    response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
    const body = request.body
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }

    if (!body.url || !body.title) {
        response.status(400).send({ error: 'url or title not sent' })
    }

    const user = request.user

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
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    const user = request.user
    const blog = await Blog.findById(id)

    if (user.id.toString() === blog.user.toString()) {
        const result = await Blog.findByIdAndRemove(id)
        response.status(204).end()
    }
    else {
        response.status(401).send({ error: "invalid user" })
    }

    response.status(400).end()
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

blogsRouter.post('/:id/comments', async (request, response) => {
    const id = request.params.id

    const user = request.user
    const blog = await Blog.findById(id)

    if (user.id.toString() === blog.user.toString()) {
        const result = await Blog.findByIdAndRemove(id)
        response.status(204).end()
    }
    else {
        response.status(401).send({ error: "invalid user" })
    }

    response.status(400).end()
})

module.exports = blogsRouter