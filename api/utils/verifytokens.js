import jwt from "jsonwebtoken";
import {createError} from "../utils/error.js"

export const verifyToken = (req, res, next) => {
    const token = req.cookies.acces_token;

    console.log('Received token:', token);

    if (!token) {
        console.log('No token found');
        return next(createError(401, 'You are not authenticated'));
    }

    jwt.verify(token, process.env.JWT, (err, user) => {
        if (err) {
            console.error('Token verification failed:', err.message);
            return next(createError(403, 'Token is not valid!'));
        }

        console.log('User authenticated:', user);
        req.user = user;
        next();
    });
};

export const verifyUser = (req, res, next) => {
    verifyToken(req, res,next, () => {
        const requestedUserId = req.params.id;

        console.log('Requested User ID:', requestedUserId);
        console.log('Authenticated User ID:', req.user.id);
        console.log('Is Admin:', req.user.isAdmin);

        // Check user authorization
        if (req.user.id === requestedUserId || req.user.isAdmin) {
            console.log('User is authorized');
            next(); // User is authorized, proceed to the next middleware/route handler
        } else {
            console.error('You are not authorized');
            return next(createError(403, 'You are not authorized'));
        }
    });
};


export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res,next, () => {
        

        // Check user authorization
        if ( req.user.isAdmin) {
            console.log('Admin authorized');
            next(); // User is authorized, proceed to the next middleware/route handler
        } else {
            console.error('You are not Admin');
            return next(createError(403, 'You are not Admin'));
        }
    });
};

