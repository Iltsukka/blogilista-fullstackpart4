const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const tokenFromRequest = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')

  }
  return null
}

blogsRouter.get('/', async (request, response) => {

  const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
  response.json(blogs)
  })

blogsRouter.post('/',  async (request, response) => {
  const body = request.body
  const decodedToken = jwt.verify(tokenFromRequest(request), process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({error: 'invalid token'})
  }
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: decodedToken.id

  })

  const savedBlog = await blog.save()

  const person = await User.findById(decodedToken.id)
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