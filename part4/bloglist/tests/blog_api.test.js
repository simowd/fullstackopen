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
})

afterAll(() => {
    mongoose.connection.close()
})