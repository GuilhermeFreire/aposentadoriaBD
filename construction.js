var http = require('http');
var contents = require('util');
var fs = require('fs');
var mainPage, style, script;
fs.readFile('~/trabalhoBD/construction.html', (er, html) => {mainPage = html;});
fs.readFile('~/trabalhoBD/style.css', (er, css) => {style = css;});
fs.readFile('~/trabalhoBD/script.js', (er, js) => {script = js;});

function handleRequest(request, response){
	console.log("-> " + request.url);
	var final = parseURL(request.url);
	console.log("==>", final);
	response.writeHead(200, {'Content-Type': final.type});
	response.end(final.content);

}

http.createServer(handleRequest).listen(80);

console.log('Server running at http://127.0.0.1:80/');

function parseURL(url){
	switch(url){
		case "/bd":
			return {
				content: mainPage,
				type: "text/html"
			};
		case "/style.css":
			return {
				content: style,
				type: "text/css"
			};
		case "/script.js":
			return {
				content: script,
				type: "text/javascript"
			};
		default:
			return {
				content: "",
				type: "text/html"
			};
	}
}