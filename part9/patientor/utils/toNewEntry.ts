import { Discharge, HealthCheckRating, NewEntry, SickLeave } from "../types";

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

const parseArrayString = (data: unknown): Array<string> => {
    if (!data || !Array.isArray(data)) {
        return [];
    }
    return data as Array<string>;
};

const isDischarge = (content: any): content is Discharge => {
    return content.date !== undefined && content.criteria !== undefined;
};

const parseDischarge = (content: unknown): Discharge => {
    if (!content || !isDischarge(content)) {
        throw new Error("Missing or incorrect data on discharge");
    }

    return content;
};

const isHealthCheckRating = (content: any): content is HealthCheckRating => {
    return content === 0 || content === 1 || content === 2 || content === 3;
};

const parseHealthCheckRating = (content: unknown): HealthCheckRating => {
    if(!content || !isHealthCheckRating(content)){
        throw new Error("Missing or incorrect data on healthcheckrating");
    }
    return content;
};

const isSickLeave = (content: any): content is SickLeave => {
    return content !== undefined && content.startDate !== undefined && content.endDate !== undefined;
};

const parseSickLeave = (content: unknown): SickLeave => {
    if(!content || !isSickLeave(content)){
        throw new Error("Missing or incorrect data on sickLeave");
    }
    return content;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const toNewEntry = (data: any): NewEntry => {
    let base = {
        date: parseDate(data.date),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        type: data.type,
        description: parseString(data.description),
        specialist: parseString(data.specialist),
    };

    if (data.diagnosisCodes) {
        base = Object.assign(base, { diagnosisCodes: parseArrayString(data.diagnosisCodes) });
    }

    let newEntry: NewEntry;

    switch (base.type) {
        case 'Hospital':
            newEntry = { ...base, discharge: parseDischarge(data.discharge) };
            return newEntry;
            break;
        case 'HealthCheck':
            newEntry = { ...base, healthCheckRating: parseHealthCheckRating(data.healthCheckRating) };
            return newEntry;
            break;
        case 'OccupationalHealthcare':
            newEntry = { ...base, employerName: parseString(data.employerName) };
            if (data.sickLeave){
                newEntry = { ...newEntry, sickLeave: parseSickLeave(data.sickLeave) };
            }
            return newEntry;
            break;
        default:
            throw new Error ("Badly formatted type");
            break;
    }

};

export default toNewEntry;