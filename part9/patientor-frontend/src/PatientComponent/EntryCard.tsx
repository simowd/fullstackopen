import React from "react";
import { Diagnosis, Entry } from "../types";

interface MyProps {
    entry: Entry;
    diagnoses: Array<Diagnosis> | undefined;
}

const EntryCard = ({entry, diagnoses}: MyProps): JSX.Element => {
    return(
        <>
            <p>{entry.date} <i>{entry.description}</i></p>
            <ul>
                {entry.diagnosisCodes?.map((code, index) => <li key={index}>{code} {diagnoses ? diagnoses.find((diag) => diag.code === code)?.name : ''}</li>)}
            </ul>
        </>
    );
};

export default EntryCard;