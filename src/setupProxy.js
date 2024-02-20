//경로

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            // target: 'http://112.172.231.134:8080',   // 서버 URL or localhost:설정한포트번호
            target: 'http://localhost:8080',    //내 컴퓨터에서 햘때
            changeOrigin: true,
        })
    );
};