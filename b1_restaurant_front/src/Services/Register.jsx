import {useState} from "react";
import {Registerjon} from "./service.js";
import {Link, useNavigate} from "react-router-dom";
import '../assets/SideBar.css'
import banner from '../assets/banner.jpg'

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
        setName("")
        setSurname("")
        setPhoneNumber("")
        setPassword("")
        setTimeout(() => {
            navigate(localStorage.getItem("regyol"))
        }, 2000)
    }
    return (
        <div className="container-scroller registerjon">
            <div className={"container-fluid page-body-wrapper full-page-wrapper"}>
                <div className={"row w-100 m-0 "}>
                    <div className={"content-wrapper d-flex align-items-center auth login-bg "}>
                        <div className={"card col-lg-4 mx-auto"}>
                            <div className={"card-body px-5 py-5"}>
                                <h3 className={"card-title text-start mb-3"}>Register</h3>
                                <form>
                                    <div className={"form-group"}>
                                        <label htmlFor="name">Ism</label>
                                        <input type="text" placeholder={"Ismingizni kiriting"}
                                               className={"form-control"} id={"name"} name={"name"}
                                               value={name} onChange={e => setName(e.target.value)}
                                        />
                                    </div>
                                    <div className={"form-group"}>
                                        <label htmlFor="surname">Familya</label>
                                        <input type="text" placeholder={"Familyangizni kiriting"}
                                               className={"form-control"} id={"surname"} name={"surname"}
                                               value={surname} onChange={e => setSurname(e.target.value)}
                                        />
                                    </div>
                                    <div className={"form-group"}>
                                        <label htmlFor="phoneNumber">Telefon raqam</label>
                                        <input type="number" placeholder={"Telefon raqam kiriting"}
                                               className={"form-control"} id={"phoneNumber"} name={"phoneNumber"}
                                               value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)}
                                        />
                                    </div>
                                    <div className={"form-group"}>
                                        <label htmlFor="password">Parol</label>
                                        <input type="password" placeholder={"parol kiriting "} id={"password"}
                                               name={"password"} className={"form-control mb-4"} value={password}
                                               onChange={e => setPassword(e.target.value)}/>
                                    </div>
                                    <div className={"text-center"}>
                                        <button type={"button"} className={"btn btn-primary btn-block "}
                                                onClick={() => register()}>Sign Up
                                        </button>
                                    </div>
                                </form>
                                <p className={"sign-up text-center text-light"}>
                                    "Sizda oldinda accaunt mavjudmi?"
                                    <Link to="/auth/login">Sign in</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}