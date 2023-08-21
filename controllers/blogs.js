const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {

  const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
  response.json(blogs)
  })

blogsRouter.post('/',  async (request, response) => {
  const body = request.body
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: "64b2badd9d26af770d6056cd"

  })

  const savedBlog = await blog.save()

  const person = await User.findById("64b2badd9d26af770d6056cd")
  person.blogs = person.blogs.concat(savedBlog._id)
  await person.save()
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body
  console.log(request.body)
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true, runvValidators: true, context: 'query'})
  response.json(updatedBlog)
})

module.exports = blogsRouter