import { randomUUID } from "node:crypto"

export class DatabaseMemory {
    #clientes = new Map()

    list(search) {
        return Array.from(this.#clientes.entries())
        .map((clientesArray) => {
            const id = clientesArray[0]
            const data = clientesArray[1]

            return {
                id,
                ...data
            }
        })
        // Filtrando os clientes pela busca desejada
        .filter(cliente => {
            if (search) {
                return cliente.nome.includes(search)
            }
            return true
        })
    }

    create(cliente) {
        // Gerando um id único e universal para o cliente
        const clienteID = randomUUID()

        this.#clientes.set(clienteID, cliente)
    }

    update(id, cliente) {
        this.#clientes.set(id, cliente)
    }

    delete(id) {
        this.#clientes.delete(id)
    }
}