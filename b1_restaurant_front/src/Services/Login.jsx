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
        <div className={"container-fluid page-body-wrapper full-page-wrapper"}>
            <div className="row w-100 m-0">
                <div className="content-wrapper full-page-wrapper d-flex align-items-center auth login-bg">
                    <div className="card col-lg-4 mx-auto">
                        <div className="card-body px-5 py-5">
                            <h3 className="card-title text-left mb-3">Login</h3>
                            <form>
                                <div className="form-group">
                                    <label>Phone Number </label>
                                    <input type="number" className="form-control p_input" id={"phoneNumber"} name={"phoneNumber"} placeholder={"enter phone number"} value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)}/>
                                </div>
                                <div className="form-group">
                                    <label>Password *</label>
                                    <input type="password" className="form-control p_input" placeholder={"enter password"} id={"password"} name={"password"} value={password} onChange={e => setPassword(e.target.value)} required/>
                                </div>
                                <div className="text-center">
                                    <button type="button" className="btn btn-primary btn-block enter-btn" onClick={() => login()}>Login</button>
                                </div>
                                <p className="sign-up">Don't have an Account?<Link to="/auth/register"> Sign Up</Link></p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}