import jwt from 'jsonwebtoken';

export const signToken = (userId, role, Permissions) => {
    return jwt.sign({ id: userId, role: role, Permissions: Permissions }, process.env.SECRET_KEY, { 
        expiresIn: process.env.JWT_EXPIRES_IN || '1h' 
    });
}

export const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.SECRET_KEY);
    } catch (err) {
        return null;
    }
}

export default {
    signToken,
    verifyToken 
}