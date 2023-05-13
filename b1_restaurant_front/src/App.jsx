import {BrowserRouter, Route, Routes} from "react-router-dom";
import {AdminLayout} from "./Layout/AdminLayout/AdminLayout.jsx";
import {Login} from "./Services/Login.jsx";
import {Register} from "./Services/Register.jsx";
import {UserLayout} from "./Layout/UserLayout/UserLayout.jsx";
import {OneUser} from "./Pages/UserPages/OneUser.jsx";
import {Basic} from "./Pages/AdminPages/Basic.jsx";
import {NotFoundPage} from "./Component/NotFoundPage.jsx";

export const App =( ) =>  {
  return (
    <div >
      <BrowserRouter>
        <Routes>
          <Route path={"/auth/admin"} element={<AdminLayout/>} >
            <Route index element={<Basic/>} />
          </Route>
          <Route path={"/"} element={<UserLayout/>}>
            <Route path={"/foydalanuvchi"} element={<OneUser/>}/>
          </Route>
            <Route path={"/auth/login"} element={<Login/>}/>
            <Route path={"/auth/register"} element={<Register/>}/>
          <Route path={"*"} element={<NotFoundPage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

