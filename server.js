var http = require('http'), 
    fs = require('fs'), 
    url = require('url'),
    port = 8080;

var listingData, server;

var requestHandler = function(request, response) {
  if (request.method === 'GET' && request.url === '/listings') {
    response.end(JSON.stringify(listingData));
  }
  else {
    response.statusCode = 404;
    response.end('Bad gateway error');
  }
};

fs.readFile('listings.json', 'utf8', function(err, data) {
  if (err) throw err;
  listingData = JSON.parse(data);
  server = http.createServer(requestHandler);
  server.listen(port, function() {
    console.log('Server listening on: http://localhost:' + port);
  });
});
