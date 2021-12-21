const express = require("express");
const morgan = require("morgan");
const app = express();

//morgan config
morgan.token("body", (request, response) => JSON.stringify(request.body));
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :body"));
app.use(express.json());

let persons = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-123456",
    },
    {
        id: 2,
        name: "Ada Lovelace",
        number: "39-44-5323523",
    },
    {
        id: 3,
        name: "Dan Abramov",
        number: "12-43-234345",
    },
    {
        id: 4,
        name: "Mary Poppendieck",
        number: "39-23-6423122",
    },
];

const MAX_ID = 10000;

const idGenerator = (max) => {
    return Math.floor(Math.random() * max);
};

app.get("/api/persons", (request, response) => {
    response.json(persons);
});

app.get("/api/info", (request, response) => {
    const date = new Date();

    response.send(
        `<p>Phonebook has info for ${persons.length} people</p>
        <br />
        <p>${date.toString()}</p>`
    );
});

app.get("/api/persons/:id", (request, response) => {
    const id = Number(request.params.id);
    const person = persons.find((p) => p.id === id);
    if (person) {
        response.json(person);
    } else {
        response.status(404).send();
    }
});

app.delete("/api/persons/:id", (request, response) => {
    const id = Number(request.params.id);
    persons = persons.filter((p) => p.id !== id);

    response.status(204).end();
});

app.post("/api/persons", (request, response) => {
    const person = request.body;

    if (!person.name || !person.number) {
        return response.status(400).json({
            error: "content missing",
        });
    }

    if (persons.find((p) => p.name === person.name)) {
        return response.status(409).json({ error: "name must be unique" });
    }

    //Generating new ID
    const id = idGenerator(MAX_ID);
    const newPerson = { id: id, ...person };
    persons = persons.concat(newPerson);
    response.json(newPerson);
});

const PORT = 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
