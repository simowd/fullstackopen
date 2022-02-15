export interface DiagnoseEntry {
    code: string,
    name: string,
    latin?: string
}

export interface PatientEntry {
    id: string,
    name: string,
    dateOfBirth: string,
    ssn: string,
    gender: string,
    occupation: string,
    entries: Entry[]
}

interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<DiagnoseEntry['code']>;
}

interface NewBaseEntry {
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<DiagnoseEntry['code']>;
}

interface NewHealthCheckEntry extends NewBaseEntry {
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
}

interface NewHospitalEntry extends NewBaseEntry {
    type: "Hospital";
    discharge: Discharge;
}

interface NewOccupationalHealthcareEntry extends NewBaseEntry {
    type: "OccupationalHealthcare";
    employerName: string;
    sickLeave?: SickLeave;
}

export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
}

export interface Discharge {
    date: string,
    criteria: string
}

export interface SickLeave {
    startDate: string,
    endDate: string
}

interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
}

interface HospitalEntry extends BaseEntry {
    type: "Hospital";
    discharge: Discharge;
}

interface OccupationalHealthcareEntry extends BaseEntry {
    type: "OccupationalHealthcare";
    employerName: string;
    sickLeave?: SickLeave;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export type Entry =
    | HospitalEntry
    | OccupationalHealthcareEntry
    | HealthCheckEntry;

export type NewEntry =
    | NewHospitalEntry
    | NewOccupationalHealthcareEntry
    | NewHealthCheckEntry;

export type NonSensitivePatientEntry = Omit<PatientEntry, 'ssn' | 'entries'>;
export type NewPatient = Omit<PatientEntry, 'id'>;