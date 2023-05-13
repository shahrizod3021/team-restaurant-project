import React, {useState} from "react";
import {Loginjon} from "./service.js";
import {Link, useNavigate} from "react-router-dom";
export const Login = () => {
    const [phoneNumber, setPhoneNumber] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const login = async  () => {
        const data = {
            phoneNumber,password
        }
        await Loginjon(data)
        setTimeout(() => {
            navigate(localStorage.getItem("pathjon"))
        }, 2000)
    }

    return (
        <div className={"container-fluids"}>

        </div>
    )
}