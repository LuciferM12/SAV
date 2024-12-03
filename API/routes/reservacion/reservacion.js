import { pool } from '../../db.js'
import { verify } from '../../utilities/tokens.js'

export const createReservation = async (req, res) => {
    try {
        const token = req.header('Authorization')
        if (!token) throw new Error('No token provided')

        const session = verify(token)
        const user_id = session.id_us
        const { fecha, hora } = req.body;

        let query = `SELECT id_hora FROM horas WHERE hora = $1`
        let values = [hora]
        let result = await pool.query(query, values)
        let id_hora = result.rows[0].id_hora

        query = `INSERT INTO 
        reservas (fecha, id_us, hora) 
        VALUES ($1, $2, $3) RETURNING *;`

        values = [fecha, user_id, id_hora]
        result = await pool.query(query, values)

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Reservacion no lograda" });
        }
        res.json(result.rows[0])
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Error en el servidor" })
    }
}

export const getReservationForUser = async (req, res) => {
    try {
        const token = req.header('Authorization')
        if (!token) throw new Error('No token provided')

        const session = verify(token)
        const user_id = session.id_us
        
        let query = `SELECT r.id_reser, r.fecha, r.servicio, h.hora FROM reservas r INNER JOIN horas h ON r.hora = h.id_hora WHERE r.id_us = $1 ORDER BY r.fecha`
        let values = [user_id]
        let result = await pool.query(query, values)

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Consulta no lograda" });
        }
        //console.log(result.rows[0])
        res.json(result.rows)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Error en el servidor" })
    }
}

export const deleteReservation = async (req, res) => {
    try {
        const token = req.header('Authorization')
        if (!token) throw new Error('No token provided')

        const session = verify(token)
        const user_id = session.id_us
        const { id } = req.params

        const query = 'DELETE FROM reservas WHERE id_reser = $1 AND id_us = $2'
        const values = [id, user_id]
        const result = await pool.query(query, values)

        if (result.rowCount === 0) {
            return res.status(404).json({ message: "Reservacion no encontrada" })
        }
        res.json({ message: "Reservation eliminada correctamente", deletedReservation: result.rows[0] })
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Error en el servidor"})
    }
}