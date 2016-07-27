var mysql      = require('mysql2');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'webView',
  password : 'cavalopitagoras*wrath',
  database : 'trabalhobd'
});

connection.connect();

connection.query('SELECT ano, valor FROM aposentadoria LIMIT 10;', function(err, rows, fields) {
  if (err) throw err;
  console.log(rows);
  console.log('The solution is: ', rows[0].solution);
});

connection.end();