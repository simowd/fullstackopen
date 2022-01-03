const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
    const body = request.body

    if(!body.url || !body.title){
        response.status(400).send({error:'url or title not sent'})
    }

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0
    })
    const result = await blog.save()
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

    const result = await Blog.findByIdAndUpdate(id, blogpost, {new: true})
    
    response.json(result)
})


module.exports = blogsRouter