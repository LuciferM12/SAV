const express = require('express')
const morgan = require('morgan')

const app = express()
const productos = [
    { id: 1, foto: '/Totita.jpg', nombre: 'Platillo 1', costo: 50.50, descripcion: 'Descripción 1', categoria: 'Carnes' },
    { id: 2, foto: '/limonada.jpg', nombre: 'Bebida 3', costo: 70.00, descripcion: 'Descripción 2', categoria: 'Ensaladas' },
    { id: 3, foto: '/monster.jpg', nombre: 'Bebida 1', costo: 30.00, descripcion: 'Descripción 3', categoria: 'Postres' },
    { id: 4, foto: '/jamaica.jpg', nombre: 'Bebida 2', costo: 40.00, descripcion: 'Descripción 4', categoria: 'Bebidas' },
    // Más productos...
];

app.use(morgan('dev'))
app.use(express.json())

app.listen(3000)
console.log(`Server on port ${3000}`)

app.get('/productos', (req, res) => {
    res.json(productos)
})

app.post('/productos', (req, res) => {
    const nuevoProducto = { ...req.body, id: productos.length + 1 }
    productos.push(nuevoProducto)
    res.send(nuevoProducto)
})

app.put('/productos', (req, res) => {
    res.send('actualizando productos')
})

app.delete('/productos', (req, res) => {
    res.send('eliminando productos')
})

app.get('/productos/:id', (req, res) => {
    console.log(req.params.id)
    const productoEncontrado =  productos.find(
        (producto) => producto.id ===  parseInt(req.params.id)
    )
    if(!productoEncontrado) return res.status(404).json({
        message: "Product not found"
    })
    console.log(productoEncontrado)
    res.json()
})