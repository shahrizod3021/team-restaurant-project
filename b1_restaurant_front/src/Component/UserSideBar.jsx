import {useEffect, useState} from "react";
import {set} from "mdb-ui-kit/src/js/mdb/perfect-scrollbar/lib/css.js";
import {Link, useNavigate} from "react-router-dom";
import {Apis} from "../Services/Apis.js";
import {GetOneUser} from "../Services/service.js";
import {Loading} from "./Loading.jsx";
import {toast} from "react-toastify";

export const UserSideBar = () => {
    const [hover, setHover] = useState("")
    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(false)
    const naviagte = useNavigate()

    const getOneUser = async () => {
        await GetOneUser(localStorage.getItem("uuid"), setUser)
        setLoading(true)
    }

    useEffect(() => {
        getOneUser()
    }, [])

    const logout = ( ) => {
        setTimeout(() => {
            localStorage.clear()
            naviagte('/')
        }, 2000)
    }
    const buttons = [
        {id: "1", name: "Mening ma'lumotlarim", link:"/auth/user", hover: hover, setHover: setHover},
        {id: "2", name: "Mening zakazlarim", link:"/auth/user/myOrder", hover: hover, setHover: setHover},
        {id: "3", name: "Mening savatcham ", link:"/auth/user/myBasket", hover: hover, setHover: setHover},
    ]

    const taxrir = (id) => {
        buttons.map((item) => {
            if (item.id === id) {
                item.hover = "btn btn-primary"
                localStorage.setItem("hover", item.hover)
                localStorage.setItem("buttonId", item.id)
            }

        })
    }
    return (
        <div>
            {loading ? (
                <>
                    <header >
                        <nav id="sidebarMenu" className="collapse d-lg-block sidebar collapse" >
                            <div className="position-sticky " >
                                <div className="list-group list-group-flush mx-3 mt-4">
                                    {buttons.map((item) => (
                                        <>
                                            <Link onClick={() => taxrir(item.id)} to={item.link}
                                                  className={
                                                      localStorage.getItem("buttonId") === item.id?(
                                                          localStorage.getItem("hover")
                                                      ) : (
                                                          "list-group-item list-group-item-action py-2 ripple"
                                                      )
                                                  }
                                            >{item.name}</Link>
                                        </>
                                    ))}
                                </div>
                            </div>
                        </nav>

                        <nav id="main-navbar" className="navbar navbar-expand-lg navbar-light fixed-top" >
                            <div className="container-fluid">
                                <button
                                    className="navbar-toggler"
                                    type="button"
                                    data-mdb-toggle="collapse"
                                    data-mdb-target="#sidebarMenu"
                                    aria-controls="sidebarMenu"
                                    aria-expanded="false"
                                    aria-label="Toggle navigation"
                                >
                                    <i className="fas fa-bars"></i>
                                </button>

                                <a className="navbar-brand" href="#">
                                    <h3>{user.name} {user.surname}</h3>
                                </a>
                                <ul className="navbar-nav ms-auto d-flex flex-row">

                                    <li className="nav-item dropdown">
                                        <a
                                            className="nav-link dropdown-toggle hidden-arrow d-flex align-items-center"
                                            href="#"
                                            id="navbarDropdownMenuLink"
                                            role="button"
                                            data-mdb-toggle="dropdown"
                                            aria-expanded="false"
                                        >
                                            <img
                                                src={Apis.getPhoto + user.photoId}
                                                className="rounded-circle"
                                                alt="Avatar"
                                                width={"30"}
                                                height={"30"}
                                                loading="lazy"
                                            />
                                        </a>
                                        <ul
                                            className="dropdown-menu dropdown-menu-end"
                                            aria-labelledby="navbarDropdownMenuLink"
                                        >
                                            <li>
                                                <p style={{marginLeft:"10px", marginBottom:"0", padding:"0"}}>Signed in as</p>
                                                <p style={{marginLeft:"10px", marginBottom:"5px", padding:"0px"}}>{user.name} {user.surname}</p>
                                            </li>
                                            <li>
                                                <hr className={"dropdown-divider"}/>
                                            </li>
                                            <li className={"d-flex align-items-center"}>
                                                <i style={{fontSize:"20px"}} className="bi bi-person-circle"></i>
                                                <Link className="dropdown-item" to="/auth/user" onClick={() => localStorage.setItem("buttonId","1")}>Mening accountim</Link>
                                            </li>
                                            <li className={"d-flex align-items-center"}>
                                                <i style={{fontSize:"20px"}} className="bi bi-basket"></i>
                                                <Link className="dropdown-item" to="/auth/user/myOrder" onClick={() => localStorage.setItem("buttonId","2")}>Zakazlar</Link>
                                            </li>
                                            <li className={"d-flex align-items-center"}>
                                                <i style={{fontSize:"20px"}} className="bi bi-box-arrow-in-right"></i>
                                                <button onClick={() => logout()} className="dropdown-item" >Accauntdan chiqish</button>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                    </header>
                </>
            ) : (
                <>
                    <Loading/>
                </>
            )}

        </div>
    )
}