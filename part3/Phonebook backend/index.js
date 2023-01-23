console.log("hello express");

require('dotenv').config()
const express = require('express')
const app = express()

const Person = require('./models/person')

// ----------- LOG ------------
const morgan = require('morgan')
morgan.token('postBody', req => {
    if (req.method === 'POST') {
        return JSON.stringify(req.body)
    } else {
        return ''
    }
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :postBody'))

// ------------ CORS ----------
const cors = require('cors')
app.use(cors())

// ----------- FRONTEND ------------
app.use(express.static('build'))


/* get all persons */
app.get('/api/persons', (req, res) => {
    Person.find({})
        .then(returnedP => {
            res.json(returnedP)
        })
})


app.get('/info', (req, res) => {
    const info = `
        <p>Phonebook has info for ${persons.length} people </p>
        <p> ${new Date()}</p>`
    res.send(info)
})


/* get specified person */
app.get('/api/persons/:id', (req, res) => {
    Person.findById(req.params.id)
        .then(theOne => {
            res.json(theOne)
        })
        .catch(err => {
            res.status(404).send('404')
            console.log(`error: ${err}`)
        })
})


/* delete specified person */
app.delete('/api/persons/:id', (req, res) => {
    Person.deleteOne({id: req.params.id}, console.log)
    res.status(204).end()
})


/* add new person */
app.use(express.json())
app.post('/api/persons', (req, res) => {
    const newOne = req.body
    if (!newOne.name) {
        res.status(404).json({ error: 'name or number is missing' })
    } else {
        Person.find({ name: newOne.name })
            .then(returnedP => {
                if (returnedP.name) {
                    res.status(201).json({ error: 'name must be unique.' })
                } else {
                    new Person(newOne).save()
                        .then(savedOne => {
                            console.log(`savedOne ${savedOne}`)
                            res.json(savedOne)
                        })
                }
            })
            .catch(err => {
                console.log(`error: ${err}`)
            })

    }
})


// -------------- handle unknown endpoint ------------
const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})