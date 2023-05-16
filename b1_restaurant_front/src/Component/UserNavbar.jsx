import {useEffect, useState} from "react";
import {GetOneUser} from "../Services/service.js";
import {Link} from "react-router-dom";
import  '../assets/SideBar.css'

export const UserNavbar = () => {
    const [user, setUser] = useState('')
    const id = localStorage.getItem("uuid")
    const oneUser = async  () =>{
        await GetOneUser(id, setUser)
    }
    useEffect(() => {
        oneUser()
    }, [])
    return(
        <div >
            <nav className="navbar navbar-expand-lg navbar-light bg-white " >
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

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <Link className="navbar-brand mt-2 mt-lg-0" to="/">
                            Restaurant
                            {/*<img*/}
                            {/*    src="https://mdbcdn.b-cdn.net/img/logo/mdb-transaprent-noshadows.webp"*/}
                            {/*    height="15"*/}
                            {/*    alt="MDB Logo"*/}
                            {/*    loading="lazy"*/}
                            {/*/>*/}
                        </Link>
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link" to="/">Asosiy bo'lim</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/">Categoriyalar</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/">Bog'lanish</Link>
                            </li>

                        </ul>
                    </div>


                    <div className="d-flex align-items-center">
                        <div className={"me-3"}>
                            <form className="d-md-flex input-group w-auto my-auto">
                                <input
                                    autoComplete="off"
                                    type="search"
                                    className="form-control rounded"
                                    placeholder='Search (ctrl + "/" to focus)'
                                    style={{minWidth: "225px"}}
                                />
                                <span className="input-group-text border-0 btn"><i className="fas fa-search"></i></span>
                            </form>
                        </div>

                        {user.length === 0 ? (
                            <>
                                <Link className="link-secondary me-3" to="/auth/register">
                                    <i className="fas fa-shopping-cart"></i>
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link className="link-secondary me-3" to="/">
                                    <i className="fas fa-shopping-cart"></i>
                                </Link>
                            </>
                        )}

                        {user.length === 0 ? (
                           <>
                               <div className={"authentication"}>
                                   <Link to={"/auth/register"} className={"btn me-2"}>Sign Up</Link>
                                   <Link to={"/auth/login"} className={"btn btn-outline-dark"}>Sign In</Link>
                               </div>

                           </>
                        ) :(
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
                                        <img
                                            src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                                            className="rounded-circle"
                                            height="25"
                                            alt="Black and White Portrait of a Man"
                                            loading="lazy"
                                        />
                                    </a>
                                    <ul
                                        className="dropdown-menu dropdown-menu-end"
                                        aria-labelledby="navbarDropdownMenuAvatar"
                                    >
                                        <li>
                                            <p style={{marginLeft:"10px", marginBottom:"0", padding:"0"}}>Signed in as</p>
                                            <p style={{marginLeft:"10px", marginBottom:"5px", padding:"0px"}}>{user.name} {user.surname}</p>
                                        </li>
                                        <li><hr className={"dropdown-divider"}/></li>
                                        <li>
                                            <a className="dropdown-item" href="#">My profile</a>
                                        </li>
                                        <li>
                                            <a className="dropdown-item" href="#">Settings</a>
                                        </li>
                                        <li>
                                            <a className="dropdown-item" href="#">Logout</a>
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