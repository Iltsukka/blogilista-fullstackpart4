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

test('blog identification is called id', async () => {
    const response = await api.get('/api/blogs')
    console.log(response.body)
    expect(response.body[0].id).toBeDefined()
})

test('POST-request adds a blog', async () => {
    const blog = {
        title: "Dancing Queen",
        author: "Kim Jong",
        url: "www.ABBA.com/dancing",
        likes: 500
    }
    await api
      .post('/api/blogs')
      .send(blog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const contents = response.body.map(r => r.title)

    expect(response.body).toHaveLength(initialBlogs.length + 1)
    expect(contents).toContain('Dancing Queen')
    
})

test('if no likes property, shows default likes as 0', async () => {
    const blog = {
        title: "Dancing Queen",
        author: "Kim Jong",
        url: "www.ABBA.com/dancing",
    }

    await api
      .post('/api/blogs')
      .send(blog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    
    const response = await api.get('/api/blogs')
    console.log(response.body[2])
    expect(response.body[initialBlogs.length].likes).toBe(0)
})

test('if no title given, response is 400 Bad Request', async () => {
    const blog = {
        author: "Kim Jong",
        url: "www.ABBA.com/dancing",
        likes: 44
    }

    await api
      .post('/api/blogs')
      .send(blog)
      .expect(400)
})

test('if no url given, response is 400 Bad Request', async () => {
    const blog = {
        title: "Review of Indiana Jones",
        author: "Kim Jong",
        likes: 51
    }

    await api
      .post('/api/blogs')
      .send(blog)
      .expect(400)
})

afterAll(async () => {
    await mongoose.connection.close()
})