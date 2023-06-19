const { test } = require('tap')
const build = require('../app')

const app = build()

test('requests the "/titles" route', async t => {
  const response = await app.inject({
    method: 'GET',
    url: '/v1/titles'
  })
  t.equal(response.statusCode, 200, 'returns a status code of 200')
  t.hasProp(JSON.parse(response.body), 'data')
})

test('requests the "/titles" route', async t => {
  const response = await app.inject({
    method: 'GET',
    url: '/v1/titles?q=game'
  })
  t.equal(response.statusCode, 200, 'returns a status code of 200')
  t.hasProp(JSON.parse(response.body), 'data')
})

test('requests the "/titles/slug" route', async t => {
  const response = await app.inject({
    method: 'GET',
    url: `/v1/titles/game-of-thrones`
  })
  t.equal(response.statusCode, 200, 'returns a status code of 200')
  t.hasProp(JSON.parse(response.body), 'data')
})

test('requests the "/titles/slug" route', async t => {
  const response = await app.inject({
    method: 'GET',
    url: `/v1/titles/throne-of-games`
  })
  t.equal(response.statusCode, 404, 'returns a status code of 404')
})
