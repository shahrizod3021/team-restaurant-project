import {Outlet} from "react-router-dom";
import {UserNavbar} from "../../Component/UserNavbar.jsx";
import {UserFooter} from "../../Component/UserFooter.jsx";
import {Navbar} from "../../Component/Navbar.jsx";

export const UserLayout = () => {
    return (
        <div>
            <UserNavbar/>
            <Navbar/>
            <div>
                <Outlet/>
            </div>
            <UserFooter/>
        </div>
    )
}