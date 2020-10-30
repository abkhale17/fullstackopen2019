const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../index')

const api = supertest(app)

describe("testing backend blogs", () => {
  test('notes are returned as correct json format', async () => {
    var response = await api.get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('there are 4 blogs', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(4)
  })

  test('unique identifier property of the blog posts is named id', async () => {
    const response = await api.get('/api/blogs')
    response.body.forEach(res => {
      expect(res.id).toBeDefined()
    });
  })

  test('HTTP POST request creates new blog and length is increased by one', async () => {

    const preResponse = await api.get('/api/blogs')
    var intitialLength = preResponse.body.length

    const newBlog = 
      {
        title: "ohh! new delicious recipe 2 addder",
        author: "anonymous23",
        url: "https://me.anonymous.com",
        likes:90909,
      }
    await api.post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const postResponse = await api.get('/api/blogs')
    expect(postResponse.body).toHaveLength(intitialLength +1)
  })

  test('if the likes property is missing from the request, it will default to the value 0', async () => {
    const newBlog = 
      {
        title: "blog without likes",
        author: "MrX",
        url: "https://me.x.com",
      }
    const response = await api.post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body.likes).toBe(0)
  })
})


afterAll(() => {
  mongoose.connection.close()
})