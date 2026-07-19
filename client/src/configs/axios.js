import axios from "axios";

const api = axios.create({
    baseURL : import.meta.env.VITE_BASEURL || 'http://localhost:300'
})
export default api
