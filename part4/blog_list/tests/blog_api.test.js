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
})


afterAll(() => {
  mongoose.connection.close()
})