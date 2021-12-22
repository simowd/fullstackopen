const _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => blogs.reduce((total, blog) => total + blog.likes, 0)

const favoriteBlog = (blogs) => {
    const blog = blogs.reduce((current, blog) => {
        if (current.likes) {
            return blog.likes > current.likes ? blog : current
        }
        else {
            return blog
        }
    }, {})
    const newObject = {
        title: blog.title,
        author: blog.author,
        likes: blog.likes
    }
    return newObject
}

const mostBlogs = (blogs) => {
    return _.reduce(_.countBy(blogs, 'author'), (index, value, key) => {
        const personMostBlogs = {
            author: key,
            blogs: value
        }
        if (_.isEmpty(index)) {
            return personMostBlogs
        }
        else {
            return value > index.blogs ? personMostBlogs : index
        }
    }, {})
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
}