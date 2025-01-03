import { fastify } from 'fastify'
import { DatabasePostgres } from './database-postgres.js'

const server = fastify()

const database = new DatabasePostgres()

server.post('/videos', async (request, reply) => {

    const { title, description, duration } = request.body

    await database.create({
        title: title,
        description: description,
        duration: duration
    })
    
    return reply.status(201).send({ message: "Video criado com sucesso!"})
})

server.get('/videos', async (request, reply) => {

    const search = request.query.search

    const videos = await database.list(search)

    return videos
})

server.put('/videos/:id', async (request, reply) => {
    const videoId = request.params.id

    const { title, description, duration } = request.body

    await database.update(videoId, {
        title: title,
        description: description,
        duration: duration
    })

    return reply.status(204).send()
})

server.delete('/videos/:id', async (request, reply) => {
    const videoId = request.params.id
    
    await database.delete(videoId)

    return reply.status(204).send({ message: "Video deletado com sucesso!"})
})

server.listen({
    host: '0.0.0.0',
    port: process.env.PORT ?? 3333,
})