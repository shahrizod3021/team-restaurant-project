import {useEffect, useState} from "react";
import {GetOneUser} from "../Services/service.js";
import {Link} from "react-router-dom";
import '../assets/SideBar.css'
import {Apis} from "../Services/Apis.js";
import  person from '../assets/person.png'

export const UserNavbar = () => {
    const [user, setUser] = useState('')
    const id = localStorage.getItem("uuid")
    const oneUser = async () => {
        await GetOneUser(id, setUser)
    }
    useEffect(() => {
        oneUser()
    }, [])
    const logout = () => {
        localStorage.clear()
        window.location.reload()
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-white ">
                <div className="container-fluid">
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-mdb-toggle="collapse"
                        data-mdb-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <i className="fas fa-bars"></i>
                    </button>

                    <div  className="collapse navbar-collapse" id="navbarSupportedContent">
                        <Link className="navbar-brand mt-2 mt-lg-0" to="/aboutus">
                            Restaurant
                        </Link>
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="menues nav-link" to="/">Asosiy bo'lim</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="menues nav-link" to="/contactus">Bog'lanish</Link>
                            </li>

                        </ul>
                    </div>


                    <div className="d-flex align-items-center">

                        {user.length === 0 ? (
                            <>
                                <div className={"authentication"}>
                                    <Link to={"/auth/register"} className={"btn me-2"}>Sign Up</Link>
                                    <Link to={"/auth/login"} className={"btn btn-outline-dark"}>Sign In</Link>
                                </div>

                            </>
                        ) : (
                            <>
                                <div className="dropdown">
                                    <a
                                        className="dropdown-toggle d-flex align-items-center hidden-arrow"
                                        href="#"
                                        id="navbarDropdownMenuAvatar"
                                        role="button"
                                        data-mdb-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        {user.photoId === null ? (
                                            <>
                                                <img
                                                    src={person}
                                                    className="rounded-circle"
                                                    height="30"
                                                    width={"30"}
                                                    alt="Black and White Portrait of a Man"
                                                    loading="lazy"
                                                />
                                            </>
                                        ) : (
                                            <>
                                                <img
                                                    src={Apis.getPhoto + user.photoId}
                                                    className="rounded-circle"
                                                    height="30"
                                                    width={"30"}
                                                    alt="Black and White Portrait of a Man"
                                                    loading="lazy"
                                                />
                                            </>
                                        )}

                                    </a>
                                    <ul
                                        className="dropdown-menu dropdown-menu-end"
                                        aria-labelledby="navbarDropdownMenuAvatar"
                                    >
                                        <li>
                                            <p style={{marginLeft: "10px", marginBottom: "0", padding: "0"}}>Sizning accauntingiz</p>
                                            <p style={{
                                                marginLeft: "10px",
                                                marginBottom: "5px",
                                                padding: "0px"
                                            }}>{user.name} {user.surname}</p>
                                        </li>
                                        <li>
                                            <hr className={"dropdown-divider"}/>
                                        </li>
                                        <li>
                                            <Link className="dropdown-item" to="/auth/myaccaunt">Mening accauntim</Link>
                                        </li>
                                        <li>
                                            <Link className="dropdown-item" to="/auth/settings">Sozlamalar</Link>
                                        </li>
                                        <li >
                                            <Link className="dropdown-item" to="/" onClick={() => logout()}><i className={"bi-door-closed-fill"} style={{marginRight:"10px"}}></i>Chiqish</Link>
                                        </li>
                                    </ul>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </nav>
        </div>
    )
}