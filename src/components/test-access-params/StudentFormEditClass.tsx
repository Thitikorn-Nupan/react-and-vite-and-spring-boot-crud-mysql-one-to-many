import {Component} from "react";

export class StudentFormEditClass extends Component {

    componentDidMount() {
        console.log(window.location.pathname) // /edit/S2
    }

    render() {
        return (<h3 className={"alert alert-dark mt-3"}>Get param on URL by window.location.pathname...  {window.location.pathname.slice(6)}</h3>);
    }
}