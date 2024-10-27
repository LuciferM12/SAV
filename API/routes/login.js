import { pool } from "../db.js";
import { check } from "../utilities/encryption.js";
import { generate } from "../utilities/tokens.js"

export const login = async (req, res) => {
    try {
        const { username, password } = req.body
        let query, values, response
        query = `SELECT password FROM usuarios WHERE usuario = $1;`
        values = [username]
        response = await pool.query(query, values);
        if (response.rowCount != 1) {
            throw new Error('No se puede devolver el usuario')
        }

        const checked = await check(password, response.row[0].password)
        if (!checked) {
            throw new Error('Contraseña invalida')
        }

        query = `SELECT * FROM usuarios WHERE usuario = $1;`
        response = await pool.query(query, values)
        const token = generate(response.rows[0])
        return res.status(200).json({ token })
    } catch (error) {
        console.log(error)
        return res.status(400).json(`Imposible encontrar usuario con ese email o contraseña`)
    }
}