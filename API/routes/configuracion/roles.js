import { pool } from "../../db.js";

export const createRole = async (req, res) => {
    const { body } = req
    const { descripcion } = body
    const query = `INSERT INTO roles (descripcion, estado) VALUES($1, $2) RETURNING *;`
    const values = [descripcion, true]
    try {
        const result = await pool.query(query, values)
        res.json(result.rows[0])

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Error en el servidor" })
    }
}