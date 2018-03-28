const express = require('express');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`;
	console.log(log);
	fs.appendFile('server.log', log + '\n', (err) => {
		if(err){
			console.log('Unable to append to server.log');
		}
	});
	next();
});

app.get('/', (request, response) => {
	response.send({
		name: 'Kent',
		age: 15,
		likes: [
		'bike',
		'lee'
		]
	});
});

app.get('/about', (request, response) => {
	response.send('About Page');
});

app.listen(port, () =>{
	console.log(` Server is up on port ${port}`);
});