const { createProxyMiddleware } = require('http-proxy-middleware');


const options = {
    target: 'http://localhost:8080',
    // changeOrigin: true,
};
/**
 * Explanation on proxy in vid 6.5. The Beauty of create-react-app's Proxy
 * In production env, we serve up the pre-built bundle.js, so there's no create-react-app server
 * running, therefore no need to change the proxy target to accomodate for the prod env
 */
module.exports = (app) => {
    app.use(
        ['/auth/google/', '/api/*'],
        createProxyMiddleware(options)
    );

    // app.use(
    //     '/api/*',
    //     createProxyMiddleware(options)
    // );
};