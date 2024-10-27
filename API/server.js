import express from 'express'
import morgan from 'morgan'
import multer from 'multer'
import cors from 'cors'
import { pool } from './db.js'
import { FRONTED_URL, PORT } from './config.js'
import { createUser, deleteUser, getUser, getUsers, updateUser } from './routes/usuarios/usuarios.js'
import { createProduct, getProducts } from './routes/productos/productos.js'
import { getCategories } from './routes/productos/categorias.js'

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

 /*** Usuarios***/
app.get("/usuarios", getUsers)
app.post("/usuarios", createUser)
app.put("/usuarios/:id", updateUser)
app.delete("/usuarios/:id", deleteUser)
app.get("/usuarios/:id", getUser)

/***Productos ***/
app.post('/productos', upload.single('imagen'), createProduct)
app.get("/productos", getProducts);

/***Categorias***/
app.get("/categorias", getCategories)


/*app.post('/upload', upload.single('image'), async (req, res) => {
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
*/
