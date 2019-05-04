require('dotenv').config()
const express = require('express')
var morgan = require('morgan')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true) // Silence deprecation warning
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true })
const personSchema = new mongoose.Schema({
	name: { type: String, required: true, unique: true, minlength: 3 },
	number: { type: String, required: true, minlength: 8 }
})
personSchema.set('toJSON', {
	transform: (document, ret) => {
		ret.id = ret._id.toString()
		delete ret._id
		delete ret.__v
	}
})
personSchema.plugin(uniqueValidator)
const Person = mongoose.model('Person', personSchema)

app.use(cors())

app.use(bodyParser.json())

app.use(express.static('build'))

morgan.token('body', (req, res) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get('/api/persons', (req, res, next) => {
	Person.find({}).then(people => {
		res.json(people.map(p => p.toJSON()))
	})
	.catch(e => next(e))
})

app.get('/api/persons/:id', (req, res, next) => {
	let id = req.params.id
	Person.find({ _id: id }).then(people => {
		if (people.length > 0) {
			res.json(people[0].toJSON());
		} else {
			res.status(404).end();
		}
	})
	.catch(e => next(e))
})

app.post('/api/persons', (req, res, next) => {
	// Validator takes care
	/*
	if (req.body.name === undefined || req.body.name === null) {
		res.json({ error: 'name missing' });
		return;
	}
	if (req.body.number === undefined || req.body.number === null) {
		res.json({ error: 'number missing' });
		return;
	}
	*/
	/*
	Person.find({ name: req.body.name }).then(peopleWithSameName => {
		if (peopleWithSameName.length > 0) {
			res.json({ error: 'name must be unique' });
			return;
		}
		*/
		let newPerson = new Person({
			name: req.body.name,
			number: req.body.number,
		})
		newPerson.save().then(r => {
			res.json(r.toJSON())
		})
		.catch(e => next(e))
	/*
	})
	.catch(e => next(e))
	*/
})

app.put('/api/persons/:id', (req, res, next) => {
	let id = req.params.id
	if (req.body.number === undefined || req.body.number === null) {
		res.json({ error: 'number missing' });
		return;
	}
	Person.findOne({ _id: id }).then(person => {
		person.number = req.body.number;
		person.save().then(r => {
			res.json(r.toJSON())
		})
		.catch(e => next(e))
	})
	.catch(e => next(e))
})

app.delete('/api/persons/:id', (req, res, next) => {
	let id = req.params.id
	Person.findByIdAndRemove(id).then(r => {
		res.status(204).end();
	})
	.catch(e => next(e))
})

app.get('/info', (req, res, next) => {
	Person.find({}).then(people => {
		res.send(
			'<p>Puhelinluettelossa ' + people.length + ' henkilön tiedot</p>' +
			'<p>' + new Date() + '</p>')
	})
	.catch(e => next(e))
})

app.use((req, res) => {
	res.status(404).send({ error: 'unknown endpoint' })
});

// Error handler
app.use((error, req, res, next) => {
	console.error('ERROR ', error.message)
	if (error.name === 'CastError' && error.kind == 'ObjectId') {
		return res.status(400).send({ error: 'malformatted id' })
	} else if (error.name === 'ValidationError') {
		return res.status(400).json({ error: error.message })
	}
	next(error)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
