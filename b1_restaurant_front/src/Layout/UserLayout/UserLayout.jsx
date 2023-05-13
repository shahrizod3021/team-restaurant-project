import {Outlet} from "react-router-dom";
import {UserNavbar} from "../../Component/UserNavbar.jsx";
import {UserFooter} from "../../Component/UserFooter.jsx";

export const UserLayout = () => {
    return (
        <div>
            <UserNavbar/>
            <div>
                <Outlet/>
            </div>
            <UserFooter/>
        </div>
    )
}