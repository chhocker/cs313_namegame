const express = require('express');
const session = require('express-session');
const { Pool } = require('pg');

const PORT = process.env.PORT || 5000;

const connectionString = (process.env.DATABASE_URL || "postgres://user:GBMilKen13@localhost:5432/postgres");
const pool = new Pool({ connectionString: connectionString });

var app = express();

const router = express.Router();


var sess;

app.set('port', PORT)
  .use(express.static(__dirname + '/public'))
  .use(session({ secret: 'ssshhhhh', saveUninitialized: true, resave: true }))
  .set('views', __dirname + '/views')
  .set('view engine', 'ejs');


  router.get('/', function (req, res) {
    res.sendFile('form.html', { root: __dirname + '/public' });
  });

router.get('/round1/mom', function (req, res) {
  sess = req.session;
  sess.nameType = req.query.name_type;
  sess.lastName = req.query.lastName || "Smith";

    res.render('round1_mom.ejs', {lastName :lastName});
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
  });

  app.listen(app.get('port'), function () {
    console.log('Listening on port: ' + app.get('port'));
  });
  app.use('/', router);


function getNames(req, res) {
  console.log("get names information");
  var tableName = req.query.name_type;
  getNamesFromTable(tableName, function (error, result) {
    if (error || result == null || result.length != 1) {
      res.status(500).json({ success: false, data: error });
    } else {
      res.json(result[0]);
    }
  });
}

function getNamesFromTable(tableName, callback) {
  console.log("getNamesFromTable called for the ", tableName, " table");
  var sql = "SELECT name FROM $tableName";
  var params = [tableName];
  pool.query(sql, params, function (err, result) {
    if (err) {
      console.log(err);
      callback(err, null);
    } else {
      console.log("Found DB result: " + JSON.stringify(result.rows));
      callback(null, result.rows);
    }

  });
}