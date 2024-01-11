const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    // const cookies = req.cookies;

    // console.log('verifyJWT - authHeader', authHeader);
    // console.log('verifyJWT - cookies', cookies);

    if (req.method === 'OPTIONS') {
        return next();
    }

    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({
            message: 'Unauthorized in verifyJWT (There is not the authHeader)',
        });
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err)
            return res.status(403).json({ message: 'Forbidden in verifyJWT' });
        req.user = decoded.UserInfo.username;
        req.roles = decoded.UserInfo.roles;
        next();
    });
};

module.exports = verifyJWT;
