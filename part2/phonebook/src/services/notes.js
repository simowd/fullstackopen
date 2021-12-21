import axios from "axios";
const baseUrl = "/api/persons";

const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then((response) => response.data);
};

const addNew = (newContact) => {
    const request = axios.post(baseUrl, newContact);
    return request.then((response) => response.data);
};

const deleteNumber = (id) => {
    const request = axios.delete(baseUrl + `/${id}`);
    return request.then((response) => response.data);
};

const changeNumber = (contact) => {
    const request = axios.put(baseUrl + `/${contact.id}`, contact);
    return request.then((response) => response.data);
};

export default { getAll, addNew, deleteNumber, changeNumber };
