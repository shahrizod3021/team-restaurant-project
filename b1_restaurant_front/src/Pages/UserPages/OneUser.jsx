import {useEffect, useState} from "react";
import {Check, EditUser, GetOneUser, PhotoUpload} from "../../Services/service.js";
import {NotFoundPage} from "../../Component/NotFoundPage.jsx";
import {Link, Outlet} from "react-router-dom";
import {Apis} from "../../Services/Apis.js";
import {Loading} from "../../Component/Loading.jsx";
import '../../assets/SideBar.css'
import {toast} from "react-toastify";
import axios from "axios";
import {BASE_URL} from "../../Services/BaseUrl.js";
import logo from '../../assets/person.png'

export const OneUser = () => {
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState({})
    const [display, setDisplay] = useState(false)
    const [display1, setDisplay1] = useState(false)
    const [display2, setDisplay2] = useState(false)
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')


    const tekshirjon = async () => {
        await GetOneUser(localStorage.getItem("uuid"), setUser)
        setLoading(true)
    }
    useEffect(() => {
        tekshirjon()
    }, [])

    const editUser = async () => {
        const data = {
            name, surname, phoneNumber, password: ""
        }
        await EditUser(user.id, data)
        setDisplay(false)
        setDisplay1(false)
        setDisplay2(false)
        tekshirjon()
    }
    const uploadPhoto = async () => {
        let rasm = document.getElementById("rasm").files[0]
        const formData = new FormData()
        formData.append("photo", rasm);
        await PhotoUpload(formData);
        const photoId = localStorage.getItem("photoId");
        try {
            await axios.put(BASE_URL + Apis.userUpload + user.id + "?photoId=" + photoId)
            toast.success("rasm saqlandi", {position: "top-center"})
            setTimeout(() => (
                window.location.reload()
            ), 1000)
        } catch (err) {
            toast.error("rasm saqlashda hatolik")
        }
    }


    return (
        <div>
            {loading ? (
                <>
                    <div className={'myAccount card'}>
                        <div className="row">
                            <div className="card-header">
                                <div className="bg-image " data-mdb-toggle="modal" data-mdb-target="#uploadPhoto"
                                     data-mdb-ripple-color="light">
                                    {user.photoId === null ? (
                                        <>
                                            <img src={logo} alt="logo" className={"w-50"}/>
                                        </>
                                    ) : (
                                        <>
                                            <img src={Apis.getPhoto + user.photoId}
                                                 className="w-50" alt={user.name}/>
                                        </>
                                    )}

                                    <a href="#">
                                        <div className="mask"
                                             style={{width: "50%"}}>
                                            <div className="d-flex justify-content-center align-items-center h-100">
                                            </div>
                                        </div>
                                        <div className="hover-overlay">
                                            <div className="mask"
                                                 style={{backgroundColor: "hsla(0, 0%, 0%, 0.4)", width: "50%"}}>
                                                <h1 style={{lineHeight: "50vh"}} className={"text-light text-center "}>
                                                    <i
                                                        className="bi bi-camera"></i></h1>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                            <div className={'card-body'}>
                                <div className={'d-flex align-items-center mb-5'}>
                                    {display ? (
                                        <>
                                            <h1 className={"text-light card-title me-2"}>Ism</h1>
                                            <form>
                                                <input type="text" className={"form-control mb-3"}
                                                       placeholder={user.name}
                                                       value={name} onChange={e => setName(e.target.value)}/>
                                            </form>
                                            <button onClick={() => editUser()}
                                                    className={'border-0 bg-transparent text-warning mb-3'}><i
                                                className={"bi-pencil mb-2"}></i></button>
                                        </>
                                    ) : (
                                        <>
                                            <h3 className={"text-light card-title me-4"}>Ism: <span
                                                className={"text-warning"}>{user.name}</span></h3>
                                            <button onClick={() => setDisplay(true)}
                                                    className={'border-0 bg-transparent text-warning mb-3'}><i
                                                className={"bi-pencil mb-2"}></i></button>
                                        </>
                                    )}
                                </div>
                                <div className={'d-flex align-items-center mb-5'}>
                                    {display1 ? (
                                        <>
                                            <h1 className={"text-light card-title me-2"}>Familya</h1>
                                            <form>
                                                <input type="text" className={"form-control mb-3"}
                                                       placeholder={user.surname} value={surname}
                                                       onChange={e => setSurname(e.target.value)}/>
                                            </form>
                                            <button onClick={() => editUser()}
                                                    className={'border-0 bg-transparent text-warning mb-3'}><i
                                                className={"bi-pencil mb-2"}></i></button>
                                        </>
                                    ) : (
                                        <>
                                            <h3 className={"text-light card-title me-4"}>Familya: <span
                                                className={"text-warning"}>{user.surname}</span></h3>
                                            <button onClick={() => setDisplay1(true)}
                                                    className={'border-0 bg-transparent text-warning mb-3'}><i
                                                className={"bi-pencil mb-2"}></i></button>
                                        </>
                                    )}
                                </div>
                                <div className={'d-flex align-items-center mb-5'}>
                                    {display2 ? (
                                        <>
                                            <h1 className={"text-light card-title me-2"}>Telefon raqam</h1>
                                            <form>
                                                <input type="text" className={"form-control mb-3"}
                                                       placeholder={user.phoneNumber} value={phoneNumber}
                                                       onChange={e => setPhoneNumber(e.target.value)}/>
                                            </form>
                                            <button onClick={() => editUser()}
                                                    className={'border-0 bg-transparent text-warning mb-3'}><i
                                                className={"bi-pencil mb-2"}></i></button>
                                        </>
                                    ) : (
                                        <>
                                            <h3 className={"text-light card-title me-4"}>Telefon raqam: <span
                                                className={"text-warning"}>{user.phoneNumber}</span></h3>
                                            <button onClick={() => setDisplay2(true)}
                                                    className={'border-0 bg-transparent text-warning mb-3'}><i
                                                className={"bi-pencil mb-2"}></i></button>
                                        </>
                                    )}
                                </div>

                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <><Loading/></>
            )}
            <div className="modal fade" id="uploadPhoto" tabIndex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Rasmin taxrirlash</h1>
                            <button type="button" className="btn-close" data-mdb-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className={"col-12"} style={{height: '16%', borderStyle: 'dashed'}}>
                                {user.photoId === null ? (
                                    <>
                                        <label className={"w-100 d-flex flex-column"}
                                               style={{height: '100%'}} htmlFor={"rasm"}>
                                            <h2 className={"text-center"}>Rasmni joylang</h2>
                                            <i className="bi bi-cloud-arrow-up"
                                               style={{textAlign: 'center', fontSize: '52px'}}/>
                                        </label>
                                        <input type="file" className={"d-none"} id={"rasm"}
                                               name={"rasm"}
                                               onChange={() => uploadPhoto()}
                                               required/>
                                    </>
                                ) : (
                                    <>
                                        <label className={"w-100 d-flex flex-column"}
                                               style={{height: '100%'}} htmlFor={"rasm"}>
                                            <h2 className={"text-center"}>Rasmni taxrirlang</h2>
                                            <img src={Apis.getPhoto + user.photoId} alt=""/>
                                        </label>
                                        <input type="file" className={"d-none"} id={"rasm"}
                                               name={"rasm"}
                                               onChange={() => uploadPhoto()}
                                               required/>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
