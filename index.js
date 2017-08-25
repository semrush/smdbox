let express = require('express');
let path = require('path');

let mode = process.env.NODE_ENV;
let app = express();

app.use('/', express.static('build'));

app.get('/test', function (req, res) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    res.sendFile(path.join(__dirname, '/app/assets/smd.json'));
});

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '/build/index.html'));
});



let port = process.env.PORT || 8082;

app.listen(port, function () {
    console.log('server is running on port ' + port);
});
