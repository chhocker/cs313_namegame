const express = require('express');
const { Pool } = require('pg');
const connectionString = {
    connectionString:(process.env.DATABASE_URL 
        || 'postgres://zxcuebqralxfwx:cf708391869ae04dc229c2f1f6eb4554a988f676b3f83835fe1f91655852b0a5@ec2-54-225-195-3.compute-1.amazonaws.com:5432/d8tv2cfd39g9i5'),
    ssl: true
    };

var app = express();
const pool = new Pool({
    connectionString
        : connectionString
});

app.set('port', process.env.PORT || 5000)
    .use(express.static(__dirname + '/public'))
    .set('views', __dirname + '/views')
    .set('view engine', 'ejs')
    .get('/', function (req, res) {
        res.sendFile('form.html', { root: __dirname + '/public' });
    })
    .get('/display_names', function (req, res) {
        pool.on('connect', () => console.log('connected to db'));
        console.log(req.query.name_type);
            //res.send(result);

    })
    .listen(app.get('port'), function () {
        console.log('Listening on port: ' + app.get('port'));
    });
