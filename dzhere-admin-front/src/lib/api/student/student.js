import axios from "axios";

export const getAgName = phone => 
    axios.get(`http://172.30.192.1:8080/api/getAgName/${phone}`);

export const getClassList = phone => 
    axios.get(`http://172.30.192.1:8080/api/getClassList/${phone}`)