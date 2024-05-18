/* const express = require('express');
const app = express();
const port = process.env.PORT || 3000

// Middleware
app.use(express.json())
app.use(express.static('public'))

app.use('/api/todos', require('./api-routes'))
//app.use('/api/todos', require('./api-routes')); */





//app.use('/api/v1', require('./routes/api-v1'));
//app.use(require('./routes/static'))


/* const todos = [
	{ id: 1, item: 'Learn JavaScript', complete: false },
	{ id: 2, item: 'Learn Express', complete: false },
	{ id: 3, item: 'Build a To Do App', complete: false }
] */


/* const message = `Server running: http://localhost:${port}`
app.listen(port, () => console.log(message)) */

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static('public'));


app.use('/api/todos', require('./api-routes/api-routes'))
//app.use( require('./api-routes/api-routes'))

// Start the server
const message = `Server running: http://localhost:${port}`
app.listen(port, () => console.log(message)) 