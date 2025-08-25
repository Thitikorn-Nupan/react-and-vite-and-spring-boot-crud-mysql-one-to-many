import React, {ChangeEvent, Component, FormEvent} from "react";
import {StudentService} from "../service/StudentService.ts";
import {Student} from "../entities/student.ts";
import {Department} from "../entities/department.ts";


type Props = {}
type State = {
    students: Student[], // for students pk
    values: {
        sid: string,
        firstname: string,
        lastname: string,
        age: number,
        dpmid: string,
        year: number,
        address: string,
        phone: string,
    },
    disableSubmit: boolean,
}

export class StudentFormCreate extends Component <Props, State> {

    private readonly studentService: StudentService
    private readonly radios = [
        {value : 'D1',label : 'Bachelor of Engineering Program in Computer Engineering',name:'option'},
        {value : 'D2',label : 'Bachelor of Science Program in Mathematics',name:'option'},
        {value : 'D3',label : 'Bachelor of Science Programme in Computer Science',name:'option'},
    ]

    constructor(props: Props) {
        super(props);
        this.state = {
            students: [],
            values: {
                sid: "",
                firstname: "",
                lastname: "",
                age: 0,
                dpmid: "",
                year: 0,
                address: "",
                phone: "",
            },
            disableSubmit: false,
        }
        this.studentService = new StudentService();
    }

    async componentDidMount() {
        await this.studentService.getAllStudentsOnlyPk().then((response) => (this.setState({students: response.data})))
    }

    // ** way to set state type object
    private handleEachTagInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        // ** https://stackoverflow.com/questions/43638938/updating-an-object-with-setstate-in-react
        const nameOfTag = event.target.name;
        let valueOfTag = event.target.value;
        // way to set state values as object // ** try to understand
        this.setState({
            values : { // access key in state (object type)
                ...this.state.values, // specify that state that you want to update
                [nameOfTag]: valueOfTag // spacify name & value
            }
        })
    }

    private handleOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
        // can specify uniq key for this way
        this.setState({
            values: {
                ...this.state.values, // access ...array
                dpmid: event.target?.value
            }
        })
    }

    private handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault() // block navigate to any paths
        // console.log(this.state.values)
        const student = new Student(
            this.state.values.sid,
            this.state.values.firstname,
            this.state.values.lastname,
            Number(this.state.values.age),
            Number(this.state.values.year),
            this.state.values.address,
            this.state.values.phone,
            this.state.values.dpmid,
            new Department("", "")
        )

        const studentSearch = this.state.students.find(student => student.sid === this.state.values.sid)

        if (studentSearch != undefined) {
            // sid exist
            this.setState({
                disableSubmit:true
            })
        } else {
            await this.studentService.addStudent(student).then((response) => {
                if (response) {
                    window.location.replace("#/students-and-departments-table")
                }
            })
        }

    }

    render() {
        return (
            <>
                <div className={"container w-50 mt-4"}>
                    <ul className="list-group list-group-horizontal mb-3" style={{overflowX: "scroll", height: "60px",width:"930px"}}>
                        <li className="list-group-item active" style={{minWidth:"150px"}}>Sid've existed</li>
                        {this.state.students?.map((student: Student) => (
                            <React.Fragment key={student.sid}>
                                <li className={"list-group-item"} >{student.sid}</li>
                            </React.Fragment>
                        ))}
                    </ul>
                    <form className={"form-control p-2"} onSubmit={this.handleSubmit}>
                        <div className="mb-3">
                            Sid
                            <input type="text" className="form-control" name="sid" maxLength={3}
                                   required={true}
                                   onChange={this.handleEachTagInputChange}/>
                            Firstname
                            <input type="text" className="form-control" name="firstname"
                                   required={true}
                                   onChange={this.handleEachTagInputChange}/>
                            Lastname
                            <input type="text" className="form-control" name="lastname"
                                   required={true}
                                   onChange={this.handleEachTagInputChange}/>
                            Address
                            <input type="text" className="form-control" name="address"
                                   required={true}
                                   onChange={this.handleEachTagInputChange}/>
                            Age
                            <input type="number" className="form-control" name="age"
                                   required={true}
                                   onChange={this.handleEachTagInputChange}/>
                            Year
                            <input type="number" className="form-control" name="year"
                                   required={true}
                                   onChange={this.handleEachTagInputChange}/>
                            Phone
                            <input type="text" className="form-control" name="phone"
                                   required={true}
                                   maxLength={10}
                                   onChange={this.handleEachTagInputChange}/>
                            <div className={"mt-2"}>
                                {this.radios.map((item) =>
                                    <React.Fragment key={item.value}>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio"
                                                   name="option"
                                                   value={item.value}
                                                   required={true}
                                                   onChange={this.handleOptionChange}/>
                                            <label className="form-check-label" htmlFor="inlineRadio1">{item.label}</label>
                                        </div>
                                        <br/>
                                    </React.Fragment>
                                )}
                                {/*<div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="option"
                                           required={true}
                                           value="D2"
                                           onChange={this.handleOptionChange}/>
                                    <label className="form-check-label" htmlFor="inlineRadio2">Bachelor of Science
                                        Program in Mathematics</label>
                                </div>
                                <br/>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="option"
                                           required={true}
                                           value="D3"
                                           onChange={this.handleOptionChange}/>
                                    <label className="form-check-label" htmlFor="inlineRadio3">Bachelor of Science Programme in Computer Science</label>
                                </div>*/}
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary" disabled={this.state.disableSubmit}>Submit</button>
                    </form>
                </div>
            </>
        )
    }
}