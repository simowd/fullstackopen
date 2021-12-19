import React, { useState } from "react";

const Filter = ({ filter, handleFilter }) => {
    return (
        <div>
            <div>
                filter shown with:{" "}
                <input value={filter} onChange={handleFilter} />
            </div>
        </div>
    );
};

const Person = ({ person }) => {
    return (
        <>
            <div>
                {person.name} {person.number}
            </div>
        </>
    );
};

const Persons = ({ persons }) => {
    return (
        <>
            {persons.map((person) => (
                <Person person={person} key={person.id}/>
            ))}
        </>
    );
};

const PersonForm = (props) => {
  return(
    <>
      <form onSubmit={props.addNewEntry}>
                <div>
                    name: <input value={props.newName} onChange={props.handleNewName} />
                </div>
                <div>
                    number:{" "}
                    <input value={props.newNumber} onChange={props.handleNewNumber} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
    </>
  )
}

const App = () => {
    const [persons, setPersons] = useState([
        { name: "Arto Hellas", number: "040-123456", id: 1 },
        { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
        { name: "Dan Abramov", number: "12-43-234345", id: 3 },
        { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
    ]);
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");
    const [filter, setFilter] = useState("");

    const handleNewName = (event) => {
        setNewName(event.target.value);
    };

    const handleNewNumber = (event) => {
        setNewNumber(event.target.value);
    };

    const handleFilter = (event) => {
        setFilter(event.target.value);
    };

    const personsToShow =
        filter === ""
            ? persons
            : persons.filter((person) =>
                  person.name.toLowerCase().includes(filter.toLowerCase())
              );

    const addNewEntry = (event) => {
        event.preventDefault();
        const lastId = persons[persons.length - 1].id + 1;
        const nameObject = {
            name: newName,
            number: newNumber,
            id: lastId,
        };

        if (persons.map((person) => person.name).includes(newName)) {
            alert(`${newName} is already add to phonebook`);
        } else {
            setPersons(persons.concat(nameObject));
            setNewName("");
            setNewNumber("");
        }
    };

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter filter={filter} handleFilter={handleFilter} />
            <h1>add a new</h1>
            <PersonForm addNewEntry={addNewEntry} newName={newName} handleNewName={handleNewName} newNumber={newNumber} handleNewNumber={handleNewNumber}/>
            <h2>Numbers</h2>
            <Persons persons={personsToShow} />
        </div>
    );
};

export default App;
