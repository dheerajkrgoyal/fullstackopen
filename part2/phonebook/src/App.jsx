import { useEffect, useState } from "react"
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"
import personService from "./services/persons"
import Notification from "./components/Notification"
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [userMessage, setUserMessage] = useState(null)
  const [isError, setIsError] = useState(false)

  const filteredPerson = persons.filter(person => person.name.toLowerCase().includes(searchTerm.toLowerCase()))

  useEffect(()=> {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  },[])

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
    const duplicateIndex = persons.findIndex(person => person.name === newName)
    if(duplicateIndex === -1){
      const newPerson = {name: newName, number: newNumber}
      personService
        .create(newPerson)
        .then(createdObj => {
          setPersons(persons.concat(createdObj))
          setNewName('')
          setNewNumber('')
          setIsError(false)
          setUserMessage(`Added ${newName}`)
          setTimeout(() => {
            setUserMessage(null)
          }, 2000)
        })
    }else{
      if(persons[duplicateIndex].number !== newNumber){
        if(confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
          const updateObj = {...persons[duplicateIndex], number: newNumber}
          personService
            .update(updateObj.id, updateObj)
            .then(updatedObj => {
              setPersons(persons.map(person => person.id !== updatedObj.id? person : updatedObj))
              setIsError(false)
              setUserMessage(`${newName} is updated with new number ${newNumber}`)
              setTimeout(() => {
                setUserMessage(null)
              }, 2000)
            })
            .catch(error => {
              setIsError(true)
              setUserMessage(`Information of ${newName} has already been removed from the server`)
              setTimeout(() => {
                setUserMessage(null)
              }, 2000)
            })
          setNewName('')
          setNewNumber('')
        }
      }
      else{
        alert('Details already exist in the server')
        setNewName('')
        setNewNumber('')
      }
    } 
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification userMessage={userMessage} isError={isError} />
      <Filter searchTerm={searchTerm} handleSearchTerm={handleSearchTerm}/>
      
      <h3>Add a new</h3>
      <PersonForm handleSubmit={handleSubmit} newName={newName} handleNewName={handleNewName} newNumber={newNumber} handleNewNumber={handleNewNumber}/>
      
      <h3>Numbers</h3>
      <Persons filteredPerson={filteredPerson} persons={persons} setPersons={setPersons}/>
    </div>
  )

}

export default App