import './App.css'
import {HashRouter, Route, Routes} from "react-router-dom";
import {Menubar} from "./components/menubar-component/Menu.tsx";
import {StudentAndDepartmentTable} from "./components/StudentAndDepartmentTable.tsx";
import {StudentFormEdit} from "./components/StudentFormEdit.tsx";
import {StudentFormCreate} from "./components/StudentFormCreate.tsx";
function App() {
  return (
      <HashRouter basename={"/"}
          // HashRouter : hash / # it works like angular working good on deploy
      >
          <Routes>
              <Route path={"/"} element={<Menubar />}
                  // path main "/"
              >
                  <Route path={"students-and-departments-table"} element={<StudentAndDepartmentTable />}
                      // sub path main "/students-and-departments-table,2,3" (still render on path main)
                  />
                  {/*<Route path={"test-edit/:sid"} element={
                          <>
                              <StudentFormEditClass/>
                              <StudentFormEditFunction />
                          </>
                      }/>*/}
                  {/* no need to set name of param we can get by method search! */}
                  {/*<Route path={"test-edit"} element={
                          <>
                              <StudentFormEditClass2/>
                              <StudentFormEditFunction2/>
                          </>
                      }/>*/}
                  <Route path={"edit"} element={
                      <StudentFormEdit />
                  }/>
                  <Route path={"create-student-form"} element={
                      <StudentFormCreate />
                  }/>
              </Route>
          </Routes>
      </HashRouter>
  )
}

export default App
