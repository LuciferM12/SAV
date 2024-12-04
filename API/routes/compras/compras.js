import { pool } from '../../db.js'

export const createPurchase = async (req, res) => {
    try {
        await pool.query('BEGIN');

        const token = req.header('Authorization')
        if (!token) throw new Error('No token provided')

        const session = verify(token)
        const user_id = session.id_us

        const { carrito, empleadoId } = req.body
        const fecha = new Date().toISOString().split('T')[0]
        const total = carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0)

        const ventaQuery = `
            INSERT INTO ventas (id_us, id_empleado, fecha, total)
            VALUES ($1, $2, $3, $4)
            RETURNING id_vent
        `;

        const ventaValues = [user_id, empleadoId, fecha, total];
        const ventaResult = await pool.query(ventaQuery, ventaValues);
        const ventaId = ventaResult.rows[0].id_vent;

        await pool.query('COMMIT');

        res.json({ message: 'Producto creado exitosamente', product: result.rows[0] });
    } catch (error) {
        // Si ocurre un error, hacer rollback para deshacer los cambios
        await pool.query('ROLLBACK');
        console.log(error);
        res.status(500).json({ message: 'Error creando producto' });
    }
};
