import { verify } from "../../utilities/tokens.js";

export default function decode(req, res) {
    try {
        const token = req.headers.authorization

        const user = verify(token)
        return res.status(200).json({ ...user, token })
    } catch (error) {
        return res.status(400).json(`Token inválido`)
    }
}