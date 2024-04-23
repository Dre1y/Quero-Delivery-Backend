import { fastify } from 'fastify'

const ranking = fastify({
    logger: true
})

ranking.get('/ranking', (request, reply) => {
    
})