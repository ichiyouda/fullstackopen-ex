/* eslint-disable no-undef */
const mongoose = require('mongoose')

const argLen = process.argv.length
if (argLen < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
} else {
    const password = process.argv[2]
    const url = `mongodb+srv://peko:${password}@cluster0.k9fblr1.mongodb.net/Phonebook?retryWrites=true&w=majority`
    const personSchema = new mongoose.Schema({
        name: String,
        number: String
    })
    const Person = mongoose.model('Person', personSchema)

    if (argLen === 3) {
        mongoose
            .connect(url)
            .then(() => {
                console.log('connected...\n')
                console.log('Phonebook:')
                Person.find({}).then(result => {
                    result.forEach(p => {
                        console.log(`${p.name} ${p.number}`)
                    })
                    mongoose.connection.close()
                })
            })
    } else {
        const newName = process.argv[3]
        const newNum = process.argv[4]
        mongoose
            .connect(url)
            .then(() => {
                console.log('connected...\n')

                const newP = new Person({
                    name: newName,
                    number: newNum
                })
                return newP.save()
            })
            .then(() => {
                console.log(`Added ${newName} number ${newNum} to the phonebook`)
                return mongoose.connection.close()
            })
            .catch((err) => console.log(err))
    }
}
