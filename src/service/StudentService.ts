import axios, { AxiosResponse} from 'axios';
import {Student} from "../entities/student.ts";


export class StudentService {

    private readonly BASE_URL = import.meta.env.VITE_API_URL+"/api";

    public getAllStudentsOnlyPk = async () : Promise<AxiosResponse> => {
        // defaul axios will return object
        return await axios.get(this.BASE_URL+"/students/pk");
    }

    public getAllStudentsJoinDepartments = async () : Promise<AxiosResponse> => {
        // defaul axios will return object
        return await axios.get(this.BASE_URL+"/students");
    }

    public getStudent = async (sid : string) : Promise<AxiosResponse> => {
        // defaul axios will return object
        return await axios.get(this.BASE_URL+"/student?sid="+sid);
    }

    public editStudent = async (student : Student,sid : string) : Promise<AxiosResponse> => {
        // defaul axios will return object
        return await axios.put(this.BASE_URL+"/student/edit?sid="+sid,student);
    }

    public addStudent = async (student : Student) : Promise<AxiosResponse> => {
        // defaul axios will return object
        return await axios.post(this.BASE_URL+"/student/add",student);
    }
    public deleteStudent = async (sid : string) : Promise<AxiosResponse> => {
        // defaul axios will return object
        return await axios.delete(this.BASE_URL+"/student/delete?sid="+sid);
    }
}

