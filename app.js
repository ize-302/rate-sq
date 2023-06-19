// Require the framework and instantiate it
const fastify = require('fastify')({ logger: true })
const fs = require("fs");

const api_version = '/v1'

function readfiles(file) {
  let data = fs.readFileSync(__dirname + `/db/${file}.json`, "utf8");
  return JSON.parse(data);
}

const titles = readfiles('titles')
const composers = readfiles('composers')


function build(opts = {}) {
  const app = fastify

  // Fetch titles
  app.get(`${api_version}/titles`, async (request, reply) => {
    const { q } = request.query
    if (q) {
      const querieddata = titles.filter(title => title.title.toLowerCase().includes(q.toLowerCase()))
      reply.code(200).send({ data: querieddata })
    }
    else reply.code(200).send({ data: titles })
  })

  // fetch a title
  app.get(`${api_version}/titles/:slug`, async (request, reply) => {
    const findtitle = titles.find(title => title.slug === request.params.slug)
    if (findtitle) {
      reply.code(200).send({ data: findtitle })
    } else reply
      .code(404)
      .send({ message: 'title not found' })
  })

  // fetch composers
  app.get(`${api_version}/composers`, async (request, reply) => {
    reply.code(200).send({ data: readfiles('composers') })
  })

  // fetch a composer
  app.get(`${api_version}/composers/:slug`, async (request, reply) => {
    const findcomposer = composers.find(title => title.slug === request.params.slug)
    if (findcomposer) {
      reply.code(200).send({ data: findcomposer })
    } else reply
      .code(404)
      .send({ message: 'composer not found' })
  })

  // fetch composer's titles
  app.get(`${api_version}/composers/:slug/titles`, async (request, reply) => {
    const findtitles = titles.filter(title => title.music_by.includes(request.params.slug))
    reply.code(200).send({ data: findtitles })
  })

  return app
}

module.exports = build
