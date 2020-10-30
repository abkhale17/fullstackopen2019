const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../index')

const api = supertest(app)

describe("describe -----------------", () => {
  test('notes are returned as correct json format', async () => {
    var response = await api.get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('there are 4 blogs', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(4)
  })
})


afterAll(() => {
  mongoose.connection.close()
})