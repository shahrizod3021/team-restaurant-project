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
        <div className="container-scroller loginjon">
            <div className={"container-fluid page-body-wrapper full-page-wrapper"}>
                <div className={"row w-100 m-0 "}>
                    <div className={"content-wrapper d-flex align-items-center auth login-bg "}>
                        <div className={"card col-lg-4 mx-auto"}>
                            <div className={"card-body px-5 py-5"}>
                                <h3 className={"card-title text-start mb-3"}>Login</h3>
                                <form >
                                    <div className={"form-group"}>
                                        <label htmlFor="phoneNumber">Telefon raqam</label>
                                        <input type="number" placeholder={"Telefon raqam kiriting"} className={"form-control"} id={"phoneNumber"} name={"phoneNumber"}
                                               value={phoneNumber} onChange={e=> setPhoneNumber(e.target.value)}
                                        />
                                    </div>
                                    <div className={"form-group"}>
                                        <label htmlFor="password">Parol</label>
                                        <input type="password" placeholder={"parolni kiriting"} id={"password"} name={"password"} className={"form-control"} value={password} onChange={e => setPassword(e.target.value)}/>
                                    </div>
                                    <div className={"text-center"}>
                                        <button type={"button"} className={"btn btn-primary btn-block "} onClick={() => login()}>Sign In</button>
                                    </div>
                                </form>
                                <p className={"sign-up text-center text-light"}>
                                    "Sizda accaunt mavjud emasmi?"
                                    <Link to="/auth/login">Sign Up</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}