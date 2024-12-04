import express from 'express'
import morgan from 'morgan'
import multer from 'multer'
import cors from 'cors'
import { pool } from './db.js'
import { FRONTED_URL, PORT } from './config.js'
import { createUser, deleteUser, getProfile, getUser, getUsers, updateProfile, updateUser } from './routes/usuarios/usuarios.js'
import { createProduct, getMainProducts, getProducts } from './routes/productos/productos.js'
import { getAllCategories, getCategoriesMainProducts, getCategoriesProducts } from './routes/productos/categorias.js'
import { login } from './routes/sesiones/login.js'
import { createRole } from './routes/configuracion/roles.js'
import decode from './routes/sesiones/decode.js'
import protectedRoute from './routes/sesiones/protected.js'
import { getHours } from './routes/reservacion/horas.js'
import { createReservation, deleteReservation, getReservationForUser } from './routes/reservacion/reservacion.js'
import { getBanner, getInformation, getLogo, getNosotros, getReserva } from './routes/negocio/informacion.js'

const app = express()
const upload = multer({ storage: multer.memoryStorage() })

app.use(cors({

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

/***Inicio de Sesion ***/
app.get("/decode", decode)
app.get("/protected", protectedRoute)
app.post("/login", login)

/***Usuarios***/
app.get("/usuarios", getUsers)
app.post("/usuarios", createUser)
app.put("/usuarios/:id", updateUser)
app.delete("/usuarios/:id", deleteUser)
app.get("/usuarios/:id", getUser)
app.get("/profile", getProfile)
app.put("/profile", updateProfile)

/***Productos ***/
app.post('/productos', upload.single('imagen'), createProduct)
app.get("/productos", getProducts);
app.get("/pproductos", getMainProducts)

/***Categorias***/
app.get("/categorias", getAllCategories)
app.get("/categorias/productos", getCategoriesProducts)
app.get("/categorias/principalesproductos", getCategoriesMainProducts)


/*** Reservaciones ***/
app.get("/horas", getHours)
app.post("/reservas", createReservation)
app.get("/reservas", getReservationForUser)
app.delete("/reservas/:id", deleteReservation)

/***Roles***/
app.post("/roles", createRole)

/**Info ***/
app.get("/informacion", getInformation)
app.get("/img/banner", getBanner)
app.get("/img/reserva", getReserva)
app.get("/img/nosotros", getNosotros)
app.get('/logo', getLogo);


/*** Prueba ***/
app.post('/upload-images', upload.fields([
    { name: 'logo', maxCount: 1 },
    { name: 'banner', maxCount: 1 },
    { name: 'nosotrosimg', maxCount: 1 },
    { name: 'reservasimg', maxCount: 1 }
]), async (req, res) => {
    let client;

    try {
        // Obtener una conexión del pool
        client = await pool.connect();

        // Iniciar la transacción
        await client.query('BEGIN');

        const imageTypes = ['logo', 'banner', 'nosotrosimg', 'reservasimg'];
        const insertedImages = {};

        for (const type of imageTypes) {
            if (req.files[type] && req.files[type][0]) {
                const { buffer, mimetype } = req.files[type][0];

                // Insertar la imagen en la tabla `imagenes`
                const query = 'INSERT INTO imagenes (data, mimetype) VALUES ($1, $2) RETURNING id';
                const values = [buffer, mimetype];
                const result = await client.query(query, values);

                // Guardar el ID de la imagen insertada
                insertedImages[type] = result.rows[0].id;
            }
        }

        // Actualizar la tabla `negocio` con los IDs de las imágenes
        const updateQuery = `
        UPDATE negocio 
        SET logo = $1, imagenp = $2, nosotrosimg = $3, reservasimg = $4
        WHERE id_negocio = $5
      `;
        const updateValues = [
            insertedImages.logo || null,
            insertedImages.banner || null,
            insertedImages.nosotrosimg || null,
            insertedImages.reservasimg || null,
            1  // Ajustar si hay más de un negocio.
        ];
        await client.query(updateQuery, updateValues);

        // Confirmar la transacción
        await client.query('COMMIT');

        res.json({ message: 'Images uploaded successfully', insertedImages });
    } catch (error) {
        // Revertir la transacción en caso de error
        if (client) await client.query('ROLLBACK');
        console.error(error);
        res.status(500).json({ message: 'Error uploading images' });
    } finally {
        // Liberar la conexión al pool
        if (client) client.release();
    }
});

/*** Prueba2 ***/
app.post('/product-image', upload.fields([
    { name: 'imagen', maxCount: 1 }
]), async (req, res) => {
    let client;
    const { producto, precio, description, categoria } = req.body;
    try {
        // Obtener una conexión del pool
        client = await pool.connect();

        // Iniciar la transacción
        await client.query('BEGIN');

        let id_imagen = null;

        // Verificar si se ha subido una imagen
        if (req.files['imagen'] && req.files['imagen'][0]) {
            const { buffer, mimetype } = req.files['imagen'][0];

            // Insertar la imagen en la tabla `imagenes`
            const query = 'INSERT INTO imagenes (data, mimetype) VALUES ($1, $2) RETURNING id';
            const values = [buffer, mimetype];
            const result = await client.query(query, values);

            // Guardar el ID de la imagen insertada
            id_imagen = result.rows[0].id;
        } else {
            // Si no se ha subido una imagen, usa un valor predeterminado o maneja el error
            throw new Error('Se requiere una imagen para el producto');
        }

        // Actualizar la tabla `productos` con los datos del producto y el ID de la imagen
        const updateQuery = `INSERT INTO productos (nomprod, precio, descripcion, id_imagen, id_categoria) VALUES ($1, $2, $3, $4, $5) RETURNING *`;
        const updateValues = [producto, precio, description, id_imagen, categoria];
        const productResult = await client.query(updateQuery, updateValues);

        // Confirmar la transacción
        await client.query('COMMIT');

        res.json({ message: 'Producto creado exitosamente', product: productResult.rows[0] });
    } catch (error) {
        // Revertir la transacción en caso de error
        if (client) await client.query('ROLLBACK');
        console.error(error);
        res.status(500).json({ message: 'Error al crear el producto', error: error.message });
    } finally {
        // Liberar la conexión al pool
        if (client) client.release();
    }
});





app.post('/upload', upload.single('image'), async (req, res) => {
    try {
        const { buffer, mimetype } = req.file;  // Accede a la imagen y su tipo MIME

        const query = 'INSERT INTO imagenes (data, mimetype) VALUES ($1, $2) RETURNING *';
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
        const query = 'SELECT data, mimetype FROM imagenes WHERE id = $1';
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

