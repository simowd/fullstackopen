import patientsData from '../data/patients';
import { NonSensitivePatientEntry, PatientEntry } from '../types';

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

export default { getPatients, getNonSensitivePatients };