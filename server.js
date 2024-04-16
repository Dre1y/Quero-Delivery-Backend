import { fastify } from 'fastify'
import { DatabaseMemory } from './database-memory.js'

const server = fastify()
const database = new DatabaseMemory()

server.post('/pedidos', (request, reply) => {
    const { codigo, produtos, categoriaEstab, idLoja, imgLoja, nomLoja, valTot, datCriacao } = request.body
    
    database.create({
        codigo,
        produtos,
        categoriaEstab,
        idLoja,
        imgLoja,
        nomLoja,
        valTot,
        datCriacao
    })
    return reply.status(201).send()
})

server.get('/pedidos', (request) => {

    const search = request.query.search

    const pedidos = database.list(search)
    return pedidos

})

server.put('/pedidos/:id', (request, reply) => {
    const pedidosID = request.params.id
    const { codigo, produtos, categoriaEstab, idLoja, imgLoja, nomLoja, valTot, datCriacao } = request.body

    database.update(pedidosID, {
        codigo,
        produtos,
        categoriaEstab,
        idLoja,
        imgLoja,
        nomLoja,
        valTot,
        datCriacao
    })
    return reply.status(204).send()
})

server.delete('/pedidos/:id', (request, reply) => {

    const pedidosID = request.params.id
    database.delete(pedidosID)

    return reply.status(204).send()
})

server.listen({ 
    port: 3000
})