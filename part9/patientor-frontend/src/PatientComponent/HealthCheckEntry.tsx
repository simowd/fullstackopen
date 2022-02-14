import React from "react";
import { Icon } from "semantic-ui-react";

import { Diagnosis, Entry } from "../types";

interface MyProps {
    entry: Entry;
    diagnoses: Array<Diagnosis> | undefined;
}

const HealthCheckEntry = ({entry, diagnoses}: MyProps): JSX.Element => {
    const style = {
        border: "1px solid gray",
        padding: "20px"
    };

    console.log(diagnoses);

    return (
        <div style={style}>
            <h4>{entry.date} <Icon name='doctor' /></h4>
            <p>{entry.description}</p>
            {/* <ul>
                {entry.diagnosisCodes?.map((code, index) => <li key={index}>{code} {diagnoses ? diagnoses.find((diag) => diag.code === code)?.name : ''}</li>)}
            </ul> */}
        </div>
    );
};

export default HealthCheckEntry;