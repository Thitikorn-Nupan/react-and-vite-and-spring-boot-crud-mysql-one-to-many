import axios, { AxiosResponse} from 'axios';
import {Student} from "../entities/student.ts";

const BASE_URL = [
    "http://localhost:8080/api/students",
    "http://localhost:8080/api/student"
];

export class StudentService {

    getAllStudentsJoinDepartments = async () : Promise<AxiosResponse> => {
        // defaul axios will return object
        return await axios.get(BASE_URL[0]);
    }

    getStudent = async (sid : string) : Promise<AxiosResponse> => {
        // defaul axios will return object
        return await axios.get(BASE_URL[1]+"?sid="+sid);
    }

    editStudent = async (student : Student,sid : string) : Promise<AxiosResponse> => {
        // defaul axios will return object
        return await axios.put(BASE_URL[1]+"/edit?sid="+sid,student);
    }

    addStudent = async (student : Student) : Promise<AxiosResponse> => {
        // defaul axios will return object
        return await axios.post(BASE_URL[1]+"/add",student);
    }
}

