import express from 'express'
import morgan from 'morgan'
import multer from 'multer'
import cors from 'cors'
import { pool } from './db.js'
import { FRONTED_URL, PORT } from './config.js'
import { createUser, deleteUser, getUser, getUsers, updateUser } from './routes/usuarios/index.js'

const app = express()
const upload = multer({ storage: multer.memoryStorage() })

app.use(cors())

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

app.get("/usuarios", getUsers)
app.post("/usuarios", createUser)
app.put("/usuarios/:id", updateUser)
app.delete("/usuarios/:id", deleteUser)
app.get("/usuarios/:id", getUser)


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

/*
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