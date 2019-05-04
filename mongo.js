const mongoose = require('mongoose')

if (process.argv.length < 3) {
	console.log('give password')
	process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://jorma:${password}@cluster0-4hbnp.mongodb.net/puhelinluettelo?retryWrites=true`

mongoose.connect(url, { useNewUrlParser: true })

const personSchema = new mongoose.Schema({
	name: String,
	number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length == 3) { // Print all persons
	Person.find({}).then(res => {
		console.log(`puhelinluettelo: `)
		res.forEach(p => {
			console.log(`${p.name}, ${p.number}`)
		})
  		mongoose.connection.close()
	})
} else if (process.argv.length == 5) {
	// Create/update
	const name = process.argv[3];
	const number = process.argv[4];

	Person.find({ name: name }).then(res => {
		if (res.length == 0) {
			const person = new Person({
				name: name,
				number: number,
			})
			person.save().then(res => {
				console.log(`lis‰t‰‰n ${person.name} numero ${person.number} luetteloon`)
	  			mongoose.connection.close()
			})
		} else {
			let person = res[0];
			person.number = number;
			person.save().then(res => {
				console.log(`p‰ivitet‰‰n ${person.name} numero ${person.number} luetteloon`)
	  			mongoose.connection.close()
			})
		}
	})
}
