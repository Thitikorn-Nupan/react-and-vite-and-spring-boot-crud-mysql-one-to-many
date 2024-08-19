import {
    useParams
} from "react-router-dom";

 export function StudentFormEditFunction() {
    // We can use the `useParams` hook here to access
    // the dynamic pieces of the URL.
    const { sid  } = useParams(); // it mapp auto
     return (
        <div className={"alert alert-danger"}>
            <h3>useParams() hook to access dynamic URL... {sid}</h3>
        </div>
    );
}

