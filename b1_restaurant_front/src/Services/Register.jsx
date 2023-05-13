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
        <div className="container-fluid page-body-wrapper full-page-wrapper">
            <div className="row w-100 m-0">
                <div className="content-wrapper full-page-wrapper d-flex align-items-center auth login-bg">
                    <div className="card col-lg-4 mx-auto">
                        <div className="card-body px-5 py-5">
                            <h3 className="card-title text-left mb-3">Register</h3>
                            <form>
                                <div className="form-group">
                                    <label>First Name</label>
                                    <input type="text" className="form-control p_input" id={"name"} name={"name"} value={name} onChange={e=> setName(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label>Last Name</label>
                                    <input type="text" className="form-control p_input" id={"surname"} name={"surname"} value={surname} onChange={e=> setSurname(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label>Phone Number</label>
                                    <input type="email" className="form-control p_input" id={"phoneNumber"} name={"phoneNumber"} value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <input type="password" className="form-control p_input" id={"password"} name={"password"} value={password} onChange={e=> setPassword(e.target.value)} />
                                </div>
                                <div className="text-center">
                                    <button type="button" className="btn btn-primary btn-block enter-btn" onClick={() => register()}>Sign Up</button>
                                </div>
                                <p className="sign-up text-center">Already have an Account?<Link to="/auth/login"> Sign In</Link></p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}