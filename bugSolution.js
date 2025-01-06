const http = require('http');

const server = http.createServer((req, res) => {
  let count = 0;
  const interval = setInterval(() => {
    count++;
    if (count === 5) {
      clearInterval(interval);
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('Done');
    } else if (req.aborted) {
      clearInterval(interval);
      console.log('Client aborted connection');
    }
  }, 1000);

  req.on('aborted', () => {
    clearInterval(interval);
    console.log('Client aborted connection');
  });
});

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});