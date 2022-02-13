/* eslint-disable @typescript-eslint/no-unsafe-return */
import patientsData from '../data/patients';
import { NewPatient, NonSensitivePatientEntry, PatientEntry } from '../types';
import {v1 as uuid} from 'uuid';

const getPatients = (): Array<PatientEntry> => {
    return patientsData;
};

const getNonSensitivePatients = (): Array<NonSensitivePatientEntry> => {
    return patientsData.map(({ id, name, dateOfBirth, gender, occupation}) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
};

const addPatient = (newPatient: NewPatient): PatientEntry => {
    const patient = {
        id: uuid(),
        ...newPatient
    };
    patientsData.push(patient);
    return patient;
};

const getPatientById = (id: string): PatientEntry => {
    if(patientsData.find((patient) => patient.id === id)){
        const patient = patientsData.find((patient) => patient.id === id); 
        return patient as PatientEntry;
    }
    else{
        throw new Error('id not existant');
    }  
};

export default { getPatients, getNonSensitivePatients, addPatient, getPatientById };