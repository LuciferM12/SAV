import { pool } from '../../db.js'

export const getInformation = async (req, res) => {
    try {
        let query = `SELECT tipo, descripcion, ubicacion, telefono, nosotros, reservastext, nombre FROM negocio`
        let result = await pool.query(query)

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Consulta no lograda" });
        }
        res.json(result.rows[0])
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Error en el servidor" })
    }
}

export const getBanner = async (req, res) => { 
    try {
        const query = 'SELECT imagenes.data, imagenes.mimetype FROM imagenes INNER JOIN negocio ON negocio.imagenp = imagenes.id';
        const result = await pool.query(query);

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
}

export const getLogo = async (req, res) => {
    try {
        const query = 'SELECT imagenes.data, imagenes.mimetype FROM imagenes INNER JOIN negocio ON negocio.logo = imagenes.id';
        const result = await pool.query(query);

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
}

export const getReserva = async (req, res) => {
    try {
        const query = 'SELECT imagenes.data, imagenes.mimetype FROM imagenes INNER JOIN negocio ON negocio.reservasimg = imagenes.id';
        const result = await pool.query(query);

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
}

export const getNosotros = async (req, res) => {
    try {
        const query = 'SELECT imagenes.data, imagenes.mimetype FROM imagenes INNER JOIN negocio ON negocio.nosotrosimg = imagenes.id';
        const result = await pool.query(query);

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
}