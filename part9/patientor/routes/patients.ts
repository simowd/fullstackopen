import express from 'express';
import patientService from '../services/patientService';
import toNewEntry from '../utils/toNewEntry';
import toNewPatient from '../utils/toNewPatient';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientService.getNonSensitivePatients());
});

router.post('/', (req, res) => {
    try {
        const newPatient = toNewPatient(req.body);
        const addPatient = patientService.addPatient(newPatient);
        res.json(addPatient);
    }
    catch (error: unknown) {
        let errorMessage = 'Something went wrong';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});

router.get('/:id', (req, res) => {
    try {
        res.send(patientService.getPatientById(req.params.id));
    }
    catch (error: unknown) {
        let errorMessage = 'Something went wrong';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});

router.post('/:id/entries', (req, res) => {
    try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const body = req.body;
        const newEntry = toNewEntry(body);
        const userId = req.params.id;
        res.send(patientService.addEntry(newEntry, userId));
    }
    catch (error: unknown) {
        let errorMessage = 'Something went wrong';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});

export default router;