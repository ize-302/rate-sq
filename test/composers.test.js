const { test } = require('tap')
const build = require('../app')
const { api_version } = require('../utils')

const app = build()

test('requests the "/composers" route', async t => {
  const response = await app.inject({
    method: 'GET',
    url: `${api_version}/composers`
  })
  t.equal(response.statusCode, 200, 'returns a status code of 200')
  t.hasProp(JSON.parse(response.body), 'data')
})

test('requests the "/composers/slug" route', async t => {
  const response = await app.inject({
    method: 'GET',
    url: `${api_version}/composers/hans-zimmer`
  })
  t.equal(response.statusCode, 200, 'returns a status code of 200')
  t.hasProp(JSON.parse(response.body), 'data')
})

test('requests the "/composers/slug" route', async t => {
  const response = await app.inject({
    method: 'GET',
    url: `${api_version}/composers/hanaa`
  })
  t.equal(response.statusCode, 404, 'returns a status code of 404')
})


test('requests the "/composers/slug/titles" route', async t => {
  const response = await app.inject({
    method: 'GET',
    url: `${api_version}/composers/hans-zimmer/titles`
  })
  t.equal(response.statusCode, 200, 'returns a status code of 200')
  t.hasProp(JSON.parse(response.body), 'data')
})