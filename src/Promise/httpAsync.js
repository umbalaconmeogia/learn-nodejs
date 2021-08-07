const http = require('./libs/http');

for (let i = 1; i <= 10; i++) {
    http.get(`request ${i}`);
}