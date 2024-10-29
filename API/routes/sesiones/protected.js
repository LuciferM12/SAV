import { verify } from "../../utilities/tokens.js";

export default async function protectedRoute(req, res) {
    try {
        // Extraer solo el token después de "Bearer"
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({
                error: 'No token provided',
                message: 'Authorization token is required'
            });
        }

        // Verificar el token
        const user = verify(token);
        
        // Comprobar si el rol del usuario es el permitido (6)
        if (user.rol !== 7) {
            return res.status(401).json('Unauthorized user');
        }

        console.log("Token válido, usuario autorizado");

        // Respuesta exitosa con los datos protegidos
        return res.status(200).json([
            { name: 'Rogelio', age: 20 },
            { name: 'Eduardo', age: 19 },
            { name: 'Angel', age: 21 },
        ]);

    } catch (error) {
        console.log(error);
        return res.status(400).json('Invalid session token');
    }
}
