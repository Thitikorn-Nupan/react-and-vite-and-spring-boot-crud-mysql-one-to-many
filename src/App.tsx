// import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Menubar} from "./components/menubar-component/Menu.tsx";
import {StudentAndDepartmentTable} from "./components/StudentAndDepartmentTable.tsx";
import {StudentFormEditClass} from "./components/test-access-params/StudentFormEditClass.tsx";
import {StudentFormEditFunction} from "./components/test-access-params/StudentFormEditFunction.tsx";
import {StudentFormEditClass2} from "./components/test-access-params/StudentFormEditClass2.tsx";
import {StudentFormEditFunction2} from "./components/test-access-params/StudentFormEditFunction2.tsx";
import {StudentFormEdit} from "./components/StudentFormEdit.tsx";
import {StudentFormCreate} from "./components/StudentFormCreate.tsx";
function App() {
  return (
      <>
          <BrowserRouter>
              <Routes>
                  {/* path main "/" */}
                  <Route path={"/"} element={<Menubar />}>
                      {/* *** sub path main "/todo1,2,3" (still render on path main) */}
                      <Route path={"students-and-departments-table"} element={<StudentAndDepartmentTable />}/>
                      <Route path={"test-edit/:sid"} element={
                          <>
                              <StudentFormEditClass/>
                              <StudentFormEditFunction />
                          </>
                      }/>
                      {/* no need to set name of param we can get by method search! */}
                      <Route path={"test-edit"} element={
                          <>
                              <StudentFormEditClass2/>
                              <StudentFormEditFunction2/>
                          </>
                      }/>
                      <Route path={"edit"} element={
                          <StudentFormEdit />
                      }/>
                      <Route path={"create-student-form"} element={
                          <StudentFormCreate />
                      }/>
                  </Route>
              </Routes>
          </BrowserRouter>
      </>
  )
}

export default App
