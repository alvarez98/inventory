/* global describe, test, expect */
const request = require('supertest')
const app = require('../src/app')

describe('General tests', () => {
  test('It should home access', async (done) => {
    request(app)
      .get('/api/')
      .then((response) => {
        expect(response.statusCode).toBe(200)
        done()
      })
  })

  test('It should return error for invalid route', async (done) => {
    request(app)
      .get('/api/invalid')
      .then((response) => {
        expect(response.statusCode).toBe(404)
        done()
      })
  })
})
