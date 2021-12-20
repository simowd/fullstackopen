import React, { useState, useEffect } from "react";
import noteService from "./services/notes";

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
                <Person person={person} key={person.id} />
            ))}
        </>
    );
};

const PersonForm = (props) => {
    return (
        <>
            <form onSubmit={props.addNewEntry}>
                <div>
                    name:{" "}
                    <input
                        value={props.newName}
                        onChange={props.handleNewName}
                    />
                </div>
                <div>
                    number:{" "}
                    <input
                        value={props.newNumber}
                        onChange={props.handleNewNumber}
                    />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </>
    );
};

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");
    const [filter, setFilter] = useState("");

    useEffect(() => {
        noteService.getAll().then((response) => {
            setPersons(response);
        });
    }, []);

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
            noteService.addNew(nameObject).then((response) => {
                setPersons(persons.concat(response));
                setNewName("");
                setNewNumber("");
            });
        }
    };

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter filter={filter} handleFilter={handleFilter} />
            <h1>add a new</h1>
            <PersonForm
                addNewEntry={addNewEntry}
                newName={newName}
                handleNewName={handleNewName}
                newNumber={newNumber}
                handleNewNumber={handleNewNumber}
            />
            <h2>Numbers</h2>
            <Persons persons={personsToShow} />
        </div>
    );
};

export default App;
