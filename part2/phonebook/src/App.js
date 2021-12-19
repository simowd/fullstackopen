import React, { useState } from "react";

const App = () => {
    const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
    const [newName, setNewName] = useState("");

    const handleNewName = (event) => {
        setNewName(event.target.value);
    };

    const addNewName = (event) => {
        event.preventDefault();

        const nameObject = {
            name: newName,
        };

        if (persons.map((person)=>person.name).includes(newName)) {
            alert(`${newName} is already add to phonebook`);
        } else {
            setPersons(persons.concat(nameObject));
            setNewName("");
        }
    };

    return (
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={addNewName}>
                <div>
                    name: <input value={newName} onChange={handleNewName} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            {persons.map((person) => (
                <div key={person.name}>{person.name}</div>
            ))}
        </div>
    );
};

export default App;
