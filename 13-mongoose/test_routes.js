const http = require('http');
const routes = ['/', '/homes', '/favorite', '/host/host-home-list', '/host/add-home'];
const checkRoute = (path) => new Promise((resolve) => {
  http.get(`http://localhost:4000${path}`, (res) => {
    console.log(`Route ${path} - Status: ${res.statusCode}`);
    resolve();
  }).on('error', (e) => {
    console.error(`Route ${path} - Error: ${e.message}`);
    resolve();
  });
});
(async () => {
  for (const route of routes) {
    await checkRoute(route);
  }
})();
