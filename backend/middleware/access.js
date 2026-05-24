import { requireAuth } from "./auth";

export const requireAcess = (...roles) => {
    return [requireAuth, (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: `Forbidden: insufficient rights. Required roles: ${roles.join(', ')}` });
        }
        next();
    }];
}

export const requirePermissions = (...permissions) => {
    return [requireAuth, (req, res, next) => {
        const userPermissions = req.user.Permissions || [];
        const hasPermissions = permissions.every(permission => userPermissions.includes(permission));
        if (!hasPermissions) {
            return res.status(403).json({ message: `Forbidden: insufficient permissions. Required permissions: ${permissions.join(', ')}` });
        }
        next();
    }];
}