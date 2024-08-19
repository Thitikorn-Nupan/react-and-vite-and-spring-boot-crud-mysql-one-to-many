import {Component} from "react";

export class StudentFormEditClass2 extends Component {

    componentDidMount() {
        console.log(window.location.search) // ?sid=S1
    }

    render() {
        return (<h3 className={"alert alert-dark mt-3"}>Get param on URL by window.location.search... {window.location.search.slice(5)} </h3>);
    }
}