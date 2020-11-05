const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../index')

const api = supertest(app)

describe("testing backend blogs", () => {
  test('bogs are returned as correct json format', async () => {
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
      .set('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFiaGlzaGVrIiwiaWQiOiI1ZjlkNmU4N2VhODI3NGE4NjYzN2Q4OGUiLCJpYXQiOjE2MDQxNTM2ODd9.Y2B3ed6F5CgEKT8tWXtiokaFshy-cm34PrKzy5g7_DA')
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
      .set('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFiaGlzaGVrIiwiaWQiOiI1ZjlkNmU4N2VhODI3NGE4NjYzN2Q4OGUiLCJpYXQiOjE2MDQxNTM2ODd9.Y2B3ed6F5CgEKT8tWXtiokaFshy-cm34PrKzy5g7_DA')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body.likes).toBe(0)
  })

  test('if the title and url properties are missing from the request data, the backend responds to the request with the status code 400 Bad Request.', async () => {
    const newBlog = 
      {
        url: "https://me.x.com",
      }
    await api.post('/api/blogs')
      .send(newBlog)
      .expect(400)

  })
})

describe("Checks that invalid users are not created and returns suitable status code", () => {
  test('username shorter then length 3 are not saved', async () => {
    const preResponse = await api.get('/api/users')
    var intitialLength = preResponse.body.length

    const newUser = {
      "username":"a",
      "name": "skdl",
      "password" : "123"
    }

    await api.post('/api/users')
      .send(newUser)
      .expect(400)

    const postResponse = await api.get('/api/users')
    expect(postResponse.body).toHaveLength(intitialLength)
  })

  test('missing username property arent saved and return bad req', async () => {
    const preResponse = await api.get('/api/users')
    var intitialLength = preResponse.body.length

    const newUser = {
      "name": "skdl",
      "password" : "123"
    }

    await api.post('/api/users')
      .send(newUser)
      .expect(400)

    const postResponse = await api.get('/api/users')
    expect(postResponse.body).toHaveLength(intitialLength)
  })

  test('missing password property arent saved and return status 400', async () => {
    const preResponse = await api.get('/api/users')
    var intitialLength = preResponse.body.length

    const newUser = {
      "username": "sbhio",
      "name": "skdl",
    }

    await api.post('/api/users')
      .send(newUser)
      .expect(400)

    const postResponse = await api.get('/api/users')
    expect(postResponse.body).toHaveLength(intitialLength)
  })

  test('PASSWORD shorter then length 3 are not saved', async () => {
    const preResponse = await api.get('/api/users')
    var intitialLength = preResponse.body.length

    const newUser = {
      "username": "sbhio",
      "name": "skdl",
      "password": "3"
    }

    await api.post('/api/users')
      .send(newUser)
      .expect(400)

    const postResponse = await api.get('/api/users')
    expect(postResponse.body).toHaveLength(intitialLength)
  })
})


afterAll(() => {
  mongoose.connection.close()
})