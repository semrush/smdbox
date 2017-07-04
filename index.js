let express = require('express');
let path = require('path');

let mode = process.env.NODE_ENV;
let app = express();

app.use('/', express.static('build'));
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '/build/index.html'));
});

let port = process.env.PORT || 8082;

app.listen(port, function () {
    console.log('server is running on port ' + port);
});
