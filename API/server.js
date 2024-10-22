import express from 'express'
import morgan from 'morgan'
import multer from 'multer'
import cors from 'cors'
import { pool } from './db.js'
import { FRONTED_URL, PORT } from './config.js'

const app = express()
const upload = multer({ storage: multer.memoryStorage() })

app.use(cors({
    origin: FRONTED_URL
}))

app.use(morgan('dev'))
app.use(express.json())

app.listen(PORT)
console.log(`Server on port ${PORT}`)

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
        res.status(500).json({ message: "Error en el servidor" })
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
        res.status(500).json({ message: "Error en el servidor" })
    }
})

app.post('/upload', upload.single('image'), async (req, res) => {
    try {
        const { buffer, mimetype } = req.file;  // Accede a la imagen y su tipo MIME

        const query = 'INSERT INTO images (data, mimetype) VALUES ($1, $2) RETURNING *';
        const values = [buffer, mimetype];  // Almacena la imagen como un buffer
        const result = await pool.query(query, values);

        res.json({ message: 'Image uploaded successfully', image: result.rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error uploading image' });
    }
});

app.get('/image/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const query = 'SELECT data, mimetype FROM images WHERE id = $1';
        const result = await pool.query(query, [id]);

        if (result.rows.length > 0) {
            const image = result.rows[0];
            res.set('Content-Type', image.mimetype);  // Establece el tipo MIME correcto
            res.send(image.data);  // Envía la imagen en formato binario
        } else {
            res.status(404).send('Image not found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching image');
    }
});

app.post('/productos', upload.single('imagen'), async (req, res) => {
    const { producto, precio, description, categoria, tipo } = req.body;
    const imagen = req.file;

    if (!imagen) {
        return res.status(400).json({ message: 'Image not provided' })
    }

    try {
        let query = 'INSERT INTO images (data, mimetype) VALUES ($1, $2) RETURNING *';
        let values = [imagen.buffer, imagen.mimetype]

        let result = await pool.query(query, values)

        query = 'INSERT INTO productos (nombre_producto, precio, descripcion, id_imagen, categoria, tipo) VALUES ($1, $2, $3, $4, $5, $6) RETURNING * ';
        values = [producto, precio, description, result.rows[0].id, categoria, tipo]
        result = await pool.query(query, values)

        res.json({ message: 'Product created successfully', product: result.rows[0] })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error creating product' })
    }
})

app.get("/productos", async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT 
                productos.nombre_producto, 
                productos.precio, 
                productos.descripcion, 
                productos.categoria, 
                productos.tipo, 
                images.data AS image_data, 
                images.mimetype 
            FROM productos 
            INNER JOIN images ON productos.id_imagen = images.id
        `);
        
        // Transformar cada fila para incluir la imagen como base64
        const productosConImagenes = result.rows.map(producto => {
            return {
                ...producto,
                image: `data:${producto.mimetype};base64,${producto.image_data.toString('base64')}`
            };
        });

        res.json(productosConImagenes);
    } catch (error) {
        console.error("Error al obtener productos:", error);
        res.status(500).json({ message: "Error al obtener productos" });
    }
});

app.get("/categorias", async (req, res) => {
    const result = await pool.query('SELECT DISTINCT categoria FROM productos');
    res.json(result.rows)
})

app.get("/tipos", async (req, res) => {
    const result = await pool.query('SELECT DISTINCT tipo as categoria FROM productos');
    res.json(result.rows)
})








/*const productos = [
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
})*/