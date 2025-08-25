import React, {Component} from "react";
import {Student} from "../entities/student.ts";
import {StudentService} from "../service/StudentService.ts";
import {Link} from "react-router-dom";

type Props = {}
type State = {
    students: Student[]
}

export class StudentAndDepartmentTable extends Component<Props, State> {

    private readonly studentService: StudentService

    constructor(props: Props) {
        super(props);
        this.state = {
            students: []
        }
        this.studentService = new StudentService()
    }

    componentDidMount = async () => {
        this.studentService.getAllStudentsJoinDepartments().then(response => {
            // response is  data: Array(5), status: 201, statusText: '', headers: AxiosHeaders, config:
            this.setState({students: response.data})
        })
    }

    private async onDelete(sid: string) {
        this.setState({students: this.state.students.filter(student => (student.sid !== sid))}) // this way works if you don't need to call api again
        await this.studentService.deleteStudent(sid).then(response => {
            if (response) {
                alert(response.data)
            }
        })
    }

    private getFieldsName(student: Student): string[] {
        return Object.keys(student)
    }

    render() {
        return (
            <>
                {/**
                 Note!!
                 All tag can have event
                 If you pass arg on handle function
                 You have to use as function void (no return)
                 () => this.<function>(<args>)
                 */}
                <div className={"container mt-4"} style={{maxWidth: "1250px", overflowY: "scroll", height: "680px"}}>
                    <table className="table">
                        <thead className="table table-dark text-center">
                        <tr>
                            {(this.state.students.length > 0)
                                ?
                                this.getFieldsName(this.state.students[0]).map((field) => (
                                        <React.Fragment key={field}>
                                            {(field !== 'dpmid')
                                                ?
                                                <th>{field}</th>
                                                : null
                                            }
                                        </React.Fragment>
                                    )
                                )
                                :
                                null
                            }
                            <th>options</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.students?.map((student: Student) => (
                                    <React.Fragment key={student.sid}>
                                        <tr>
                                            <td>{student.sid}</td>
                                            <td>{student.firstname}</td>
                                            <td>{student.lastname}</td>
                                            <td>{student.age}</td>
                                            <td>{student.year}</td>
                                            <td>{student.address}</td>
                                            <td>{student.phone}</td>
                                            <td>{student.department.department}</td>
                                            <td className={"btn-group"}>
                                                <Link className={"btn btn-primary"} to={"/edit?sid=" + student.sid}>edit</Link>
                                                <button className={"btn btn-danger"} onClick={() => this.onDelete(student.sid)}>remove</button>
                                            </td>
                                        </tr>
                                    </React.Fragment>
                                )
                            )
                        }
                        </tbody>
                    </table>
                </div>
            </>
        );
    }

}