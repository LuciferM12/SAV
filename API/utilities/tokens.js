import jwt from 'jsonwebtoken'

const secretKey = 'secret'

export const generate = (data) => {
    const token = jwt.sign(data, secretKey, { expiresIn: '72h' })
    return token
}

export const verify = (token) => {
    try {
        const decoded = jwt.verify(token, secretKey);
        return decoded;
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            throw new Error('El token ha expirado');
        } else if (error.name === 'JsonWebTokenError') {
            throw new Error('Token inválido');
        }
        throw new Error('Error en la verificación del token');
    }
};