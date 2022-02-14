import React from "react";
import { Entry } from "../types";
import EntryCard from "./EntryCard";

const EntriesContainer = ({ entries } : {entries: Array<Entry> | undefined}): JSX.Element => {
    console.log(entries);

    if(!entries){
        return <></>;
    }

    return(
        <div>
            <h3>entries</h3>
            {entries.map((entry, index) => <EntryCard key={index} entry={entry}/>)}
        </div>
    );
};

export default EntriesContainer;