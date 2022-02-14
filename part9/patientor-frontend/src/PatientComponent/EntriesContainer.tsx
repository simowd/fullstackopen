import axios from "axios";
import React from "react";
import { Diagnosis, Entry } from "../types";
import EntryCard from "./EntryCard";
import { apiBaseUrl } from "../constants";

const EntriesContainer = ({ entries } : {entries: Array<Entry> | undefined}): JSX.Element => {
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

    if(!entries){
        return <></>;
    }

    return(
        <div>
            <h3>entries</h3>
            {entries.map((entry, index) => <EntryCard key={index} entry={entry} diagnoses={diagnoses}/>)}
        </div>
    );
};

export default EntriesContainer;