import React from "react";
import { Diagnosis, Entry } from "../types";
import HospitalEntry from "./HospitalEntry";
import OccupationalHealthcareEntry from "./OccupationalHealthcareEntry";
import HealthCheckEntry from "./HealthCheckEntry";

const EntriesContainer = ({ entries, diagnoses }: { entries: Array<Entry> | undefined,  diagnoses: Array<Diagnosis> | undefined}): JSX.Element => {

    if (!entries || !diagnoses) {
        return <></>;
    }

    const assertNever = (value: never): never => {
        throw new Error(
            `Unhandled discriminated union member: ${JSON.stringify(value)}`
        );
    };

    const EntryDetails = (entry: Entry) => {
        switch (entry.type) {
            case 'Hospital':
                return <HospitalEntry entry={entry} diagnoses={diagnoses}/>;
                break;
            case 'OccupationalHealthcare':
                return <OccupationalHealthcareEntry entry={entry} diagnoses={diagnoses}/>;
                break;
            case 'HealthCheck':
                return <HealthCheckEntry entry={entry} diagnoses={diagnoses}/>;
                break;
            default:
                return assertNever(entry);
                break;
        }
    };

    return (
        <div>
            <h3>entries</h3>
            {entries.map((entry: Entry) => EntryDetails(entry))}
        </div>
    );
};

export default EntriesContainer;