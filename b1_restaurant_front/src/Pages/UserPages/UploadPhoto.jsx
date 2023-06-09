import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {GetOneUser, PhotoUpload} from "../../Services/service.js";
import axios from "axios";
import {BASE_URL} from "../../Services/BaseUrl.js";
import {Apis} from "../../Services/Apis.js";

export const UploadPhoto = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState({})
    const getOne = async () => {
        await GetOneUser(localStorage.getItem("uuid"), setUser)
    }
    useEffect(() => {
        getOne()
    }, [])
    const uploadFile = async (e) => {
        let rasm = document.getElementById("rasm").files[0]
        const formData = new FormData()
        formData.append("photo", rasm);
        await PhotoUpload(formData);
        const photoId = localStorage.getItem("photoId");
        await axios.put(BASE_URL + Apis.userUpload + localStorage.getItem("uuid") + "?photoId=" + photoId)
       await getOne()
    }


    return (
        <div style={{height: '100vh'}} className={"w-100 d-flex align-items-center justify-content-center flex-column"}>
            {user.photoId === null ? (
                <>
                    <div className={"col-4"} style={{height: '16%', borderStyle: 'dashed'}}>
                        <label className={"w-100 d-flex flex-column"} style={{height: '100%'}} htmlFor={"rasm"}>
                            <h2 className={"text-center"}>upload photo</h2>
                            <i className="bi bi-cloud-arrow-up" style={{textAlign: 'center', fontSize: '52px'}}/>
                        </label>
                        <input type="file" className={"d-none"} id={"rasm"} name={"rasm"}
                               onChange={(e) => uploadFile(e)}/>
                    </div>
                </>
            ) : (
                <>
                    <img src={Apis.getPhoto + user.photoId} alt="" width={"25%"} height={"200vh"}/>
                </>
            )}

            <div className={"col-4 d-flex align-items-center justify-content-center mt-3"}>
                <Link to={"/auth/user"} className={"link-info m-3"}>o'tkazib yuborish</Link>
                <button
                    className={localStorage.getItem("photoId") ? "btn btn-primary m-3" : "btn btn-primary m-3 disabled"}
                    onClick={() => navigate("/auth/user")}>keyingi
                </button>
            </div>
        </div>)
}