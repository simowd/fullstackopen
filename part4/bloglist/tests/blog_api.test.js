const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app.js')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('../utils/blog_helper')

const api = supertest(app)

let loggedUser

beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})
    const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
    const user = await api.post('/api/users').send(helper.newUser)
    const login = await api.post('/api/login').send({username: helper.newUser.username, password: helper.newUser.password})
    loggedUser = login.body
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
        const newBlogpost = {
            title: "Atomic Habits",
            author: "James Clear",
            url: "https://jamesclear.com/atomic-habits",
            likes: 10,
        }

        await api.post('/api/blogs').send(newBlogpost).set('Authorization', `Bearer ${loggedUser.token}`).expect(201).expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')
        const titles = response.body.map(blog => blog.title)

        expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
        expect(titles).toContain(newBlogpost.title)
    })

    test('401 error when token is not provided', async () => {
        const newBlogpost = {
            title: "Atomic Habits",
            author: "James Clear",
            url: "https://jamesclear.com/atomic-habits",
            likes: 10,
        }

        await api.post('/api/blogs').send(newBlogpost).expect(401).expect('Content-Type', /application\/json/)
    })

    test('verify that likes are on zero when not sent', async () => {
        const newBlogpost = {
            title: "Atomic Habits",
            author: "James Clear",
            url: "https://jamesclear.com/atomic-habits",
        }

        const response = await api.post('/api/blogs').set('Authorization', `Bearer ${loggedUser.token}`).send(newBlogpost)

        expect(response.body.likes).toEqual(0)
    })

    test('400 error when not sending url or title', async () => {
        const newBlogpost = {
            author: "James Clear",
        }
        const response = await api.post('/api/blogs').set('Authorization', `Bearer ${loggedUser.token}`).send(newBlogpost)
        expect(response.status).toEqual(400)
    })

    test('delete blogpost by id', async () => {
        const newBlogpost = {
            _id: "5a422ba71b54a676234d17fb",
            title: "TDD harms architecture",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
            likes: 0,
        }

        const response = await api.post('/api/blogs').set('Authorization', `Bearer ${loggedUser.token}`).send(newBlogpost)
        const responseDelete = await api.delete(`/api/blogs/${response.body.id}`).set('Authorization', `Bearer ${loggedUser.token}`)

        expect(responseDelete.status).toEqual(204)
    })
    
    test('update blogpost by id', async () => {
        const newBlogpost = {
            _id: "5a422bc61b54a676234d17fc",
            title: "Type wars",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
            likes: 2,
        }

        const response = await api.post('/api/blogs').set('Authorization', `Bearer ${loggedUser.token}`).send(newBlogpost)

        const update = {
            likes: 3
        }

        const responseUpdate = await api.put(`/api/blogs/${response.body.id}`).set('Authorization', `Bearer ${loggedUser.token}`).send(update)
        
        expect(responseUpdate.body.likes).toEqual(update.likes)
    })
})

afterAll(() => {
    mongoose.connection.close()
})