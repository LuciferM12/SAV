import { pool } from "../../db.js";
import { check } from "../../utilities/encryption.js";
import { generate } from "../../utilities/tokens.js";

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Validación básica de entrada
        if (!username || !password) {
            return res.status(400).json('Usuario y contraseña son obligatorios');
        }

        const query = `SELECT * FROM usuarios WHERE usuario = $1;`;
        const values = [username];
        const response = await pool.query(query, values);

        if (response.rowCount != 1) {
            console.log('Usuario no encontrado:', username);
            throw new Error('Usuario o contraseña inválidos');
        }

        const user = response.rows[0];
        const checked = await check(password, user.password);

        if (!checked) {
            console.log('Contraseña incorrecta para el usuario:', username);
            throw new Error('Usuario o contraseña inválidos');
        }

        const token = generate(user);
        console.log('Usuario autenticado:', username);
        return res.status(200).json({ token });

    } catch (error) {
        console.log('Error en el proceso de autenticación:', error);
        return res.status(400).json('Imposible encontrar usuario con ese email o contraseña');
    }
};
