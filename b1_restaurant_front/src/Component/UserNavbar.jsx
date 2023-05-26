import {useEffect, useState} from "react";
import {GetOneUser, GetProduct, Search} from "../Services/service.js";
import {Link, useNavigate} from "react-router-dom";
import '../assets/SideBar.css'
import {Apis} from "../Services/Apis.js";
import person from '../../../../AnimeProject/animePack/anime_line/src/assets/person.png'
import {Loading} from "./Loading.jsx";

export const UserNavbar = () => {
    const [user, setUser] = useState('')
    const id = localStorage.getItem("uuid")
    const [name, setName] = useState('')
    const navigate = useNavigate()
    const [product, setProduct] = useState([])

    const oneUser = async () => {
        await GetOneUser(id, setUser)
        await GetProduct(setProduct)
    }
    useEffect(() => {
        oneUser()
    }, [])
    const logout = () => {
        localStorage.clear()
        window.location.reload()
    }
    const search = async () => {
        await Search(name)
        if (localStorage.getItem("searchPath") === "/category/null" || localStorage.getItem("searchPath") === "/category/undefined") {
            navigate("/notfound")
        }
        else {
            setTimeout(() => {
                navigate(localStorage.getItem("searchPath"))
                window.location.reload()
            }, 1000)
        }
    }
const filter = product.filter(item => item.name.toLocaleLowerCase().includes(name.toLocaleLowerCase()))

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

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
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
                            <li>
                                <div className="search-box" style={{height:"6vh"}}>
                                    <button style={{height: "6vh"}} onClick={() => search()} className="btn-search"><i
                                        className="fas fa-search"></i></button>
                                    <input style={{height: "6vh"}} value={name} onChange={e => setName(e.target.value)}
                                           type="text" className="input-search" placeholder="Qidiring"
                                           data-mdb-toggle="dropdown"
                                           aria-expanded="false"
                                           id="searchDr"
                                    />
                                    <ul  className="dropdown-menu"
                                         aria-labelledby="searchDr">
                                        {filter.length === 0 ? (
                                            <>
                                                <li className={"dropdown-item"}>{name}</li>

                                            </>
                                        ) : (
                                           <>
                                               {filter.map((item) => (
                                                   <>
                                                    <li className={"dropdown-item"} onClick={() => setTimeout(() => {
                                                        navigate("/product/" + `${item.name}`)
                                                        window.location.reload()
                                                    }, 500)}>{item.name}</li>
                                                   </>
                                               ))}
                                           </>
                                        )}
                                    </ul>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div className="d-flex align-items-center">
                        {user.length === 0 ? (
                            <>
                                <div className={"authentication"}>
                                    <Link to={"/auth/register"} className={"btn btn-success me-2"}>Sign Up</Link>
                                    <Link to={"/auth/login"} className={"btn btn-danger"}>Sign In</Link>
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
                                                    alt="Black and White Portrait of a Man"
                                                    loading="lazy"
                                                    height={"30"}
                                                    width={"30"}
                                                />
                                            </>
                                        )}

                                    </a>
                                    <ul
                                        className="dropdown-menu dropdown-menu-end"
                                        aria-labelledby="navbarDropdownMenuAvatar"
                                    >
                                        <li>
                                            <p style={{marginLeft: "10px", marginBottom: "0", padding: "0"}}>Sizning
                                                accauntingiz</p>
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
                                            <Link className="dropdown-item" to="/auth/user/" onClick={() => localStorage.setItem("buttonId","1")}><i
                                                className="far fa-user" style={{marginRight: "10px"}}></i>Mening
                                                accauntim</Link>
                                        </li>
                                        <li>
                                            <Link className="dropdown-item" to="/auth/user/myOrder"><i
                                                className="bi bi-basket"
                                                style={{marginRight: "10px"}} onClick={() => localStorage.setItem("buttonId","2")}></i>Mening zakazlarim</Link>
                                        </li>
                                        <li>
                                            <Link className="dropdown-item" to="/" onClick={() => logout()}><i
                                                className={"fas fa-arrow-right-to-bracket"}
                                                style={{marginRight: "10px"}}></i>Accauntdan Chiqish</Link>
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