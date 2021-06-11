const request = require('supertest')
const app = require('../src/app')
const removeAll = require('../src/db/controllers/remove')
const findOne = require('../src/db/controllers/findOne')
const { generateToken } = require('../src/utils/jwt')
const models = require('../src/db/keys')
const { Configuration, Keys } = require('../src/config')

let userId = '', token = ''

beforeAll(async () => {
  const user = await findOne(models.USER, {
    email: 'admin@mail.com',
    isActive: true,
  }).catch((err) => console.log(err))
  token = generateToken(
    user.dataValues
  )
  console.log(token)
})

afterAll(async () => {
  await removeAll(models.USER, {}).catch((error) => console.log(error))
})

describe('POST /users', () => {
  test('It should be create a new User', async (done) => {
    const response = await request(app)
      .post('/api/users')
      .send({
        email: 'alvarez@gmail.com',
        password: '12345678',
        firstname: 'Adolfo',
        lastname: 'Alvarez',
      })
      .set('Authorization', `Bearer ${token}`)
    expect(response.statusCode).toBe(201)
    userId = response.body.id
    done()
  })
  test("You shouldn't create a new user for invalid body", async (done) => {
    const response = await request(app)
      .post('/api/users')
      .send({
        email: 'user@gmail.com',
        password: '12345678',
        invalidProperty: 'Error',
      })
      .set('Authorization', `Bearer ${token}`)
    expect(response.statusCode).toBe(400)
    done()
  })
})

describe('GET /users', () => {
  test('It should get Users', async (done) => {
    const response = await request(app)
      .get('/api/users?offset=0&limit=20')
      .set('Authorization', `Bearer ${token}`)
    expect(response.statusCode).toBe(200)
    done()
  })
  test("It shouldn't get Users for invalid offset", async (done) => {
    const response = await request(app)
      .get('/api/users?offset=')
      .set('Authorization', `Bearer ${token}`)
    expect(response.statusCode).toBe(400)
    done()
  })
  test("It shouldn't get Users for invalid query", async (done) => {
    const response = await request(app)
      .get('/api/users?offset=0&limit=20&invalidQuery=error')
      .set('Authorization', `Bearer ${token}`)
    expect(response.statusCode).toBe(400)
    done()
  })
})

describe('GET /users/:_id', () => {
  test('You must return a user when the user_id is sent to you', async (done) => {
    const response = await request(app)
      .get(`/api/users/${userId}`)
      .set('Authorization', `Bearer ${token}`)
    expect(response.statusCode).toBe(200)
    done()
  })
  test("It should return a message 'the user does not exist' because the user_id is wrong", async (done) => {
    const response = await request(app)
      .get('/api/users/995f46e9-f2cc-4c8e-9e1e-db5aec60c073')
      .set('Authorization', `Bearer ${token}`)
    expect(response.statusCode).toBe(400)
    done()
  })
})

describe('PUT /users/:_id', () => {
  test('You must update a user', async (done) => {
    const response = await request(app)
      .put(`/api/users/${userId}`)
      .send({
        firstname: 'Esteban',
      })
      .set('Authorization', `Bearer ${token}`)
    expect(response.statusCode).toBe(200)
    done()
  })
  test("It should return error 'the user does not exist' because the user_id is wrong", async (done) => {
    const response = await request(app)
      .put('/api/users/995f46e9-f2cc-4c8e-9e1e-db5aec60c073')
      .send({
        firstname: 'Nuevo nombre',
      })
      .set('Authorization', `Bearer ${token}`)
    expect(response.statusCode).toBe(400)
    done()
  })
  test('It should return error for invalid body', async (done) => {
    const response = await request(app).put(`/api/users/${userId}`).send({
      badProperty: 'Error',
    }).set('Authorization', `Bearer ${token}`)
    expect(response.statusCode).toBe(400)
    done()
  })
})

describe('DELETE /users/:_id', () => {
  test('You must remove a user', async (done) => {
    const response = await request(app).delete(`/api/users/${userId}`).set('Authorization', `Bearer ${token}`)
    expect(response.statusCode).toBe(200)
    done()
  })
  test("It should return a message 'the user does not exist' because the user_id is wrong", async (done) => {
    const response = await request(app).delete(
      '/api/users/995f46e9-f2cc-4c8e-9e1e-db5aec60c073'
    ).set('Authorization', `Bearer ${token}`)
    expect(response.statusCode).toBe(400)
    done()
  })
})
