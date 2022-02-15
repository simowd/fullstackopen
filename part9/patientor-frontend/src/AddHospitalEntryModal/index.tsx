import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import { Diagnosis } from '../types';
import AddHospitalEntryForm, { HospitalEntryFormValues } from './AddHospitalEntryForm';

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: HospitalEntryFormValues) => void;
  error?: string;
  diagnoses: Array<Diagnosis> | undefined;
}

const AddHospitalEntryModal = ({ modalOpen, onClose, onSubmit, error, diagnoses }: Props) => {
  if(!diagnoses){
    return <></>;
  }
  
  return (<>
    <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
      <Modal.Header>Add a new Entry</Modal.Header>
      <Modal.Content>
        {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
        <AddHospitalEntryForm onSubmit={onSubmit} onCancel={onClose} diagnoses={diagnoses}/>
      </Modal.Content>
    </Modal>
  </>
  );
};
export default AddHospitalEntryModal;
