const express = require('express')
const reader = require('xlsx')

const app = express()

app.get("/readdados", (req, res) => {
    let fileName = req.query.fileName
    let data = []

    try {
        const file = reader.readFile('data/' + fileName + '.xlsx');
        const sheetNames = file.SheetNames;

        for (let i = 0; i < sheetNames.length; i++) {
            const arr = reader.utils.sheet_to_json(
                file.Sheets[sheetNames[i]])
            
            arr.forEach((res) => {
                data.push(res)
            })
        }
        res.send(data)

    } catch (err) {
        console.error("Erro ao ler o arquivo.", err);
    }
})

app.listen({
    port: 3333
})