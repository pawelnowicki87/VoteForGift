import { User } from '../models/user.js'

const register = async (req, res, next) => {
    const { firstName, lastName, email, password } = req.body;

    const user = await User.create({ firstName, lastName, email, password });

    res.send(user)
}


export const authController = {
    register
}