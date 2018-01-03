var http = require('http'),
    fs = require('fs');

var server = http.createServer(function(req, res) {
    fs.createReadStream(__dirname + '/index.html').pipe(res);
});

require('socket.io')(server)
    .use(require('./socket-handler')())

server.listen(9000, function() {
    console.log("Server is listening on port %d", server.address().port);
});