import { pool } from '../../db.js'

export const getCategories = async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT DISTINCT p.id_prod, c.descripcion
            FROM productos p
            JOIN categorias c 
            ON p.id_categoria = c.id_cat;
        `);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "No hay categorias para mostrar" });
        }
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error en el servidor" });
    }
}