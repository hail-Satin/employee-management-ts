import axios from "axios"
import { configUtil } from "../util/configUtil"
const fetchEmployeesData = async () => {
    const response = await axios.get(configUtil.fetchEmployees);
    return response.data;
}

export {fetchEmployeesData}