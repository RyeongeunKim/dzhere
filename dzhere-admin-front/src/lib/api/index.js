import axios from "axios";
const client = axios.create();
client.defaults.baseURL = "http://192.168.0.112:8080";
export default client;