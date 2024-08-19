import {Department} from "./department.ts";

export class Student {
    public sid: string;
    public firstname: string;
    public lastname: string;
    public age: number;
    public year: number;
    public address: string;
    public phone: string;
    public dpmid: string;
    private _departmentObj: Department;

    constructor(sid: string, firstname: string, lastname: string, age: number, year: number, address: string, phone: string, dpmid : string,department: Department) {
        this.sid = sid;
        this.firstname = firstname;
        this.lastname = lastname;
        this.age = age;
        this.year = year;
        this.address = address;
        this.phone = phone;
        this._departmentObj = department;
        this.dpmid = dpmid;
    }

    get department(): Department {
        return this._departmentObj;
    }


}