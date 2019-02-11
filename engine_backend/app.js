const express = require('express');
const bodyParser = require('body-parser');
const dbConfig = require('./helpers/database.config.js');
const mongoose = require('mongoose');

// Connecting to the database
mongoose.connect(dbConfig.url, {
	useNewUrlParser: true
})
	.then(() => {
		console.log('Successfully connected to the database.');
	})
	.catch(err => {
		console.log('Could not connect to the database. Exiting now...', err);
		process.exit();
	});

// Creates express app
const app = express();

// Parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// Prase requests of content-type: application/json
app.use(bodyParser.json())

app.get('/', (req,res) => {
	res.json({ "message": "One Rule" })
});

// Require Routes
require('./routes/user.routes.js')(app);
require('./routes/rules.routes.js')(app);

// Listen for requests
app.listen(9000, () => {
	console.log("Server is listening to port 9000");
});
