import jwt from 'jsonwebtoken'

const secretKey = 'secret'

export const generate = (data) => {
    const token = jwt.sign(data, secretKey, { expiresIn: '72h' })
    return token
}

export const verify = (token) => {
    try {
        const decoded = jwt.verify(token, secretKey)
        return decoded
    } catch (error) {
        throw error
    }
}