import {useState} from "react";
import {Registerjon} from "./service.js";
import {Link, useNavigate} from "react-router-dom";

export const Register = () => {
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()
    const register = async () => {
        const data = {
            name, surname, phoneNumber, password
        }
        await Registerjon(data)
        navigate(localStorage.getItem("regyol"))
    }
    return (
        <div className="container-fluid">

        </div>
    )
}