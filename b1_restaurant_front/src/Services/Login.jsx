import React, {useState} from "react";
import {Loginjon} from "./service.js";
import {useNavigate} from "react-router-dom";
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
        <div className={"container"}>
            <div className="card card-authentication1 mx-auto my-5">
                <div className="card-body">
                    <div className="card-content p-2">
                        <div className="card-title text-uppercase text-center py-3">Sign In</div>
                        <form>
                            <div className="form-group">
                                <label htmlFor="phoneNumber" className="sr-only">phoneNumber</label>
                                <div className="position-relative has-icon-right">
                                    <input type="number" id="phoneNumber" className="form-control input-shadow" name={"phoneNumber"}
                                           placeholder="enter phonen number" value={phoneNumber} onChange={e=> setPhoneNumber(e.target.value)}/>
                                        <div className="form-control-position">
                                            <i className="icon-user"></i>
                                        </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password" className="sr-only">Password</label>
                                <div className="position-relative has-icon-right">
                                    <input type="password" id="password" name={"password"}
                                           className="form-control input-shadow" placeholder="Enter Password" value={password} onChange={e => setPassword(e.target.value)}/>
                                        <div className="form-control-position">
                                            <i className="icon-lock"></i>
                                        </div>
                                </div>
                            </div>
                            <button type="button" className="btn btn-light btn-block" onClick={() => login()}>Sign In</button>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    )
}