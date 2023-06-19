const { test } = require('tap')
const build = require('../app')

const app = build()


test('requests the "/composers" route', async t => {
  const response = await app.inject({
    method: 'GET',
    url: '/v1/composers'
  })
  t.equal(response.statusCode, 200, 'returns a status code of 200')
  t.hasProp(JSON.parse(response.body), 'data')
})

test('requests the "/composers/slug" route', async t => {
  const response = await app.inject({
    method: 'GET',
    url: `/v1/composers/hans-zimmer`
  })
  t.equal(response.statusCode, 200, 'returns a status code of 200')
  t.hasProp(JSON.parse(response.body), 'data')
})

test('requests the "/composers/slug" route', async t => {
  const response = await app.inject({
    method: 'GET',
    url: `/v1/composers/hanaa`
  })
  t.equal(response.statusCode, 404, 'returns a status code of 404')
})


test('requests the "/composers/slug/titles" route', async t => {
  const response = await app.inject({
    method: 'GET',
    url: `/v1/composers/hans-zimmer/titles`
  })
  t.equal(response.statusCode, 200, 'returns a status code of 200')
  t.hasProp(JSON.parse(response.body), 'data')
})