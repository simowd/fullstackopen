import React, { useState } from "react";

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

    const personsToShow = filter === "" ? persons : persons.filter((person) => person.name.toLowerCase().includes(filter.toLowerCase()))

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
            <div>
                <div>
                    filter shown with:{" "}
                    <input value={filter} onChange={handleFilter} />
                </div>
            </div>
            <h1>add a new</h1>
            <form onSubmit={addNewEntry}>
                <div>
                    name: <input value={newName} onChange={handleNewName} />
                </div>
                <div>
                    number:{" "}
                    <input value={newNumber} onChange={handleNewNumber} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            {personsToShow.map((person) => (
                <div key={person.id}>
                    {person.name} {person.number}
                </div>
            ))}
        </div>
    );
};

export default App;
