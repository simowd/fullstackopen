import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import { Button, Icon } from "semantic-ui-react";
import AddEntryModal from "../AddEntryModal";
import { HealthCheckEntryFormValues } from "../AddEntryModal/AddHealthCheckEntryForm";
import { apiBaseUrl } from "../constants";
import { Diagnosis, Entry, Patient, PatientLink } from "../types";
import EntriesContainer from "./EntriesContainer";

const PatientComponent = (): JSX.Element => {
    const { id } = useParams<PatientLink>();
    const [patient, setPatient] = React.useState<Patient>();
    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | undefined>();

    const openModal = (): void => setModalOpen(true);

    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
    };

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

    const submitNewPatient = async (values: HealthCheckEntryFormValues) => {
        try {
            const { data: newEntry } = await axios.post<Entry>(
                `${apiBaseUrl}/patients/${id}/entries`,
                {...values, type:"HealthCheck"}
            );
            if (patient) {
                const updated = { ...patient };
                if (updated.entries) {
                    updated.entries.push(newEntry);
                }
                setPatient(updated);
            }

            closeModal();
        } catch (e: any) {
            console.error(e.response?.data || 'Unknown Error');
            setError(e.response?.data || 'Unknown error');
        }
    };
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
                    <EntriesContainer entries={patient.entries} diagnoses={diagnoses}/>
                    <AddEntryModal
                        modalOpen={modalOpen}
                        onSubmit={submitNewPatient}
                        error={error}
                        onClose={closeModal}
                        diagnoses={diagnoses}
                    />
                    <Button onClick={() => openModal()}>Add New Entry</Button>
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