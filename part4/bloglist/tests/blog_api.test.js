const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app.js')
const Blog = require('../models/blog')
const helper = require('../utils/blog_helper')

const api = supertest(app)



beforeEach(async () => {
    await Blog.deleteMany({})
    const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(note => note.save())
    await Promise.all(promiseArray)
})

describe('blog api requests', () => {

    test('get request to the base url', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(helper.initialBlogs.length);
    })

    test('verify the existance of id property', async () => {
        const response = await api.get('/api/blogs')
        const unique_id = response.body.map(blog => blog.id)
        expect(unique_id[0]).toBeDefined()
    })

    test('verify that a new blog is created with request', async () => {
        const newBlogPost = {
            title: "Atomic Habits",
            author: "James Clear",
            url: "https://jamesclear.com/atomic-habits",
            likes: 10,
        }

        await api.post('/api/blogs').send(newBlogPost).expect(201).expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')
        const titles = response.body.map(blog => blog.title)

        expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
        expect(titles).toContain(newBlogPost.title)
    })

    test('verify that likes are on zero when not sent', async () => {
        const newBlogPost = {
            title: "Atomic Habits",
            author: "James Clear",
            url: "https://jamesclear.com/atomic-habits",
        }

        const response = await api.post('/api/blogs').send(newBlogPost)

        expect(response.body.likes).toEqual(0)
    })
})

afterAll(() => {
    mongoose.connection.close()
})