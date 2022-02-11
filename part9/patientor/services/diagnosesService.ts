import diagnosesData from '../data/diagnoses';
import { DiagnoseEntry } from '../types';

const getDiagnoses = (): Array<DiagnoseEntry> => {
    return diagnosesData;
};

export default {
    getDiagnoses
};