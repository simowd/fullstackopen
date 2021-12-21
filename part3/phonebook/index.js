const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const Person = require("./models/person");

//morgan config
morgan.token("body", (request, response) => JSON.stringify(request.body));
app.use(
    morgan(
        ":method :url :status :res[content-length] - :response-time ms :body"
    )
);

app.use(express.json());
app.use(cors());
app.use(express.static("build"));

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
    Person.find({})
        .then((result) => {
            response.json(result);
        })
        .catch((result) => {
            response.status(500).send();
        });
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
    const id = request.params.id;
    Person.findById(id)
        .then((result) => {
            console.log(result);
            response.json(result);
        })
        .catch((error) => {
            console.log(error);
            response.status(400).send({ error: "malformatted id" });
        });
});

app.delete("/api/persons/:id", (request, response, next) => {
    const id = request.params.id;
    persons = persons.filter((p) => p.id !== id);
    Person.findByIdAndRemove(id)
        .then((result) => {
            response.status(204).end();
        })
        .catch((error) => next(error));
});

app.post("/api/persons", (request, response, next) => {
    const person = request.body;

    if (!person.name || !person.number) {
        return response.status(400).json({
            error: "content missing",
        });
    }

    const newPerson = new Person({
        name: person.name,
        number: person.number,
    });

    newPerson
        .save()
        .then((savedPerson) => {
            response.json(savedPerson);
        })
        .catch((error) => {
            next(error);
        });
});

app.put("/api/persons/:id", (request, response, next) => {
    const person = request.body;
    const id = request.params.id;
    const opts = { runValidators: true };

    if (!person.name || !person.number) {
        return response.status(400).json({
            error: "content missing",
        });
    }

    const changedPerson = {
        name: person.name,
        number: person.number,
    };

    Person.findByIdAndUpdate(id, changedPerson, { new: true })
        .then((updatedNote) => {
            response.json(updatedNote);
        })
        .catch((error) => next(error));
});

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: "unknown endpoint" });
};
// handler of requests with unknown endpoint
app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
    console.error(error.message);

    if (error.name === "CastError") {
        return response.status(400).send({ error: "malformatted id" });
    } else if (error.name === "ValidationError") {
        return response.status(400).json({ error: error.message });
    }

    next(error);
};

// this has to be the last loaded middleware.
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
