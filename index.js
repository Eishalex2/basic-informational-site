import http from 'http';
import fs from 'fs';
import path from 'path';
import * as url from 'url';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const server = http.createServer((req, res) => {
  let filePath = path.join(
    __dirname, 
    'public', 
    req.url === '/' ? 'index' : req.url
  );

  fs.readFile(filePath + '.html', (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        // Page not found
        fs.readFile(path.join(__dirname, 'public', '404.html'), (err, content) => {
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(content, 'utf8');
        });
      } else {
        // server error
        res.writeHead(500);
        res.end(`Server error: ${err.code}`);
      }
    } else {
      // success
      res.writeHead(200, { 'Content-Type': 'text/html'});
      res.end(content, 'utf8');
    }
  });
});

server.listen(8080, () => console.log('Server running on port 8080'));