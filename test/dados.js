import { fastify } from 'fastify'
import pkg from 'xlsx'

const { readFile, utils } = pkg
const dados = fastify({
    logger: true
})

dados.get('/dados', async (request, reply) => {
    try {
        const workbook = readFile('./data/dadosQueroDelivery.xlsx')

        const sheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[sheetName]
        const data = utils.sheet_to_json(worksheet)

        return data

    }   catch (err) {
        reply.status(500).send()
    }

})

dados.listen({
    port: 3000
})