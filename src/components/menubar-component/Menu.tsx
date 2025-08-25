import React from "react";
import {Component} from "react";
import {Link, Outlet} from "react-router-dom";

export class Menubar extends Component {

    private routerLinks : {to:string,label:string}[] = [
        {to: '/', label: 'React and Vite + Spring Boot (Crud Relation Tables)'},
        {to: '/students-and-departments-table', label: 'Students & Departments Table'},
        {to: '/create-student-form', label: 'Students Form'}
    ]

    render() {
        return (
            <>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark" aria-label="Eighth navbar example" style={{padding:'25px'}}>
                    <div className="container" style={{maxWidth: "290px", margin: "0 auto"}}>
                        <Link className="navbar-brand" to={this.routerLinks[0].to}>
                            <i className="fa-solid fa-house p-2"></i>{this.routerLinks[0].label}
                        </Link>
                        <div className="collapse navbar-collapse" id="navbarsExample07">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false">Topic</a>
                                    <ul className="dropdown-menu">
                                        {
                                          this.routerLinks.map((item, i) => // <Link> is used to set the URL and keep track of browsing history.
                                              <React.Fragment key={item.to}>
                                                  {
                                                      (i > 0)
                                                      ?
                                                      <li><Link className="dropdown-item" to={item.to}>{item.label}</Link></li>
                                                      :
                                                      null
                                                  }
                                              </React.Fragment>
                                          )
                                        }
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <Outlet/>
            </>
        );
    }
}