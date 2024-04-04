import { fastify } from 'fastify'
import { DatabaseMemory } from './database-memory.js'

const server = fastify()
const database = new DatabaseMemory()

server.post('/clientes', (request, reply) => {
    const { nome, lojasCompradas, itensComprados, itensMaisComprados } = request.body
    
    database.create({
        nome,
        lojasCompradas,
        itensComprados,
        itensMaisComprados
    })
    return reply.status(201).send()
})

server.get('/clientes', (request) => {

    const search = request.query.search

    const clientes = database.list(search)
    return clientes

})

server.put('/clientes/:id', (request, reply) => {
    const clientesID = request.params.id
    const { nome, lojasCompradas, itensComprados, itensMaisComprados } = request.body

    database.update(clientesID, {
        nome,
        lojasCompradas,
        itensComprados,
        itensMaisComprados
    })
    return reply.status(204).send()
})

server.delete('/clientes/:id', (request, reply) => {

    const clientesID = request.params.id
    database.delete(clientesID)

    return reply.status(204).send()
})

server.listen({ 
    port: 3000
})