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

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {
}

export type NonSensitivePatientEntry = Omit<PatientEntry, 'ssn' | 'entries'>;
export type NewPatient = Omit<PatientEntry, 'id'>;