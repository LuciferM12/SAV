const express = require('express')
const morgan = require('morgan')

const app = express()

app.use(morgan('dev'))

app.listen(3000)
console.log(`Server on port ${3000}`)

app.get('/productos', (req, res) => {
    res.send('obteniendo productos')
})

app.post('/productos', (req, res) => {
    res.send('creando productos')
})

app.put('/productos', (req, res) => {
    res.send('actualizando productos')
})

app.delete('/productos', (req, res) => {
    res.send('eliminando productos')
})

app.get('/productos/:id', (req, res) => {
    res.send('obteniendo producto')
})