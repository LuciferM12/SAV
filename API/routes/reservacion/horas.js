import { pool } from '../../db.js'

export const getHours = async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT * FROM horas;
        `);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "No hay horas con productos para mostrar" });
        }
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error en el servidor" });
    }
}