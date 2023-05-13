import  '../assets/css/style.css'
import  logo from '../assets/images/logo.svg'
import  logomini from '../assets/images/logo-mini.svg'
import  face from '../assets/images/faces/face15.jpg'
import myPhoto from '../assets/images/shahrizod.jpg'
import {Link, useParams} from "react-router-dom";
import {GetOneUser} from "../Services/service.js";
import {useEffect, useState} from "react";

export const SideBar = () => {
    const [user, setUser] = useState('')
    const id = localStorage.getItem("uuid")
    const oneUser = async  () =>{
        await GetOneUser(id, setUser)
    }
    useEffect(() => {
        oneUser()
    }, [])

    return (
        <div>
            <nav className="sidebar sidebar-offcanvas" id="sidebar">
                <div
                    className="sidebar-brand-wrapper d-none d-lg-flex align-items-center justify-content-center fixed-top">
                    <Link className="sidebar-brand brand-logo" to="/auth/admin"><img
                        src={logo} alt="logo"/></Link>
                    <Link className="sidebar-brand brand-logo-mini" to="../../index.html"><img
                        src={logomini} alt="logo"/></Link>
                </div>
                <ul className="nav">
                    <li className="nav-item profile">
                        <div className="profile-desc">
                            <div className="profile-pic">
                                <div className="count-indicator">
                                    <img className="img-xs rounded-circle " src={myPhoto}
                                         alt=""/>
                                        <span className="count bg-success"></span>
                                </div>
                                <div className="profile-name">
                                    <h5 className="mb-0 font-weight-normal">{user.name} {user.surname}</h5>
                                </div>
                            </div>
                            <Link to="#" id="profile-dropdown" data-toggle="dropdown"><i
                                className="mdi mdi-dots-vertical"></i></Link>
                            <div className="dropdown-menu dropdown-menu-right sidebar-dropdown preview-list"
                                 aria-labelledby="profile-dropdown">
                                <Link to="#" className="dropdown-item preview-item">
                                    <div className="preview-thumbnail">
                                        <div className="preview-icon bg-dark rounded-circle">
                                            <i className="mdi mdi-settings text-primary"></i>
                                        </div>
                                    </div>
                                    <div className="preview-item-content">
                                        <p className="preview-subject ellipsis mb-1 text-small">Account settings</p>
                                    </div>
                                </Link>
                                <div className="dropdown-divider"></div>
                                <Link to="#" className="dropdown-item preview-item">
                                    <div className="preview-thumbnail">
                                        <div className="preview-icon bg-dark rounded-circle">
                                            <i className="mdi mdi-onepassword  text-info"></i>
                                        </div>
                                    </div>
                                    <div className="preview-item-content">
                                        <p className="preview-subject ellipsis mb-1 text-small">Change Password</p>
                                    </div>
                                </Link>
                                <div className="dropdown-divider"></div>
                                <Link to="#" className="dropdown-item preview-item">
                                    <div className="preview-thumbnail">
                                        <div className="preview-icon bg-dark rounded-circle">
                                            <i className="mdi mdi-calendar-today text-success"></i>
                                        </div>
                                    </div>
                                    <div className="preview-item-content">
                                        <p className="preview-subject ellipsis mb-1 text-small">To-do list</p>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </li>
                    <li className="nav-item nav-category">
                        <span className="nav-link">Navigation</span>
                    </li>
                    <li className="nav-item menu-items">
                        <Link className="nav-link" to="../../index.html">
              <span className="menu-icon">
                <i className="mdi mdi-speedometer"></i>
              </span>
                            <span className="menu-title">Asosiy bo'lim</span>
                        </Link>
                    </li>

                    <li className="nav-item menu-items">
                        <Link className="nav-link" to="../../pages/forms/basic_elements.html">
              <span className="menu-icon">
                <i className="mdi mdi-playlist-play"></i>
              </span>
                            <span className="menu-title">Categoriya</span>
                        </Link>
                    </li>
                    <li className="nav-item menu-items">
                        <Link className="nav-link" to="../../pages/tables/basic-table.html">
              <span className="menu-icon">
                <i className="mdi mdi-table-large"></i>
              </span>
                            <span className="menu-title">Productlar</span>
                        </Link>
                    </li>
                    <li className="nav-item menu-items">
                        <Link className="nav-link" to="../../pages/charts/chartjs.html">
              <span className="menu-icon">
                <i className="mdi mdi-chart-bar"></i>
              </span>
                            <span className="menu-title">Zakazlar</span>
                        </Link>
                    </li>
                    <li className="nav-item menu-items">
                        <Link className="nav-link" to="../../pages/icons/mdi.html">
              <span className="menu-icon">
                <i className="mdi mdi-history"></i>
              </span>
                            <span className="menu-title">Arxiv</span>
                        </Link>
                    </li>

                    <li className="nav-item menu-items">
                        <Link className="nav-link"
                           to="https://www.bootstrapdash.com/demo/corona-free/jquery/documentation/documentation.html">
              <span className="menu-icon">
                <i className="mdi mdi-file-document-box"></i>
              </span>
                            <span className="menu-title">Footer qo'shish</span>
                        </Link>
                    </li>
                    <li className="nav-item menu-items">
                        <Link className="nav-link"
                              to="https://www.bootstrapdash.com/demo/corona-free/jquery/documentation/documentation.html">
              <span className="menu-icon">
                <i className="mdi mdi-shopping"></i>
              </span>
                            <span className="menu-title">Aksiya mahsulotlar</span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}