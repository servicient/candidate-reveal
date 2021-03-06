var express = require('express'),
  auth = require('basic-auth'),
  app = express(),
  debug = require('debug')('http');

/* CONFIG */
// pass connection info from proxy to app
app.set('trust proxy', true);

/* ROUTES */
app.get('/reveal', reveal);

/* SERVER */
var server = app.listen(process.env.PORT, function () {
  var host = server.address().address;
  var port = server.address().port;
  debug('listening at http://%s:%s', host, port);
});

/* REQ HANDLERS */
function reveal (req, res) {
  var credentials = auth(req);
  var allow = credentials &&
    credentials.name === process.env.USER &&
    credentials.pass === process.env.PASS;

  // check for SSL connection
  if (req.secure) {
    if (allow) {
      res.writeHead(200, 
        {'X-Tennis': 'Tennis for everyone!'}
      );
      res.end('Well done! The answer is: ' + process.env.EMAIL + '\n');
    } else {
      res.writeHead(401, 
        {'WWW-Authenticate': 'Basic realm="Servicient"'}
      );
      res.end("Keep trying! https://www.youtube.com/watch?v=RfiQYRn7fBg\n");
    }
  } else {
    res.end("Don't forget to use HTTPS! Try again!\n");
  }
}
