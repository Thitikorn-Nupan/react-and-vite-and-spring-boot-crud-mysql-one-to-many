import {ChangeEvent, Component, FormEvent} from "react";
import {StudentService} from "../service/StudentService.ts";
import {Student} from "../entities/student.ts";
import {Department} from "../entities/department.ts";


type Props = {

}

type State = {
    values : {
        sid: string,
        firstname: string,
        lastname: string,
        age: number,
        dpmid: string,
        year: number,
        address: string,
        phone: string,
    },
    // option : string
}

export class StudentFormCreate extends Component <Props , State>{

    constructor(props : Props) {
        super(props);
        this.state = {
            values : {
                sid: "",
                firstname: "",
                lastname: "",
                age: 0,
                dpmid: "",
                year: 0,
                address: "",
                phone: "",
            },
            // option : ""
        }
    }

    // ** way to set state type object
    // ** this way work good if you need to use name of tag input
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

    handleOptionChange = (event : ChangeEvent<HTMLInputElement>) => {
        // can specify uniq key for this way
        this.setState({
            values : {
                ...this.state.values, // access ...array
                dpmid: event.target?.value
            }
        })
    }

    handleSubmitStudentForm = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault() // block navigate to any paths
        console.log(this.state.values)
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
        await new StudentService().addStudent(student).then((response) => {
            if (response) {
                window.location.replace("/students-and-departments-table")
            }
        })

    }

    render() {
        return (
            <>
                <div className={"container w-50 mt-4"}>
                    <form className={"form-control p-2"} onSubmit={this.handleSubmitStudentForm}>{/* onSubmit={this.handleSubmitStudentForm}*/}
                        <div className="mb-3">
                            Sid
                            <input type="text" className="form-control" name="sid"
                                   onChange={this.handleEachTagInputChange}/>
                            Firstname
                            <input type="text" className="form-control" name="firstname"
                                   onChange={this.handleEachTagInputChange}/>
                            Lastname
                            <input type="text" className="form-control" name="lastname"
                                   onChange={this.handleEachTagInputChange}/>
                            Address
                            <input type="text" className="form-control" name="address"
                                   onChange={this.handleEachTagInputChange}/>
                            Age
                            <input type="number" className="form-control" name="age"
                                   onChange={this.handleEachTagInputChange}/>
                            Year
                            <input type="number" className="form-control" name="year"
                                   onChange={this.handleEachTagInputChange}/>
                            Phone
                            <input type="text" className="form-control" name="phone"
                                   onChange={this.handleEachTagInputChange}/>
                            <div className={"mt-2"}>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="option"
                                           value="D1"
                                           onChange={this.handleOptionChange}/>
                                    <label className="form-check-label" htmlFor="inlineRadio1">D1</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="option"
                                           value="D2"
                                           onChange={this.handleOptionChange}/>
                                    <label className="form-check-label" htmlFor="inlineRadio2">D2</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="option"
                                           value="D3"
                                           onChange={this.handleOptionChange}/>
                                    <label className="form-check-label" htmlFor="inlineRadio3">D3</label>
                                </div>
                            </div>

                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </>
        )
    }
}