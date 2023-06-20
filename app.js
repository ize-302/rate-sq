// Require the framework and instantiate it
const fastify = require('fastify')({ logger: true })
const fs = require("fs");
const { paginator, api_version } = require('./utils');

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
    const { q, page, per_page } = request.query
    if (q) {
      const querieddata = titles.filter(title => title.title.toLowerCase().includes(q.toLowerCase()))
      const result = paginator(querieddata, page, per_page)
      reply.code(200).send(result)
    }
    else {
      const result = paginator(titles, page, per_page)
      reply.code(200).send(result)
    }
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
    const { q, page, per_page } = request.query
    if (q) {
      const querieddata = composers.filter(title => title.name.toLowerCase().includes(q.toLowerCase()))
      const result = paginator(querieddata, page, per_page)
      reply.code(200).send(result)
    }
    else {
      const result = paginator(composers, page, per_page)
      reply.code(200).send(result)
    }
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
    const result = paginator(findtitles, 1, 10)
    reply.code(200).send(result)
  })

  return app
}

module.exports = build
