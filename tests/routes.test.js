const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
    {title: "Tiikerikuningas",
     author: "Johnny Deff",
     url: "www.tigerking.com/Deff",
     likes: 66
    },
    {title: "Software Development Tips",
    author: "Mr. Google",
    url: "www.programmerTips.com",
    likes: 3
    }
]

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(initialBlogs)
})

test('GET returns correct number of blogs', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(2)
})

afterAll(async () => {
    await mongoose.connection.close()
})