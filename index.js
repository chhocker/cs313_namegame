const express = require('express');
const { Pool } = require('pg');
const pg = new Pool();

var app = express();

pg.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err)
  process.exit(-1)
});

app.set('port', process.env.PORT || 5000)
    .use(express.static(__dirname + '/public'))
    .set('views', __dirname + '/views')
    .set('view engine', 'ejs')
    .get('/', function (req, res) {
        res.sendFile('form.html', { root: __dirname + '/public' });
    })
    .get('/display_names', function (req, res, next) {
        pg.connect(conString, function (err, client, done) {
            if (err) {
                return console.error('error fetching client from pool', err);
            }
            console.log("connected to database");
            client.query('SELECT * FROM ' + req.query.name_type, function (err, result) {
                done();
                if (err) {
                    return console.error('error running query', err);
                }
                res.send(result);
                client.release();

            });
        });
    })
    .listen(app.get('port'), function () {
        console.log('Listening on port: ' + app.get('port'));
    });
