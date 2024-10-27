import { pool } from '../../db.js'

export const getProducts = async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT 
                productos.nomprod, 
                productos.precio, 
                productos.descripcion, 
                categorias.descripcion AS categoria 
                images.data AS image_data, 
                images.mimetype 
            FROM productos 
            INNER JOIN images 
            ON productos.id_imagen = images.id
            INNER JOIN categorias
            ON categorias.id_cat = id_categoria
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
}

export const createProduct = async (req, res) => {
    const { producto, precio, description, categoria } = req.body;
    const imagen = req.file;

    if (!imagen) {
        return res.status(400).json({ message: 'Image not provided' });
    }

    try {
        // Inicia la transacción
        await pool.query('BEGIN');

        // Insertar la imagen
        let query = 'INSERT INTO images (data, mimetype) VALUES ($1, $2) RETURNING *';
        let values = [imagen.buffer, imagen.mimetype];
        let result = await pool.query(query, values);
        const imagenId = result.rows[0].id;

        // Insertar el producto
        query = 'INSERT INTO productos (nomprod, precio, descripcion, id_imagen, id_categoria) VALUES ($1, $2, $3, $4, $5) RETURNING *';
        values = [producto, precio, description, imagenId, categoria];
        result = await pool.query(query, values);

        // Confirmar la transacción si todo sale bien
        await pool.query('COMMIT');

        res.json({ message: 'Producto creado exitosamente', product: result.rows[0] });
    } catch (error) {
        // Si ocurre un error, hacer rollback para deshacer los cambios
        await pool.query('ROLLBACK');
        console.log(error);
        res.status(500).json({ message: 'Error creando producto' });
    }
};


export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { usuario, password, fnombre, snombre, apellidop, apellidom, edad, telefono } = req.body;

    const query = `UPDATE usuarios SET fnombre = $1, snombre = $2, apellidop = $3, apellidom = $4, edad = $5, telefono = $6, usuario = $7, password = $8 WHERE id_us = $9 RETURNING *; `;
    const values = [fnombre, snombre, apellidop, apellidom, edad, telefono, usuario, password, id];

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
}

export const deleteUser = async (req, res) => {
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
}

export const getUser = async (req, res) => {
    const { id } = req.params
    const query = `SELECT * FROM usuarios WHERE id_us = $1`
    const values = [id]
    try {
        const result = await pool.query(query, values)
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        res.json(result.rows[0])
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor" })
    }
}