import {Component} from "react";
import {Student} from "../entities/student.ts";
import {StudentService} from "../service/StudentService.ts";
import {Link} from "react-router-dom";

type Props = {

}
type State = {
    students: Student[]
}

export class StudentAndDepartmentTable extends Component<Props,State> {

    constructor(props : Props) {
        super(props);
        this.state = {
            students : []
        }
    }

    componentDidMount = async () => {
        // ***
        new StudentService().getAllStudentsJoinDepartments().then(response => {
            /**
             console.log(response)
             data: Array(5), status: 201, statusText: '', headers: AxiosHeaders, config:
            */
            this.setState({
                students : response.data
            })
        })
    }

    render() {
        return (
            <>
                <div className={"container w-75 mt-4"}>
                    <table className="table" >
                        <thead className="table table-dark text-center">
                        <tr>
                            <th>sid</th>
                            <th>firstname</th>
                            <th>lastname</th>
                            <th>age</th>
                            <th>year</th>
                            <th>department</th>
                            <th>option test</th>
                            <th>options</th>
                        </tr>
                        </thead>
                        <tbody>
                        {/*
                             all tag can have event
                             Note if you pass arg on handle function
                             You have to use as function void (no return)
                             () => this.<function>(<args>)
                        */}
                        {
                            this.state.students?.map(
                                (student : Student) => (
                                    <tr key={student.sid}>
                                        <td>{student.sid}</td>
                                        <td>{student.firstname}</td>
                                        <td>{student.lastname}</td>
                                        <td>{student.age}</td>
                                        <td>{student.year}</td>
                                        <td>{student.department.department}</td>
                                        <td>
                                            <Link className={"btn btn-warning m-lg-2"} to={"/test-edit/"+student.sid}>edit/{student.sid}</Link>
                                            <Link className={"btn btn-warning"} to={"/test-edit?sid="+student.sid}>edit?sid={student.sid}</Link>
                                        </td>
                                        <td>
                                            <Link className={"btn btn-primary m-lg-2"} to={"/edit?sid="+student.sid}>edit</Link>
                                            <Link className={"btn btn-danger m-lg-2"} to={"/delete?sid="+student.sid}>remove</Link>
                                        </td>
                                    </tr>
                                ))
                        }
                        </tbody>
                    </table>
                </div>
            </>
        );
    }


}