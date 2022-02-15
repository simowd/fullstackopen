import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import { Diagnosis } from '../types';
import AddOccupationalHealthCareForm, { OccupationalHealthcareEntryFormValues } from './AddOccupationalHealthCareForm';

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: OccupationalHealthcareEntryFormValues) => void;
  error?: string;
  diagnoses: Array<Diagnosis> | undefined;
}

const AddOccupationalHealthcareEntryModal = ({ modalOpen, onClose, onSubmit, error, diagnoses }: Props) => {
  if(!diagnoses){
    return <></>;
  }
  
  return (<>
    <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
      <Modal.Header>Add a new Entry</Modal.Header>
      <Modal.Content>
        {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
        <AddOccupationalHealthCareForm onSubmit={onSubmit} onCancel={onClose} diagnoses={diagnoses}/>
      </Modal.Content>
    </Modal>
  </>
  );
};
export default AddOccupationalHealthcareEntryModal;
