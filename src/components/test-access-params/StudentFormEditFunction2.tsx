
 export function StudentFormEditFunction2() {
    // We can use the `useParams` hook here to access
    // the dynamic pieces of the URL.
     const queryParameters = new URLSearchParams(window.location.search)
     const sid = queryParameters.get("sid")
     return (
        <div className={"alert alert-danger"}>
            <h3>new URLSearchParams(window.location.search) hook to access dynamic URL... {sid}</h3>
        </div>
    );
}

