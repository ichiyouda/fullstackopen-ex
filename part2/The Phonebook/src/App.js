import { useState } from 'react'

const Filter = ({ val, handle }) => {
  return (
    <div>
      filter shown with <input value={val} onChange={evt => handle(evt.target.value)} />
    </div>
  )
}


const PersonForm = ({ val1, val2, handle1, handle2, formHandle }) => {
  return (
    <form onSubmit={formHandle}>
      <div>
        name: <input value={val1} onChange={evt => handle1(evt.target.value)} />
      </div>
      <div>
        number: <input value={val2} onChange={evt => handle2(evt.target.value)} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}


const Person = ({ persons, filter }) => {
  return (
    <>
      {persons.filter(p => 
        p.name.toLowerCase().includes(filter.toLowerCase())).map(p => 
        <li key={p.name}>{p.name} {p.number}</li>)}
    </>
  )
}


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [filter, setFilter] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')


  const addNameHandle = evt => {
    evt.preventDefault()
    if (persons.find(p => p.name === newName) === undefined) {
      setPersons([...persons, { name: newName, number: newNumber }])
      setNewName('')
      setNewNumber('')
    } else {
      alert(`${newName} is already added to phonebook`)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter val={filter} handle={setFilter} />
      <h2>add a new</h2>
      <PersonForm formHandle={addNameHandle}
        val1={newName}
        handle1={setNewName}
        val2={newNumber}
        handle2={setNewNumber}
      />
      <h2>Numbers</h2>
      <Person filter={filter} persons={persons} />
    </div>
  )
}

export default App