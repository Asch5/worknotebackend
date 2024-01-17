const headersSettings = {
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    //origin: 'https://worknotes.onrender.com',
    //origin: 'http://localhost:3000',
    headers:
        'Content-Type, Authorization, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers',
};

module.exports = headersSettings;
