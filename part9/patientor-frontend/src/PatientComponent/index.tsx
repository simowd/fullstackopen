import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import { Icon } from "semantic-ui-react";
import { apiBaseUrl } from "../constants";
import { Patient, PatientLink } from "../types";
import EntriesContainer from "./EntriesContainer";

const PatientComponent = (): JSX.Element => {
    const { id } = useParams<PatientLink>();
    const [patient, setPatient] = React.useState<Patient>();
    React.useEffect(() => {
        if (!patient) {
            void axios.get<void>(`${apiBaseUrl}/ping`);

            const fetchPatientList = async () => {
                try {
                    const { data: patientData } = await axios.get<Patient>(
                        `${apiBaseUrl}/patients/${id}`
                    );
                    setPatient(patientData);

                } catch (e) {
                    console.error(e);
                }
            };
            void fetchPatientList();
        }
    });
    
    const renderPatient = () => {
        if (patient) {
            return (
                <>
                    <h2>{patient.name} <Icon name={patient.gender === 'male' ? 'mars' : (patient.gender === 'female' ? 'venus' : 'neuter')} /> </h2>
                    <p>ssn: {patient.ssn}</p>
                    <p>occupation: {patient.occupation}</p>
                    <EntriesContainer entries={patient.entries}/>
                </>
            );
        }
    };

    return (
        <div>
            {renderPatient()}
        </div>
    );
};

export default PatientComponent;