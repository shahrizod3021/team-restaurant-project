import {useState} from "react";
import {Registerjon} from "./service.js";
import {useNavigate} from "react-router-dom";

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
        <div>
            <div className="card card-authentication1 mx-auto my-4">
                <div className="card-body">
                    <div className="card-content p-2">
                        <div className="text-center">
                            <img src="assets/images/logo-icon.png" alt="logo icon"/>
                        </div>
                        <div className="card-title text-uppercase text-center py-3">Sign Up</div>
                        <form>
                            <div className="form-group mb-2">
                                <label htmlFor="name" className="sr-only">Name</label>
                                <div className="position-relative has-icon-right">
                                    <input type="text" id="name" name={"name"} className="form-control input-shadow"
                                           placeholder="Enter Your Name" value={name} onChange={e=> setName(e.target.value)}/>
                                        <div className="form-control-position">
                                            <i className="icon-user"></i>
                                        </div>
                                </div>
                            </div>
                            <div className="form-group mb-2">
                                <label htmlFor="surname" className="sr-only">Email ID</label>
                                <div className="position-relative has-icon-right">
                                    <input type="text" id="surname" name={"surname"} className="form-control input-shadow"
                                           placeholder="Enter Your last name " value={surname} onChange={e=> setSurname(e.target.value)}/>
                                        <div className="form-control-position">
                                            <i className="icon-envelope-open"></i>
                                        </div>
                                </div>
                            </div>
                            <div className="form-group mb-2">
                                <label htmlFor="password" className="sr-only">Password</label>
                                <div className="position-relative has-icon-right">
                                    <input type="password" id="password" className="form-control input-shadow"
                                           placeholder="enter password" value={password} onChange={e=> setPassword(e.target.value)}/>
                                        <div className="form-control-position">
                                            <i className="icon-lock"></i>
                                        </div>
                                </div>
                            </div>
                            <div className="form-group mb-2">
                                <label htmlFor="phoneNumber"  className="sr-only">Password</label>
                                <div className="position-relative has-icon-right">
                                    <input type="text" id="phoneNumber" name={"phoneNumber"} className="form-control input-shadow"
                                           placeholder="enter phoneNumber"  value={phoneNumber} onChange={e=> setPhoneNumber(e.target.value)}/>
                                    <div className="form-control-position">
                                        <i className="icon-lock"></i>
                                    </div>
                                </div>
                            </div>


                            <button type="button" className="btn btn-light btn-block waves-effect waves-light" onClick={() => register()}>Sign Up
                            </button>


                        </form>
                    </div>
                </div>

            </div>
        </div>
    )
}