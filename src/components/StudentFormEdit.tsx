import {ChangeEvent, Component, FormEvent} from "react";
import {Student} from "../entities/student.ts";
import {StudentService} from "../service/StudentService.ts";
import {Department} from "../entities/department.ts";

type Props = {}
type State = {
    student: Student | null, // for demo
    values : {
        firstname: string,
        lastname: string,
        age: number,
        year: number,
        phone: string,
        dpmid: string,
        address: string
    } | any
}

export class StudentFormEdit extends Component<Props, State> {

    private readonly studentService: StudentService

    constructor(props: Props) {
        super(props);
        // we have to inital state
        this.state = {
            student: null,
            values : {
                firstname: "",
                lastname : "",
                age: 0,
                year: 0,
                phone : "",
                dpmid : "",
                address: ""
            }
        }
        this.studentService = new StudentService();
    }

    // async / await work same js
    componentDidMount = async () : Promise<void> => {
        // window.location.search => ?sid=S13
        // const sid : string = window.location.search.slice(5)
        const sid = window.location.hash.slice(11)
        await this.studentService.getStudent(sid).then((response) => {
            this.setState({student: response.data})
            // this.props.student =   response.data
        })

    }

    private handleSubmit =  async (event: FormEvent<HTMLFormElement>)  : Promise<void> => {
        event.preventDefault() // The preventDefault() method cancels the event if it is cancelable, meaning that the default action that belongs to the event will not occur.  // it works for block navigate to some path (like type button of html)
        const studentEdit : Student = new Student(
            "",
            this.state.values.firstname ? this.state.values.firstname : this.state.student?.firstname,
            this.state.values.lastname ? this.state.values.lastname : this.state.student?.lastname,
            this.state.values.age ? Number(this.state.values.age) : Number(this.state.student?.age),
            this.state.values.year ? Number(this.state.values.year) : Number(this.state.student?.year),
            this.state.values.address ? this.state.values.address : this.state.student?.address,
            this.state.values.phone ? this.state.values.phone : this.state.student?.phone,
            this.state.student!.dpmid ,
            new Department("", "")
        )
        await this.studentService.editStudent(studentEdit, this.state.student!.sid).then(response => {
            if (response) {
                window.location.replace('#/students-and-departments-table')
            }
        })

    }


    // ** way to set state type object
    private handleEachTagInputChange = (event: ChangeEvent<HTMLInputElement>) : void => {
        // ** https://stackoverflow.com/questions/43638938/updating-an-object-with-setstate-in-react
        const nameOfTag = event.target.name;
        const valueOfTag = event.target.value;
        // way to set state values as object // ** try to understand
        this.setState({
            values : { // access key in state (object type)
                ...this.state.values, // specify that state that you want to update
                [nameOfTag]: valueOfTag // spacify name & value
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

    render() : JSX.Element {
        return (
            <>
                {(this.state.student)
                    ?
                    <div className={"container w-50 mt-4"}>
                        <form className={"form-control p-2"} onSubmit={this.handleSubmit}>
                            <div className="mb-3">
                                Firstname
                                <input type="text" className="form-control" name="firstname"
                                       required={true}
                                       // Note ! use defaultValue attr for set value on input tag instead value attr
                                       defaultValue={this.state.student?.firstname}
                                       placeholder={this.state.student?.firstname}
                                       onChange={this.handleEachTagInputChange}/>
                                Lastname
                                <input type="text" className="form-control" name="lastname"
                                       required={true}
                                       defaultValue={this.state.student?.lastname}
                                       placeholder={this.state.student?.lastname}
                                       onChange={this.handleEachTagInputChange}/>
                                Address
                                <input type="text" className="form-control" name="address"
                                       required={true}
                                       defaultValue={this.state.student?.address}
                                       placeholder={this.state.student?.address}
                                       onChange={this.handleEachTagInputChange}/>
                                Age
                                <input type="number" className="form-control" name="age"
                                       required={true}
                                       defaultValue={this.state.student?.age}
                                       placeholder={this.state.student?.age.toString()}
                                       onChange={this.handleEachTagInputChange}/>
                                Year
                                <input type="number" className="form-control" name="year"
                                       required={true}
                                       defaultValue={this.state.student?.year}
                                       placeholder={this.state.student?.year.toString()}
                                       onChange={this.handleEachTagInputChange}/>
                                Phone
                                <input type="text" className="form-control" name="phone"
                                       required={true}
                                       defaultValue={this.state.student?.phone}
                                       placeholder={this.state.student?.phone}
                                       onChange={this.handleEachTagInputChange}/>
                                Department
                                <input type="text" className="form-control" name="dpmid" placeholder={this.state.student?.department.department} readOnly={true}/>
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                    :
                    null
                }
            </>
        )
    }
}