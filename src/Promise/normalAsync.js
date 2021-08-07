const http = require('./myhttp');

for (let i = 1; i <= 10; i++) {
    http.get(`request ${i}`);
}