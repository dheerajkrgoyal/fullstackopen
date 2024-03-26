import { useState } from "react"
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  const allPersons = persons.filter(person => person.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchTerm = (event) => {
    setSearchTerm(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const duplicate = persons.findIndex(person => person.name === newName)
    if(duplicate === -1){
      const newPerson = {name: newName, number: newNumber, id: persons.length+1}
      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewNumber('')
    }else{
      alert(`${newName} is already added to phonebook`)
      setNewName('')
      setNewNumber('')
    } 
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchTerm={searchTerm} handleSearchTerm={handleSearchTerm}/>
      
      <h3>Add a new</h3>
      <PersonForm handleSubmit={handleSubmit} newName={newName} handleNewName={handleNewName} newNumber={newNumber} handleNewNumber={handleNewNumber}/>
      
      <h3>Numbers</h3>
      <Persons allPersons={allPersons}/>
    </div>
  )

}

export default App