import  '../assets/SideBar.css'
import {Link, useParams} from "react-router-dom";
import {GetColor, GetOneUser} from "../Services/service.js";
import {useEffect, useState} from "react";
import {set} from "mdb-ui-kit/src/js/mdb/perfect-scrollbar/lib/css.js";
import axios from "axios";
import {BASE_URL} from "../Services/BaseUrl.js";
import {Apis} from "../Services/Apis.js";


export const SideBar = () => {
    const [color, setColor] = useState({})
    const [user, setUser] = useState('')
    const id = localStorage.getItem("uuid")
    const oneUser = async  () =>{
        await GetOneUser(id, setUser)
    }

    const getColor = async () => {
        await GetColor(setColor, id)
    }

    useEffect(() => {
        oneUser()
        getColor()
    }, [])

    const changeColor = async () => {
        const data = {
            bgColor:"#fff",textColor:"#191c24", id:id
        }
        const res = await axios.put(BASE_URL + Apis.color, data)
        window.location.reload()
    }

    const changeColor2 = async () => {
        const data = {
            bgColor:"#191c24",textColor:"#fff", id:id
        }
        const res = await axios.put(BASE_URL + Apis.color, data)
        window.location.reload()
    }

    return (
        <div>
            <header >
                <nav id="sidebarMenu" className="collapse d-lg-block sidebar collapse" style={{backgroundColor:`${color.bgColor}`}}>
                    <div className="position-sticky " style={{backgroundColor:`${color.bgColor}`}}>
                        <div className="list-group list-group-flush mx-3 mt-4">
                            <Link
                                to="/auth/admin"
                                className="list-group-item list-group-item-action py-2 ripple" style={{backgroundColor:`${color.bgColor}`, color:`${color.textColor}`}}
                                aria-current="true"
                            >
                                <i className="fas fa-tachometer-alt fa-fw me-3"></i><span>Asosiy bo'lim</span>
                            </Link>
                            <Link to="/auth/admin/category" className="list-group-item list-group-item-action py-2 ripple" style={{backgroundColor:`${color.bgColor}`,color:`${color.textColor}`}}>
                                <i className="fas fa-chart-area fa-fw me-3"></i><span>Kategoriyalar</span>
                            </Link>
                            <Link to="/auth/admin/product" className="list-group-item list-group-item-action py-2 ripple" style={{backgroundColor:`${color.bgColor}`, color:`${color.textColor}`}}
                            ><i className="fas fa-lock fa-fw me-3"></i><span>Mahsultolar</span></Link
                            >
                            <Link to="/auth/admin/zakaz" className="list-group-item list-group-item-action py-2 ripple " style={{backgroundColor:`${color.bgColor}`, color:`${color.textColor}`}}
                            ><i className="fas fa-chart-line fa-fw me-3"></i><span>Zakazalar</span></Link
                            >
                            <Link to="/auth/admin/sale" className="list-group-item list-group-item-action py-2 ripple " style={{backgroundColor:`${color.bgColor}`, color:`${color.textColor}`}}>
                                <i className="fas fa-money-bill fa-fw me-3"></i><span>Aksiya</span>
                            </Link>
                            <Link to="/auth/admin/arxiv" className="list-group-item list-group-item-action py-2 ripple " style={{backgroundColor:`${color.bgColor}`, color:`${color.textColor}`}}
                            ><i className="fas fa-history fa-fw me-3"></i><span>Arxiv</span></Link
                            >
                            <Link to="/auth/admin/filial" className="list-group-item list-group-item-action py-2 ripple " style={{backgroundColor:`${color.bgColor}`, color:`${color.textColor}`}}
                            ><i className="fas fa-plus fa-fw me-3"></i><span>Filial</span></Link
                            >
                            <Link to="/auth/admin/newadmin" className="list-group-item list-group-item-action py-2 ripple " style={{backgroundColor:`${color.bgColor}`, color:`${color.textColor}`}}
                            ><i className="fas fa-user-plus fa-fw me-3"></i><span>New admin</span></Link
                            >
                        </div>
                    </div>
                </nav>

                <nav id="main-navbar" className="navbar navbar-expand-lg navbar-light fixed-top" style={{backgroundColor:`${color.bgColor}`}}>
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

                        <a className="navbar-brand" href="#" style={{color:`${color.textColor}`}}>
                            <h2 style={{color:`${color.textColor}`}}>Restaurant</h2>
                        </a>
                        <form className="d-none d-md-flex input-group w-auto my-auto">
                            <input
                                autoComplete="off"
                                type="search"
                                className="form-control rounded"
                                placeholder='Search (ctrl + "/" to focus)'
                                style={{minWidth: "225px", backgroundColor:`${color.textColor}`}}
                            />
                            <button type={"button"} className="input-group-text border-0"><i className="fas fa-search" style={{color:`${color.textColor}`}}></i></button>
                        </form>

                        <ul className="navbar-nav ms-auto d-flex flex-row">
                            <li className="nav-item dropdown">
                                <a
                                    className="nav-link me-3 me-lg-0 dropdown-toggle hidden-arrow"
                                    href="#"
                                    id="navbarDropdownMenuLink"
                                    role="button"
                                    data-mdb-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    <i className="fas fa-bell "  style={{color:`${color.textColor}`}}></i>
                                    <span className="badge rounded-pill badge-notification bg-danger">1</span>
                                </a>
                                <ul
                                    className="dropdown-menu dropdown-menu-end"
                                    aria-labelledby="navbarDropdownMenuLink"
                                >
                                    <li>
                                        <a className="dropdown-item" href="#">Some news</a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#">Another news</a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#">Something else here</a>
                                    </li>
                                </ul>
                            </li>

                            <li className="nav-item">
                                {color.textColor === "#fff" ? (
                                    <button type={"button"} className="nav-link me-3 me-lg-0 border-0 input-group-text" onClick={() => changeColor()}>
                                        <i className="fas fa-fill-drip" style={{color:`${color.textColor}`}}></i>
                                    </button>
                                ): (
                                    <button type={"button"} className="nav-link me-3 me-lg-0 border-0 input-group-text" onClick={() => changeColor2()}>
                                        <i className="fas fa-fill-drip" style={{color:`${color.textColor}`}}></i>
                                    </button>
                                )
                                }
                            </li>

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
                                        src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img (31).webp"
                                        className="rounded-circle"
                                        height="22"
                                        alt="Avatar"
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
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>


        </div>
    )
}