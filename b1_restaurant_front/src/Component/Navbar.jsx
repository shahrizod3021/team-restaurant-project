
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
            qozi
        </div>
    )
}