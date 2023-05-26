import {Link} from "react-router-dom";
import {Apis} from "../../Services/Apis.js";
import logo from '../../assets/download.png'
import {useEffect, useState} from "react";
import axios from "axios";
import {BASE_URL} from "../../Services/BaseUrl.js";
import {GetOneUser} from "../../Services/service.js";
import {Loading} from "../../Component/Loading.jsx";
import {resStatus} from "../../handler/ResponseStatus.js";
import {toast} from "react-toastify";

export const ContactUs = () => {
    const [phoneNumber, setPhoneNumber] = useState('')
    const [message, setMessage] = useState('')
    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(false)
    const [alert, setAlert] = useState(false)

    useEffect(() => {
        const getOneUser = async () => {
            await GetOneUser(localStorage.getItem("uuid"), setUser)
            setLoading(true)
        }
        getOneUser()
    }, [])
    const messaging = async () => {
        try {
            const res = await axios.post(BASE_URL + Apis.message + "?name=" + user.name + "&phoneNumber=" + phoneNumber + "&message=" + message + "&photoId=" + user.photoId)
            if (resStatus(res.status)) {
                setAlert(true)
            }
        } catch (err) {
            toast.error(err.message)
        }

    }
    return (
        <div>
            {loading ? (
                <>
                    <div id="banner" className="banner full-screen-mode parallax">
                        <div className="container">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <div className="banner-static">
                                    <div className="banner-text">
                                        <div className="banner-cell">
                                            <h1 className={"mb-0"}>Restaurant</h1>
                                            <h2 className={"mb-0"}>Bizga bo'glanish uchun pastda ko'rsatilgan
                                                ma'lumotlarni to'ldiring</h2>
                                            <div className="book-btn">
                                                <Link to={"/aboutus"} className="table-btn hvr-underline-from-center">Ko'roq
                                                    ma'lumot</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={"contactForm mb-10"}>
                        <form>
                            <label htmlFor="phoneNumber" className={"contactLabel"}>Telefon raqam</label>
                            <input type="text" id={"phoneNumber"} className={"form-control"}
                                   placeholder={"telefon raqam"}/>
                            <div className="form-floating mt-3">
                        <textarea className="form-control mb-3" placeholder="Leave a comment here" id="floatingTextarea2"
                                  style={{height: "100px"}} value={message} onChange={e => setMessage(e.target.value)}></textarea>
                                <label htmlFor="floatingTextarea2" className={"text-success"}>Fikr yoki shikoyatlar
                                    bo'lsa shu yerda qoldiring</label>
                            </div>
                            <div className="book-btn" >
                                <a onClick={() => messaging()} type={"button"} className="table-btn hvr-underline-from-center">Yuborish</a>
                            </div>
                        </form>
                        {alert ? (
                            <>
                                <div className="alert alert-success mt-3" role="alert">
                                    habar yuborildi
                                </div>
                                {setTimeout(() => {
                                    setAlert(false)
                                }, 5000)}
                            </>
                        ) : (
                            <>
                            </>
                        )}
                    </div>
                </>
            ) : (
                <><Loading/></>
            )}


        </div>
    )
}