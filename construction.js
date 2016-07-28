var http = require('http');
var contents = require('util');
var fs = require('fs');
var mainPage, constructionPage, style, constructionStyle, script;

//Load all files
fs.readFile('./construction.html', (er, html) => {
	if(er){
		throw er;
	}
	constructionPage = html;});
fs.readFile('./index.html', (er, html) => {mainPage = html;});
fs.readFile('./style.css', (er, css) => {style = css;});
fs.readFile('./construction.css', (er, css) => {constructionStyle = css;});
fs.readFile('./script.js', (er, js) => {script = js;});
fs.readFile('./queries.json', (er, json) => {queries = JSON.parse(json)})


var mysql = require('mysql2');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'webView',
  password : 'cavalopitagoras*wrath',
  database : 'trabalhobd'
});

connection.connect();

function makeQuery(query, callback){
	console.log("Executing query: ", query);
	connection.query(query, function(err, rows, fields) {
	  if (err) throw err;
	  callback({
				content: JSON.stringify(rows),
				type: "application/json"
			});
	});
}

//Server response handling
function handleRequest(request, response){
	console.log("-> " + request.url);
	parseURL(request.url, function(final){
		response.writeHead(200, {'Content-Type': final.type});
		response.end(final.content);
     	console.log("==>", final);
	});
}

//Create Server
http.createServer(handleRequest).listen(80);
console.log('Server running at http://127.0.0.1:80/');


//Routes
function parseURL(url, callback){
	var splitUrl = url.split('/');
	switch(splitUrl[1]){
		case "bd":
			console.log(constructionPage);
			callback({
				content: constructionPage,
				type: "text/html"
			});
			break;
		case "preview":
			callback({
				content: mainPage,
				type: "text/html"
			});
			break;
		case "style.css":
			callback({
				content: style,
				type: "text/css"
			});
			break;
		case "construction.css":
			callback({
				content: constructionStyle,
				type: "text/css"
			});
			break;
		case "script.js":
			callback({
				content: script,
				type: "text/javascript"
			});
			break;
		case "query":
			console.log("Fazendo queries");
			if(splitUrl.length == 3 && typeof splitUrl[2] === 'string' && queries.queries[splitUrl[2]] !== undefined){
				makeQuery(queries.queries[splitUrl[2]], callback);			
			}else{
				callback({
					content: "{}",
					type: "application/json"
				});
			}
			break;
		default:
			callback({
				content: "",
				type: "text/html"
			});
	}
}