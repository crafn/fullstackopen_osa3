const express = require('express')
var morgan = require('morgan')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(cors())

app.use(bodyParser.json())

app.use(express.static('build'))

morgan.token('body', (req, res) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let db = [
 	{
    	"name": "Arto Hellas",
    	"number": "234234",
    	"id": 1
    },
    {
    	"name": "Martti Tienari",
    	"number": "040-123456",
    	"id": 2
    },
    {
    	"name": "Arto Järvinen",
    	"number": "040-123456",
    	"id": 3
    },
]

app.get('/api/persons', (req, res) => {
	res.json(db)
})

app.get('/api/persons/:id', (req, res) => {
	let id = Number(req.params.id)
	let found = db.filter((p) => (p.id === id));
	if (found.length > 0) {
		res.json(found[0]);
	} else {
		res.status(404).end();
	}
})

app.post('/api/persons', (req, res) => {
	if (req.body.name === undefined || req.body.name === null) {
		res.json({ error: 'name missing' });
		return;
	}
	if (req.body.number === undefined || req.body.number === null) {
		res.json({ error: 'number missing' });
		return;
	}
	if (db.filter(p => p.name === req.body.name).length > 0) {
		res.json({ error: 'name must be unique' });
		return;
	}
	let newPerson = {
		name: req.body.name,
		number: req.body.number,
		id: Math.floor(Math.random()*1000*1000)
	}
	db.push(newPerson)
	res.json(newPerson)
})

app.delete('/api/persons/:id', (req, res) => {
	let id = Number(req.params.id)
	db = db.filter((p) => (p.id !== id));
	res.status(204).end();
})

app.get('/info', (req, res) => {
	res.send(
		'<p>Puhelinluettelossa ' + db.length + ' henkilön tiedot</p>' +
		'<p>' + new Date() + '</p>')
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
