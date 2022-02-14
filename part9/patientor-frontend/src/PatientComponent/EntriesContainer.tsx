import axios from "axios";
import React from "react";
import { Diagnosis, Entry } from "../types";
import { apiBaseUrl } from "../constants";
import HospitalEntry from "./HospitalEntry";
import OccupationalHealthcareEntry from "./OccupationalHealthcareEntry";
import HealthCheckEntry from "./HealthCheckEntry";

const EntriesContainer = ({ entries }: { entries: Array<Entry> | undefined }): JSX.Element => {
    const [diagnoses, setDiagnoses] = React.useState<Array<Diagnosis>>();
    React.useEffect(() => {
        if (!diagnoses) {
            void axios.get<void>(`${apiBaseUrl}/ping`);

            const fetchDiagnoseList = async () => {
                try {
                    const { data: diagnosesData } = await axios.get<Array<Diagnosis>>(
                        `${apiBaseUrl}/diagnoses`
                    );
                    setDiagnoses(diagnosesData);

                } catch (e) {
                    console.error(e);
                }
            };
            void fetchDiagnoseList();
        }
    });

    if (!entries) {
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