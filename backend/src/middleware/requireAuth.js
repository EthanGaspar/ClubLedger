import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const requireAuth = async (req, res, next) => {

    // Destructures to "bearer" <token>
    const { authorization } = req.headers;

    //Authorization missing
    if (!authorization) {
        return res.status(401).json({ error: 'Authorization token required' });
    }

    //isolate the token from "bearer"
    const token = authorization.split(' ')[1];

    try {
        //Verify the token is valid
        const { _id } = jwt.verify(token, process.env.SECRET_KEY_JWT);

        req.user = await User.findOne({ _id }).select('_id');
        next(); //Run middleware functions after requireAuth (see memberRoutes.js)


    } catch (error) {
        console.error(error);
        return res.status(401).json({ error: 'Request is not authorized' });
    }

}

export default requireAuth;