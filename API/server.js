import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import { pool } from './db.js'

const app = express()
app.use(cors({
    origin: 'http://localhost:5173'
}))

app.use(morgan('dev'))
app.use(express.json())

app.listen(3000)
console.log(`Server on port ${3000}`)

app.get("/ping", async (req, res) => {
    const result = await pool.query('SELECT NOW()')
    res.send({
        pong: result.rows[0].now
    })
})

app.get("/usuarios", async (req, res) => {
    const result = await pool.query('SELECT * FROM usuarios')
    res.json(result.rows)
})

app.post("/usuarios", async (req, res) => {
    const { body } = req
    const { usuario, password, nombres, apellidos, edad, telefono } = body
    const query = `INSERT INTO usuarios (nombres, apellidos, edad, telefono, usuario, password) 
        VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;`
    const values = [nombres, apellidos, edad, telefono, usuario, password]
    try {
        const result = await pool.query(query, values)
        res.json(result.rows[0])
    } catch (error) {
        res.status(500).json({message: "Error en el servidor"})
    }
    
})

app.put("/usuarios/:id", async (req, res) => {
    const { id } = req.params;
    const { usuario, password, nombres, apellidos, edad, telefono } = req.body;

    const query = `UPDATE usuarios SET nombres = $1, apellidos = $2, edad = $3, telefono = $4, usuario = $5, password = $6 WHERE id_us = $7 RETURNING *; `;

    const values = [nombres, apellidos, edad, telefono, usuario, password, id];

    try {
        const result = await pool.query(query, values);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error en el servidor" });
    }
});

app.delete("/usuarios/:id", async (req, res) => {
    const { id } = req.params;

    const query = `DELETE FROM usuarios WHERE id_us = $1 RETURNING *;`;

    try {
        const result = await pool.query(query, [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        res.json({ message: "Usuario eliminado correctamente", usuario: result.rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error en el servidor" });
    }
});

app.get("/usuarios/:id", async (req, res) => {
    const { id } = req.params
    const query = `SELECT * FROM usuarios WHERE id_us = $1`
    const values = [id]
    try {
        const result = await pool.query(query, values)
        res.json(result.rows[0])
    } catch (error) {
        res.status(500).json({message: "Error en el servidor"})
    }
})









const productos = [
    { id: 1, foto: '/Totita.jpg', nombre: 'Platillo 1', costo: 50.50, descripcion: 'Descripción 1', categoria: 'Carnes' },
    { id: 2, foto: '/limonada.jpg', nombre: 'Bebida 3', costo: 70.00, descripcion: 'Descripción 2', categoria: 'Ensaladas' },
    { id: 3, foto: '/monster.jpg', nombre: 'Bebida 1', costo: 30.00, descripcion: 'Descripción 3', categoria: 'Postres' },
    { id: 4, foto: '/jamaica.jpg', nombre: 'Bebida 2', costo: 40.00, descripcion: 'Descripción 4', categoria: 'Bebidas' },
    // Más productos...
];



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
    const productoEncontrado = productos.find(
        (producto) => producto.id === parseInt(req.params.id)
    )
    if (!productoEncontrado) return res.status(404).json({
        message: "Product not found"
    })
    console.log(productoEncontrado)
    res.json()
})