var http = require('http'),
  auth = require('basic-auth'),
  server = http.createServer(serve);

function serve (req, res) {
  var credentials = auth(req);
  var allow = credentials &&
    credentials.name === process.env.USER &&
    credentials.pass === process.env.PWD;

  if (req.connection.encrypted) {
    if (allow) {
      res.end('Well done! The answer is: ' + process.env.EMAIL + '\n');
    } else {
      res.writeHead(401, 
        {'WWW-Authenticate': 'Basic realm="Servicient"',
         'X-Servicient': 'Tennis for everyone!'}
      );
      res.end("Keep trying! https://www.youtube.com/watch?v=RfiQYRn7fBg\n");
    }
  } else {
    res.end("Don't forget to use SSL! Try again!\n");
  }
}

server.listen(process.env.PORT);
