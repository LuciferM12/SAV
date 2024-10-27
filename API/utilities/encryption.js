import bcrypt from 'bcrypt'

const saltRounds = 10

export const hash = async (password) => {
    try {
        const salt = await bcrypt.genSalt(saltRounds)
        const hashed = await bcrypt.hash(password, salt)
        return hashed
    } catch (error) {
        throw error
    }
}

export const check = async (password, hashed) => {
    try {
        const match = await bcrypt.compare(password, hashed)
        return match
    } catch (error) {
        throw error
    }
}