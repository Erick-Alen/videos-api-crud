// import {createServer} from 'node:http'


// const server = createServer((request, response) => {
  //   response.write("teste")

  //   return response.end()

// })

// server.listen(8000)

import { fastify } from 'fastify';
// import { DatabaseMemory } from './database-memory.js';
import { DatabasePostgres } from './database-postgres.js';
const server = fastify()
const database = new DatabasePostgres()

server.post('/videos', async (request, reply) => {
  const { title, description, duration } = request.body;

  await database.create({
    title,
    description,
    duration,
  })
  console.log(database.list())
  return reply.status(201).send()
})

server.get('/videos', async () => {
  const videos = await database.list()
  return videos
})

//route param (:id)
server.put('/videos/:id', async (request, reply) => {
  const videoId = request.params.id;
  const { title, description, duration } = request.body;


  await database.update(videoId, {
    title,
    description,
    duration,
  })

  return reply.status(204).send
})

server.delete('/videos/:id', async (request, reply) => {
  const videoId = request.params.id;
  await database.delete(videoId)

  return reply.status(204).send
})

server.listen({
  host:'0.0.0.0',
  port: process.env.port ?? 8000
})
