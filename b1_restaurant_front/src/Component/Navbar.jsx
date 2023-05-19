
import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {GetOneUser} from "../Services/service.js";
import sale from '../assets/download.png'
export const Navbar = () => {
    const [user, setUser] = useState('')
    const id = localStorage.getItem("uuid")
    const [icon, setIcon] = useState(true)
    // const oneUser = async  () =>{
    //     await GetOneUser(id, setUser)
    // }
    // useEffect(() => {
    //     oneUser()
    // }, [])
    return (
        <div className={"navbar navbar-expand-lg navbar-light "}>
            <div className={"container"}>
                <div>
                    {icon === true ? (
                        <>
                            <button style={{marginRight:"20px"}} className={"navbarCategory btn btn-outline-danger"} onClick={() => setIcon(false)}>Kategoriyalar <i style={{fontSize:"15px"}} className={"bi-list"}></i> </button>
                        </>
                    ) : (
                        <>
                            <button style={{marginRight:"20px"}}  className={'btn btn-danger'} onClick={() => setIcon(true)}>Kategoriyalar <i style={{fontSize:"15px"}} className={"bi-x-lg"}></i></button>
                        </>
                    )}
                    <button style={{height:"40px"}} className={'btn btn-outline-warning'}>Chegirma kategoriyalar <img
                        src={sale} alt="" width={"40"} height={"20"}/></button>
                </div>
                <div>
                    <Link to={"/"} className={"link-danger"}><i style={{fontSize:"25px"}} className={"bi-heart-fill"}></i></Link>
                    {user.length === 0 ? (
                        <>
                            <Link style={{marginLeft:"20px", fontSize:"25px"}} className="link-danger  me-3" to="/auth/register">
                                <i className="fas fa-shopping-cart"></i>
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link style={{marginLeft:"20px", fontSize:"25px"}} className="link-danger me-3 " to="/">
                                <i className="fas fa-shopping-cart"></i>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}