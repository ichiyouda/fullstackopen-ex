import { useState, useEffect } from 'react'
import personService from './services/person.js'

const Notification = ({ msg }) => {
  if (msg === '') {
    return null
  } else {
    const style = {
      padding: '1em',
      marginBottom: '1em',

      borderStyle: 'solid',
      borderRadius: 10,
      borderWidth: 3,

      backgroundColor: '#d3d3d3',
      fontSize: 16
    }
    if (msg.includes('Added') || msg.includes('Updated')) {
      return (
        <div style={{ ...style, borderColor: 'green', color: 'green' }}>
          {msg}
        </div>
      )
    } else {
      return (
        <div style={{ ...style, borderColor: 'red', color: 'red' }}>
          {msg}
        </div>
      )
    }
  }
}


const Input = ({ val, handle }) => {
  return (
    <>
      <input value={val} onChange={evt => handle(evt.target.value)} />
    </>
  )
}


const Filter = ({ val, handle }) => {
  return (
    <>
      filter shown with <Input val={val} handle={handle} />
    </>
  )
}


const PersonForm = ({ formHandle, val1, val2, handle1, handle2 }) => {
  return (
    <form onSubmit={formHandle}>
      <div>
        name: <Input val={val1} handle={handle1} />
      </div>
      <div>
        number: <Input val={val2} handle={handle2} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}


const Person = ({ persons, filter, setPersons }) => {
  const remove = p => {
    if (window.confirm(`delete ${p.name}`)) {
      console.log(`delete ${p.name}`)
      personService.remove(p.id)
      personService.getAll()
        .then(returnedPersons => setPersons(returnedPersons))
    }
  }
  return (
    <ul>
      {persons.filter(p =>
        p.name.toLowerCase().includes(filter.toLowerCase())).map(p =>
          <li key={p.name}>
            {p.name} {p.number}
            <button onClick={() => remove(p)}>delete</button>
          </li>)}
    </ul>
  )
}


const App = () => {
  const [persons, setPersons] = useState([])
  const [filter, setFilter] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [notificationMsg, setNotificationMsg] = useState('')

  useEffect(() => {
    personService.getAll()
      .then(returnedPersons => setPersons(returnedPersons))
  }, [])

  const addPerson = evt => {
    evt.preventDefault()
    const findedPerson = persons.find(p => p.name === newName)
    if (!findedPerson) {
      const newOne = { name: newName, number: newNumber }
      personService
        .create(newOne)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNotificationMsg(`Added ${returnedPerson.name}`)
          setTimeout(() => {
            setNotificationMsg('')
          }, 3000);
          setNewName('')
          setNewNumber('')
        })
        .catch(err => {
          setNewName('')
          setNewNumber('')
          setNotificationMsg(err.response.data.error)
          setTimeout(() => {
            setNotificationMsg('')
          }, 5000);
        })
    } else {
      if (window.confirm(`${newName} is already added to phonebook, replace old number with a new one?`)) {
        const newOne = { ...findedPerson, number: newNumber }
        personService
          .update(newOne.id, newOne)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id !== returnedPerson.id ? p : returnedPerson))
            setNotificationMsg(`Updated ${returnedPerson.name}`)
            setTimeout(() => {
              setNotificationMsg('')
            }, 3000);
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            setNotificationMsg(`Information of ${newName} has alread been removed from server`)
            setTimeout(() => {
              setNotificationMsg('')
              setPersons(persons.filter(p => p.name !== newName))
            }, 5000);
            setNewName('')
            setNewNumber('')
          })
      }
    }
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification msg={notificationMsg} />
      <Filter val={filter} handle={setFilter} />
      <h2>Add a new</h2>
      <PersonForm
        formHandle={addPerson}
        val1={newName}
        handle1={setNewName}
        val2={newNumber}
        handle2={setNewNumber}
      />
      <h2>Numbers</h2>
      <Person
        filter={filter}
        persons={persons}
        setPersons={setPersons} />
    </div>
  )
}


export default App