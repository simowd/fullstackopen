import { NewPatient } from "../types";

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const parseString = (content: unknown): string => {
    if (!content || !isString(content)) {
        throw new Error('Some parameters were not strings ' + content);
    }
    return content;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toNewPatient = (object: any): NewPatient => {
    const newPatient: NewPatient = {
        name: parseString(object.name),
        dateOfBirth: parseDate(object.dateOfBirth),
        ssn: parseString(object.ssn),
        gender: parseString(object.gender),
        occupation: parseString(object.occupation)
    };

    return newPatient;
};

export default toNewPatient;