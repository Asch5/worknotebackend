const allowedOrigins = require('./allowedOrigins');
const headersSettings = require('./headersSettings');
headersSettings;

const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            console.log('origin allowed --- ', origin);
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },

    //origin: headersSettings.origin,
    methods: headersSettings.methods,
    allowedHeaders: headersSettings.headers,
    // exposedHeaders: ['Content-Length', 'X-Foo', 'X-Bar'],
    credentials: true,
    optionsSuccessStatus: 204,
};

module.exports = corsOptions;
