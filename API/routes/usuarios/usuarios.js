import { pool } from '../../db.js'
import { hash } from '../../utilities/encryption.js';
import { verify } from '../../utilities/tokens.js';

export const getUsers = async (req, res) => {
    const result = await pool.query('SELECT * FROM usuarios')
    if (result.rows.length === 0) {
        return res.status(404).json({ message: "No hay usuarios para mostrar" });
    }
    res.json(result.rows)
}

export const createUser = async (req, res) => {
    const { body } = req
    let { usuario, password, fnombre, snombre, apellidop, apellidom, edad, telefono } = body
    if(!edad) edad = null
    if(!telefono) telefono = null
    if(!snombre) snombre = null
    if(!apellidom) apellidom = null
    const query = `INSERT INTO 
        usuarios (fnombre, snombre, apellidop, apellidom, usuario, password, rol, edad, telefono) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *;`
    const hashedPassword = await hash(password)
    const values = [fnombre, snombre, apellidop, apellidom, usuario, hashedPassword, 7, edad, telefono]
    try {
        const result = await pool.query(query, values)
        res.json(result.rows[0])
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Error en el servidor" })
    }
}

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

export const getProfile = async (req, res) => {
    try {
        const token = req.header('Authorization')
        if (!token) throw new Error('No token provided')

        const session = verify(token)
        const user_id = session.id_us
        const query = `SELECT *, '' AS password FROM usuarios WHERE id_us = $1`
        const values = [user_id]
        const result = await pool.query(query, values)
        //const result = await pool.query(query)
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        res.json(result.rows[0])
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor" })
    }
}

export const updateProfile = async (req, res) => {
    try {
        const token = req.header('Authorization')
        if (!token) throw new Error('No token provided')

        const session = verify(token)
        const user_id = session.id_us
        const { fnombre, snombre, apellidop, apellidom, telefono, usuario, password, edad } = req.body;
        let query, values, result
        if (password) {
            query = `UPDATE usuarios SET 
                        fnombre = $1, snombre = $2, apellidop = $3, 
                        apellidom = $4, telefono = $5, usuario = $6, 
                        password = $7, edad = $8 WHERE id_us = $9 RETURNING *
                    `
            const hashedPassword = await hash(password)
            values = [fnombre, snombre, apellidop, apellidom, telefono, usuario, hashedPassword, edad, user_id]
            result = await pool.query(query, values)
        } else {
            query = `UPDATE usuarios SET 
                        fnombre = $1, snombre = $2, apellidop = $3, 
                        apellidom = $4, telefono = $5, usuario = $6, 
                        edad = $7 WHERE id_us = $8 RETURNING *
                    `
            values = [fnombre, snombre, apellidop, apellidom, telefono, usuario, edad, user_id]
            result = await pool.query(query, values)
        }

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        //console.log(result.rows[0])
        res.json(result.rows[0])
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Error en el servidor" })
    }
}

