import { pool } from '../../db.js'

export const getCategoriesProducts = async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT c.id_cat, c.descripcion AS categoria
            FROM categorias c
            JOIN productos p 
            ON p.id_categoria = c.id_cat
            GROUP BY c.id_cat, c.descripcion
            HAVING COUNT(p.id_prod) > 0;
        `);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "No hay categorias con productos para mostrar" });
        }
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error en el servidor" });
    }
}

export const getCategoriesMainProducts = async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT c.id_cat, c.descripcion AS categoria
            FROM categorias c
            JOIN productos p 
            ON p.id_categoria = c.id_cat
            JOIN productosprincipales pp
            ON pp.id_prod = p.id_prod
            GROUP BY c.id_cat, c.descripcion
            HAVING COUNT(pp.id_prod) > 0;
        `);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "No hay categorias con productos principales para mostrar" });
        }
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error en el servidor" });
    }
}

export const getAllCategories = async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT c.id_cat, c.descripcion
            FROM categorias c;
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