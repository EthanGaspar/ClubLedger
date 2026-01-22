import jwt from 'jsonwebtoken';

const requireAuth = async (req, res, next) => {
    // Verify authentication
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ error: 'Authorization token required' });
    }

    if (!authorization.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Invalid authorization format' });
    }

    const token = authorization.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Authorization token required' });
    }

    try {
        const { _id } = jwt.verify(token, process.env.SECRET_KEY_JWT);
        
        // Attach user ID to request object
        req.user = { _id };
        next();
    } catch (error) {
        console.error('Auth error:', error);
        return res.status(401).json({ error: 'Request is not authorized' });
    }
};

export default requireAuth;
