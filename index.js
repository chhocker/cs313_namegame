const express = require('express');
const { Pool } = require('pg');

const PORT = process.env.PORT || 5000;

const pool = new Pool({
    connectionString: (process.env.DATABASE_URL || "postgres://zxcuebqralxfwx:cf708391869ae04dc229c2f1f6eb4554a988f676b3f83835fe1f91655852b0a5@ec2-54-225-195-3.compute-1.amazonaws.com:5432/d8tv2cfd39g9i5")
  });

var app = express();

app.set('port', PORT)
    .use(express.static(__dirname + '/public'))
    .set('views', __dirname + '/views')
    .set('view engine', 'ejs')
    .get('/', function (req, res) {
        res.sendFile('form.html', { root: __dirname + '/public' });
    })
    .get('/round1/mom', function (req, res) {
        res.render('round1_mom.ejs');

      })
      .get('/round1/dad', function (req, res) {
        res.render('round1_dad.ejs');

      })
      .get('/round2/mom', function (req, res) {
        res.render('round2_mom.ejs');

      })
      .get('/round2/dad', function (req, res) {
        res.render('round2_dad.ejs');

      })
      .get('/round3/mom', function (req, res) {
        res.render('round3_mom.ejs');

      })
      .get('/round3/dad', function (req, res) {
        res.render('round3_dad.ejs');
      })
      .get('/results', function (req, res) {
        res.render('results.ejs');
      })
    .listen(app.get('port'), function () {
        console.log('Listening on port: ' + app.get('port'));
    });
