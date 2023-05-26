import '../assets/SideBar.css'
import {Link, useNavigate, useParams} from "react-router-dom";
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
    const navigate = useNavigate()
    const [search, setSearch] = useState('')

    const searchingItem = [
        {name: "kategoriyalar", link: "/auth/admin/category"},
        {name: "kategoriya", link: "/auth/admin/category"},
        {name: "kategoriyalar ro'yhati", link: "/auth/admin/category"},
        {name: "yetqazilinmagan zakazlar ro'yhati", link: "/auth/admin/zakaz"},
        {name: "zakazlar", link: "/auth/admin/zakaz"},
        {name: "mahsulotlar", link: "/auth/admin/product"},
        {name: "mahsulot", link: "/auth/admin/product"},
        {name: "product", link: "/auth/admin/product"},
        {name: "category", link: "/auth/admin/category"},
        {name: "aksiyalar", link: "/auth/admin/aksiya"},
        {name: "arxiv", link: "/auth/admin/arxiv"},
        {name: "filial", link: "/auth/admin/filial"}
    ]
    const oneUser = async () => {
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
            bgColor: "#fff", textColor: "#191c24", id: id
        }
        const res = await axios.put(BASE_URL + Apis.color, data)
        window.location.reload()
    }

    const changeColor2 = async () => {
        const data = {
            bgColor: "#191c24", textColor: "#fff", id: id
        }
        const res = await axios.put(BASE_URL + Apis.color, data)
        window.location.reload()
    }
    const logout = () => {
        localStorage.clear()
        navigate("/")
    }

    const filter = searchingItem.filter(item => item.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
    return (
        <div>
            <header>
                <nav id="sidebarMenu" className="collapse d-lg-block sidebar collapse"
                     style={{backgroundColor: `${color.bgColor}`}}>
                    <div className="position-sticky " style={{backgroundColor: `${color.bgColor}`}}>
                        <div className="list-group list-group-flush mx-3 mt-4">
                            <Link
                                to="/auth/admin"
                                className="list-group-item list-group-item-action py-2 ripple"
                                style={{backgroundColor: `${color.bgColor}`, color: `${color.textColor}`}}
                                aria-current="true"
                            >
                                <i className="fas fa-tachometer-alt fa-fw me-3"></i><span>Asosiy bo'lim</span>
                            </Link>
                            <Link to="/auth/admin/category"
                                  className="list-group-item list-group-item-action py-2 ripple"
                                  style={{backgroundColor: `${color.bgColor}`, color: `${color.textColor}`}}>
                                <i className="fas fa-chart-area fa-fw me-3"></i><span>Kategoriyalar</span>
                            </Link>
                            <Link to="/auth/admin/product"
                                  className="list-group-item list-group-item-action py-2 ripple"
                                  style={{backgroundColor: `${color.bgColor}`, color: `${color.textColor}`}}
                            ><i className="fas fa-lock fa-fw me-3"></i><span>Mahsultolar</span></Link
                            >
                            <Link to="/auth/admin/zakaz" className="list-group-item list-group-item-action py-2 ripple "
                                  style={{backgroundColor: `${color.bgColor}`, color: `${color.textColor}`}}
                            ><i className="fas fa-chart-line fa-fw me-3"></i><span>Zakazalar</span></Link
                            >
                            <Link to="/auth/admin/sale" className="list-group-item list-group-item-action py-2 ripple "
                                  style={{backgroundColor: `${color.bgColor}`, color: `${color.textColor}`}}>
                                <i className="fas fa-money-bill fa-fw me-3"></i><span>Aksiya</span>
                            </Link>
                            <Link to="/auth/admin/arxiv" className="list-group-item list-group-item-action py-2 ripple "
                                  style={{backgroundColor: `${color.bgColor}`, color: `${color.textColor}`}}
                            ><i className="fas fa-history fa-fw me-3"></i><span>Arxiv</span></Link
                            >
                            <Link to="/auth/admin/filial"
                                  className="list-group-item list-group-item-action py-2 ripple "
                                  style={{backgroundColor: `${color.bgColor}`, color: `${color.textColor}`}}
                            ><i className="fas fa-plus fa-fw me-3"></i><span>Filial</span></Link
                            >

                        </div>
                    </div>
                </nav>

                <nav id="main-navbar" className="navbar navbar-expand-lg navbar-light fixed-top"
                     style={{backgroundColor: `${color.bgColor}`}}>
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

                        <a className="navbar-brand" href="#" style={{color: `${color.textColor}`}}>
                            <h2 style={{color: `${color.textColor}`}}>Restaurant</h2>
                        </a>
                        <form className="d-none d-md-flex input-group w-auto my-auto">
                            <input
                                autoComplete="off"
                                type="search"
                                className="form-control dropdown rounded"
                                placeholder='Search (ctrl + "/" to focus)'
                                value={search}
                                data-mdb-toggle="dropdown"
                                aria-expanded="false"
                                id="searchDr"
                                onChange={e => setSearch(e.target.value)}
                                style={{minWidth: "225px", backgroundColor: `${color.textColor}`}}
                            />
                            <ul
                                className="dropdown-menu"
                                aria-labelledby="searchDr"
                            >
                                {filter.length === 0 ? (
                                    <>
                                        <li className={"dropdown-item"}>{search}</li>
                                    </>
                                ) : (
                                    <>
                                        {filter.map((item) => (
                                            <>
                                                <li className={"dropdown-item"}  onClick={() => navigate(item.link)}>
                                                    {item.name}
                                                </li>
                                            </>
                                        ))}
                                    </>
                                )}
                            </ul>
                            {filter.length === 0 ? (
                                <>
                                    <button type={"button"}
                                            onClick={() => navigate("*")}
                                            className="input-group-text border-0"><i className="fas fa-search"
                                                                                     style={{color: `${color.textColor}`}}
                                    ></i>
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button type={"button"}
                                            onClick={() =>
                                                filter.map((item) => (navigate(item.link)))}
                                            className="input-group-text border-0"><i className="fas fa-search"
                                                                                     style={{color: `${color.textColor}`}}
                                    ></i></button>
                                </>
                            )}
                        </form>
                        <ul className="navbar-nav ms-auto d-flex flex-row">
                            <li className="nav-item">
                                {color.textColor === "#fff" ? (
                                    <button type={"button"} className="nav-link me-3 me-lg-0 border-0 input-group-text"
                                            onClick={() => changeColor()}>
                                        <i className="fas fa-fill-drip" style={{color: `${color.textColor}`}}></i>
                                    </button>
                                ) : (
                                    <button type={"button"} className="nav-link me-3 me-lg-0 border-0 input-group-text"
                                            onClick={() => changeColor2()}>
                                        <i className="fas fa-fill-drip" style={{color: `${color.textColor}`}}></i>
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
                                        src={Apis.getPhoto + user.photoId}
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
                                        <p style={{marginLeft: "10px", marginBottom: "0", padding: "0"}}>Signed in
                                            as</p>
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
                                        <Link className="dropdown-item" to="http://localhost:5173/auth/user/">Mening
                                            Profilim</Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item"
                                              to="http://localhost:5173/auth/user/">Sozalamalar</Link>
                                    </li>
                                    <li>
                                        <Link to={"/"} className="dropdown-item" onClick={() => logout()}>Accauntdan
                                            chiqish</Link>
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