//경로

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://183.102.80.174:8080',   // 서버 URL or localhost:설정한포트번호
            changeOrigin: true,
        })
    );
};