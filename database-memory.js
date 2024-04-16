import { randomUUID } from "node:crypto"

export class DatabaseMemory {
    #pedidos = new Map()

    list(search) {
        return Array.from(this.#pedidos.entries())
        .map((pedidosArray) => {
            const id = pedidosArray[0]
            const data = pedidosArray[1]

            return {
                id,
                ...data
            }
        })
        // Filtrando os pedidos pela busca desejada
        .filter(pedido => {
            if (search) {
                return pedido.codigo.includes(search)
            }
            return true
        })
    }

    create(pedido) {
        // Gerando um id único e universal para o pedido
        const pedidoID = randomUUID()

        this.#pedidos.set(pedidoID, pedido)
    }

    update(id, pedido) {
        this.#pedidos.set(id, pedido)
    }

    delete(id) {
        this.#pedidos.delete(id)
    }
}