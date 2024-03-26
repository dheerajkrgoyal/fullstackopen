const Persons = ({allPersons}) => {
    return (
        <div>
            {allPersons.map(person => <div key={person.name}>{person.name} {person.number}</div>)}
        </div>
    )
}

export default Persons