import { fastify } from 'fastify'
import pkg from 'xlsx'

const { readFile, utils } = pkg
const ranking = fastify({
    logger: true
})

ranking.get('/ranking', (request, reply) => {
    
    try {

        const workbook = readFile('./data/dadosQueroDelivery.xlsx')

        const sheetName = workbook && workbook.SheetNames && workbook.SheetNames.length > 0 ? workbook.SheetNames[0] : null
        if (!sheetName) {
            throw new Error('Sheet não encontrado')
        }

        const worksheet = workbook.Sheets[sheetName]
        const data = utils.sheet_to_json(worksheet)

        const itemRanking = {}, categoryCount = {}

        data.forEach(pedido => {

            if (pedido.produtos && Array.isArray(pedido.produtos)) {
            pedido.produtos.forEach(produto => {

                if (!itemRanking[produto.id]) {
                    itemRanking[produto.id] = {
                        nome: produto.nome,
                        quantidade: 0
                    }
                }
                itemRanking[produto.id].quantidade += produto.quantidade
                
                if(!categoryCount[pedido.categoriaEstabelecimento]) {
                    categoryCount[pedido.categoriaEstabelecimento] = 0
                }
                categoryCount[pedido.categoriaEstabelecimento]++
            })
        }
        })
        
        console.log(itemRanking)
        console.log(categoryCount)

        const sortedItemRanking = Object.keys(itemRanking).map(itemId => {
            return {
                id: itemId,
                nome: itemRanking[itemId].nome,
                quantidade: itemRanking[itemId].quantidade
            }
        }).sort((a, b) => b.quantidade - a.quantidade)

        const mostBoughtCategory = Object.keys(categoryCount).reduce((a, b) => categoryCount[a] > categoryCount[b] ? a : b, '')

        return {
            ranking: sortedItemRanking,
            categoriaMaisComprada: mostBoughtCategory
        }

    }   catch (error) {
        reply.status(500).send()
        console.log(error)
    }

})

ranking.listen({
    port: 3000
})