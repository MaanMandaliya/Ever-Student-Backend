// Express Middleware: Authorization
const GlobalError = require('../utils/GlobalError');

module.exports = (req, res, next) => {
    const headerValues = req.headers['authorization'];
    const whitelist = ['/users/signup', '/users/login'];

    // Check if the request is whitelisted
    if (whitelist.includes(req.path)) {
        return next();
    }
    // Check if header is present
    if (headerValues) {
        const token = headerValues.split(' ')[1];
        if (token) {
            // decode base 64
            const decoded = Buffer.from(token, 'base64').toString('ascii');
            req.user = decoded;
            return next();
        }
    }

    const err = new GlobalError(401, 'failed', 'Unauthorized User');
    return err.sendError(res);
};
