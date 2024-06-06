const http = require("http");
const port = 3000;

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/html'); //mime type   ---- el navegador asi sabe que va a interpretar
    res.write('<h1>index</h1>');
    res.end();
});

server.listen(port, () => {
    console.log("Server listen on port: " + port);
});
