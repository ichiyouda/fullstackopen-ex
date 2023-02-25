/* eslint-disable indent */
console.log('hello express!')

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
app.use(express.json())



/* get all persons */
app.get('/api/persons', (req, res) => {
    Person.find({})
        .then(returnedP => {
            res.json(returnedP)
        })
})


/* info */
app.get('/info', (_req, res) => {
    Person.find({})
        .then(returnedP => {
            const info = `
                <p>Phonebook has info for ${returnedP.length} people </p>
                <p> ${new Date()}</p>`
            res.send(info)
        })
})


/* get specified person */
app.get('/api/persons/:id', (req, res, next) => {
    Person.findById(req.params.id)
        .then(person => {
            if (person) {
                res.json(person)
            } else {
                console.log(`person ${person}`)
                res.status(404).end()
            }
        })
        .catch(error => next(error))
})


/* delete specified person */
app.delete('/api/persons/:id', (req, res, next) => {
    Person.findByIdAndRemove(req.params.id)
        .then(() => {
            res.status(204).end()
        })
        .catch(err => next(err))
})


/* add new person */
app.post('/api/persons', (req, res, next) => {
    const body = req.body
    Person.find({ name: body.name })
        .then(returnedP => {
            if (returnedP.name) {
                res.status(201).json({ error: 'name must be unique.' })
            } else {
                new Person(body).save()
                    .then(savedOne => {
                        console.log(`savedOne ${savedOne}`)
                        res.json(savedOne)
                    })
                    .catch(err => next(err))
            }
        })
})


/* update a person */
app.put('/api/persons/:id', (req, res, next) => {
    const { name, number } = req.body
    Person.findByIdAndUpdate(
        req.params.id,
        { name, number },
        { runValidators: true, context: 'query', new: true }
    )
        .then(updatedP => {
            res.json(updatedP)
        })
        .catch(error => next(error))
})


// -------------- handle unknown endpoint ------------
const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)


// --------------- Port -----------------
// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})


// ---------------- error handle ---------------
const errorHandler = (error, _request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }

    next(error)
}

// this has to be the last loaded middleware.
app.use(errorHandler)