import {ChangeEvent, Component, FormEvent} from "react";
import {Student} from "../entities/student.ts";
import {StudentService} from "../service/StudentService.ts";
import {Department} from "../entities/department.ts";

type State = {
    student: Student | null, // for demo
    // firstname: string,
    // lastname: string,
    // age: number,
    // year: number,
    // phone: string,
    // dpmid: string,
    // ** values is object type
    // ** way to set state is difference
    values : {
        firstname: string,
        lastname: string,
        age: number,
        year: number,
        phone: string,
        dpmid: string,
    }
}
type Props = {}


export class StudentFormEdit extends Component<Props, State> {


    constructor(props: Props) {
        super(props);
        // we have to inital state
        this.state = {
            student: null,
            // firstname: "",
            // lastname: "",
            // age: 0,
            // year: 0,
            // phone: "",
            // dpmid: "",
            values : {
                firstname: "",
                lastname : "",
                age: 0,
                year: 0,
                phone : "",
                dpmid : ""
            }
        }
    }

    // async / await work same js
    componentDidMount = async () => {
        console.log('Component componentDidMount');
        const sid: string = window.location.search.slice(5)
        await new StudentService().getStudent(sid).then((response) => {
            this.setState({
                student: response.data,
            })
        })
    }

    handleSubmitStudentForm = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault() // The preventDefault() method cancels the event if it is cancelable, meaning that the default action that belongs to the event will not occur.
        // it works for block navigate to some path (like type button of html)
        let studentEdit : Student = new Student(
            "",
            this.state.values.firstname,
            this.state.values.lastname,
            Number(this.state.values.age),
            Number(this.state.values.year),
            "",
            this.state.values.phone,
            this.state.values.dpmid,
            new Department("", "")
        )

        new StudentService().editStudent(studentEdit, this.state.student!.sid).then(response => {
            if (response) {
                window.location.replace('/students-and-departments-table')
            }
        })

    }


    // ** way to set state type object
    handleEachTagInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        // ** https://stackoverflow.com/questions/43638938/updating-an-object-with-setstate-in-react
        const nameOfTag = event.target.name;
        const valueOfTag = event.target.value;
        // way to set state values as object
        // ** try to understand
        this.setState({
            values : { // access key in state (object type)
                ...this.state.values, // access ...array
                [nameOfTag]: valueOfTag
            }
        })
    }

    /** Old solution


        handleFirstnameChange = (event: ChangeEvent<HTMLInputElement>) => {
            // this.setState({
            //     firstname: event.currentTarget.value
            // })
            // event.preventDefault()
        }

        handleFirstnameChange2 = (event: ChangeEvent<HTMLInputElement>) => {

            const nameOfTag = event.target.name;
            const valueOfTag = event.target.value;

            console.log(nameOfTag , valueOfTag);
            // way to set state values as object
            // ** try to understand
            this.setState({
                values : { // access key in state (object type)
                    ...this.state.values, // access ...array
                    firstname: event.currentTarget.value
                }
            })
        }


       handleLastnameChange = (event: ChangeEvent<HTMLInputElement>) => {
            this.setState({
                lastname: event.currentTarget.value
            })
        }
        handleLastnameChange2 = (event: ChangeEvent<HTMLInputElement>) => {
            // way to set state values as object
            this.setState(previousState => ({
                ...previousState,[this.state.values.lastname]: event.target.value
            }))
        }

        handleAgeChange = (event: ChangeEvent<HTMLInputElement>) => {
            this.setState({
                age: Number(event.currentTarget.value)
            })
        }

        handleYearChange = (event: ChangeEvent<HTMLInputElement>) => {
            this.setState({
                year: Number(event.currentTarget.value)
            })
        }

        handlePhoneChange = (event: ChangeEvent<HTMLInputElement>) => {
            this.setState({
                phone: event.currentTarget.value
            })
        }

        handleDpmidChange = (event: ChangeEvent<HTMLInputElement>) => {
            this.setState({
                dpmid: event.currentTarget.value
            })
        }
    */

    render() {
        return (
            <>
                <div className={"container w-50 mt-4"}>
                    <form className={"form-control p-2"} onSubmit={this.handleSubmitStudentForm}>
                        <div className="mb-3">
                            Firstname
                            <input type="text" className="form-control" name="firstname"
                                   placeholder={this.state.student?.firstname} onChange={this.handleEachTagInputChange}/>
                            Lastname
                            <input type="text" className="form-control" name="lastname"
                                   placeholder={this.state.student?.lastname} onChange={this.handleEachTagInputChange}/>
                            Age
                            <input type="number" className="form-control" name="age"
                                   placeholder={this.state.student?.age.toString()} onChange={this.handleEachTagInputChange}/>
                            Year
                            <input type="number" className="form-control" name="year"
                                   placeholder={this.state.student?.year.toString()} onChange={this.handleEachTagInputChange}/>
                            Phone
                            <input type="text" className="form-control" name="phone"
                                   placeholder={this.state.student?.phone} onChange={this.handleEachTagInputChange}/>
                            Department Id
                            <input type="text" className="form-control" name="dpmid" placeholder={this.state.student?.department.dpmid}  onChange={this.handleEachTagInputChange}/>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </>
        )
    }
}