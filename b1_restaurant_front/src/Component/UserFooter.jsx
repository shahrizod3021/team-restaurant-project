import '../assets/SideBar.css'
import {Link} from "react-router-dom";
export const UserFooter = () => {
    return (
        <div>
            <div className={"descUserFooter"}>
                <div className={"bg-warning d-flex align-items-center"}>
                    <h1 className={" col-10 text-light"}>Restourant</h1>
                    <h3 className={"col-2 text-light"}>+998 98 000 97 92</h3>
                </div>
            </div>

            <div className={'mobileUserFooter'}>
                <Link to={"/"} className={"mobileItem"}><i className={'bi-house'}></i></Link>
                <Link to={"/"} className={"mobileItem"}><i className={'bi-instagram'}></i></Link>
                <Link to={"/"} className={"mobileItem"}><i className={'bi-telegram'}></i></Link>
            </div>

        </div>
    )
}