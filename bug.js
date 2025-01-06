const http = require('http');

const server = http.createServer((req, res) => {
  // Simulate a long-running task
  let count = 0;
  const interval = setInterval(() => {
    count++;
    if (count === 5) {
      clearInterval(interval);
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('Done');
    }
  }, 1000);

  // If the client closes the connection before the task is finished, the 'finish' event won't fire.
  req.on('close', () => {
    console.log('Client closed connection');
    clearInterval(interval);
  });
});

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});