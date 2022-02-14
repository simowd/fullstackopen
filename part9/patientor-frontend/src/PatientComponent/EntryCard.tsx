import React from "react";
import { Entry } from "../types";

interface MyProps {
    entry: Entry;
}

const EntryCard = ({entry}: MyProps): JSX.Element => {
    return(
        <>
            <p>{entry.date} <i>{entry.description}</i></p>
            <ul>
                {entry.diagnosisCodes?.map((code, index) => <li key={index}>{code}</li>)}
            </ul>
        </>
    );
};

export default EntryCard;