import myPhoto from '../assets/images/shahrizod.jpg'
import logo from '../assets/images/logo-mini.svg'
import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {GetOneUser} from "../Services/service.js";
export const Navbar = () => {
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
            <nav className="navbar p-0 fixed-top d-flex flex-row">
                <div className="navbar-brand-wrapper d-flex d-lg-none align-items-center justify-content-center">
                    <Link className="navbar-brand brand-logo-mini" to={'/auth/admin'}><img src={logo}
                                                                                       alt="logo"/></Link>
                </div>
                <div className="navbar-menu-wrapper flex-grow d-flex align-items-stretch">
                    <button className="navbar-toggler navbar-toggler align-self-center" type="button"
                            data-toggle="minimize">
                        <span className="mdi mdi-menu"></span>
                    </button>
                    <ul className="navbar-nav w-100">
                        <li className="nav-item w-100">
                            <form className="nav-link mt-2 mt-md-0 d-none d-lg-flex search">
                                <input type="text" className="form-control" placeholder="Search products"/>
                            </form>
                        </li>
                    </ul>
                    <ul className="navbar-nav navbar-nav-right">
                        <li className="nav-item dropdown d-none d-lg-block">
                            <a className="nav-link btn btn-success create-new-button" id="createbuttonDropdown"
                               data-toggle="dropdown" aria-expanded="false" href="#">+ Create somthing</a>
                            <div className="dropdown-menu dropdown-menu-right navbar-dropdown preview-list"
                                 aria-labelledby="createbuttonDropdown">
                                <h6 className="p-3 mb-0">Projects</h6>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item preview-item">
                                    <div className="preview-thumbnail">
                                        <div className="preview-icon bg-dark rounded-circle">
                                            <i className="mdi mdi-web text-primary"></i>
                                        </div>
                                    </div>
                                    <div className="preview-item-content">
                                        <p className="preview-subject ellipsis mb-1">Filial qo'shish</p>
                                    </div>
                                </a>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item preview-item">
                                    <div className="preview-thumbnail">
                                        <div className="preview-icon bg-dark rounded-circle">
                                            <i className="mdi mdi-account-plus text-info"></i>
                                        </div>
                                    </div>
                                    <div className="preview-item-content">
                                        <p className="preview-subject ellipsis mb-1">Admin yaratish</p>
                                    </div>
                                </a>
                                <div className="dropdown-divider"></div>

                            </div>
                        </li>
                        <li className="nav-item nav-settings d-none d-lg-block">
                            <a className="nav-link" href="#">
                                <i className="mdi mdi-view-grid"></i>
                            </a>
                        </li>
                        <li className="nav-item dropdown border-left">
                            <a className="nav-link count-indicator dropdown-toggle" id="messageDropdown" href="#"
                               data-toggle="dropdown" aria-expanded="false">
                                <i className="mdi mdi-email"></i>
                                <span className="count bg-success"></span>
                            </a>
                            <div className="dropdown-menu dropdown-menu-right navbar-dropdown preview-list"
                                 aria-labelledby="messageDropdown">
                                <h6 className="p-3 mb-0">Messages</h6>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item preview-item">
                                    <div className="preview-thumbnail">
                                        <img src={myPhoto} alt="image"
                                             className="rounded-circle profile-pic"/>
                                    </div>
                                    <div className="preview-item-content">
                                        <p className="preview-subject ellipsis mb-1">Mark send you a message</p>
                                        <p className="text-muted mb-0"> 1 Minutes ago </p>
                                    </div>
                                </a>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item preview-item">
                                    <div className="preview-thumbnail">
                                        <img src={myPhoto} alt="image"
                                             className="rounded-circle profile-pic"/>
                                    </div>
                                    <div className="preview-item-content">
                                        <p className="preview-subject ellipsis mb-1">Cregh send you a message</p>
                                        <p className="text-muted mb-0"> 15 Minutes ago </p>
                                    </div>
                                </a>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item preview-item">
                                    <div className="preview-thumbnail">
                                        <img src={myPhoto} alt="image"
                                             className="rounded-circle profile-pic"/>
                                    </div>
                                    <div className="preview-item-content">
                                        <p className="preview-subject ellipsis mb-1">Profile picture updated</p>
                                        <p className="text-muted mb-0"> 18 Minutes ago </p>
                                    </div>
                                </a>
                                <div className="dropdown-divider"></div>
                                <p className="p-3 mb-0 text-center">4 new messages</p>
                            </div>
                        </li>
                        <li className="nav-item dropdown border-left">
                            <a className="nav-link count-indicator dropdown-toggle" id="notificationDropdown" href="#"
                               data-toggle="dropdown">
                                <i className="mdi mdi-bell"></i>
                                <span className="count bg-danger"></span>
                            </a>
                            <div className="dropdown-menu dropdown-menu-right navbar-dropdown preview-list"
                                 aria-labelledby="notificationDropdown">
                                <h6 className="p-3 mb-0">Notifications</h6>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item preview-item">
                                    <div className="preview-thumbnail">
                                        <div className="preview-icon bg-dark rounded-circle">
                                            <i className="mdi mdi-calendar text-success"></i>
                                        </div>
                                    </div>
                                    <div className="preview-item-content">
                                        <p className="preview-subject mb-1">Event today</p>
                                        <p className="text-muted ellipsis mb-0"> Just a reminder that you have an event
                                            today </p>
                                    </div>
                                </a>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item preview-item">
                                    <div className="preview-thumbnail">
                                        <div className="preview-icon bg-dark rounded-circle">
                                            <i className="mdi mdi-settings text-danger"></i>
                                        </div>
                                    </div>
                                    <div className="preview-item-content">
                                        <p className="preview-subject mb-1">Settings</p>
                                        <p className="text-muted ellipsis mb-0"> Update dashboard </p>
                                    </div>
                                </a>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item preview-item">
                                    <div className="preview-thumbnail">
                                        <div className="preview-icon bg-dark rounded-circle">
                                            <i className="mdi mdi-link-variant text-warning"></i>
                                        </div>
                                    </div>
                                    <div className="preview-item-content">
                                        <p className="preview-subject mb-1">Launch Admin</p>
                                        <p className="text-muted ellipsis mb-0"> New admin wow! </p>
                                    </div>
                                </a>
                                <div className="dropdown-divider"></div>
                                <p className="p-3 mb-0 text-center">See all notifications</p>
                            </div>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link" id="profileDropdown" href="#" data-toggle="dropdown">
                                <div className="navbar-profile">
                                    <img className="img-xs rounded-circle" src={myPhoto} alt=""/>
                                        <p className="mb-0 d-none d-sm-block navbar-profile-name">{user.name} {user.surname}</p>
                                        <i className="mdi mdi-menu-down d-none d-sm-block"></i>
                                </div>
                            </a>
                            <div className="dropdown-menu dropdown-menu-right navbar-dropdown preview-list"
                                 aria-labelledby="profileDropdown">
                                <h6 className="p-3 mb-0">Profile</h6>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item preview-item">
                                    <div className="preview-thumbnail">
                                        <div className="preview-icon bg-dark rounded-circle">
                                            <i className="mdi mdi-settings text-success"></i>
                                        </div>
                                    </div>
                                    <div className="preview-item-content">
                                        <p className="preview-subject mb-1">Settings</p>
                                    </div>
                                </a>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item preview-item">
                                    <div className="preview-thumbnail">
                                        <div className="preview-icon bg-dark rounded-circle">
                                            <i className="mdi mdi-logout text-danger"></i>
                                        </div>
                                    </div>
                                    <div className="preview-item-content">
                                        <p className="preview-subject mb-1">Log out</p>
                                    </div>
                                </a>
                                <div className="dropdown-divider"></div>
                                <p className="p-3 mb-0 text-center">Advanced settings</p>
                            </div>
                        </li>
                    </ul>
                    <button className="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button"
                            data-toggle="offcanvas">
                        <span className="mdi mdi-format-line-spacing"></span>
                    </button>
                </div>
            </nav>
        </div>
    )
}