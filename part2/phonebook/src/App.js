import React, { useState } from "react";

const App = () => {
    const [persons, setPersons] = useState([
        { name: "Arto Hellas", number: "040-1234567" },
    ]);
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");

    const handleNewName = (event) => {
        setNewName(event.target.value);
    };

    const handleNewNumber = (event) => {
        setNewNumber(event.target.value);
    };

    const addNewEntry = (event) => {
        event.preventDefault();

        const nameObject = {
            name: newName,
            number: newNumber,
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
            {persons.map((person) => (
                <div key={person.name}>
                    {person.name} {person.number}
                </div>
            ))}
        </div>
    );
};

export default App;
