import {toast} from "react-toastify";
import {resStatus} from "../handler/ResponseStatus.js";
import {BASE_URL} from "./BaseUrl.js";
import axios from "axios";
import {Apis} from "./Apis.js";
export const Tekshirish = async (setUser) => {
    if (localStorage.getItem("pathjon") === "/auth/admin"){
        setUser(localStorage.getItem("pathjon"))
    }
}

export const Check = async (setUser) => {
    if (localStorage.getItem("regyol") !== null){
        setUser(localStorage.getItem("regyol"))
    }
}
export const Loginjon = async (data) => {
    const check  = {
        password:data.password.trim().length === 0,
        phoneNumber:data.phoneNumber.length === 0,
    }
    if (check.password || check.phoneNumber){
        return toast.warning("ma'lumot bo'sh")
    }
    try {
        const res = await axios.post(BASE_URL + Apis.auth + "/login", data)
        if (resStatus(res.status)){
            localStorage.setItem("pathjon", res.data.path)
            localStorage.setItem("regyol",res.data.path)
            return toast.success("hush kelibsiz admin biroz kuting")
        }
    }catch (err){
        if (err.response.status === 403){
            localStorage.setItem("pathjon","/auth/login")
            return  toast.error("parol hato qaytadan uruning")
        }
    }
}

export const Registerjon = async (data) => {
    const check  = {
        password:data.password.trim().length === 0,
        phoneNumber:data.phoneNumber.length === 0,
        name:data.name.trim().length === 0,
        surname:data.surname.trim().length === 0,
    }
    if (check.name || check.surname || check.phoneNumber || check.password){
        return toast("ma'lumot bo'sh")
    }
    try {
        const res = await axios.post(BASE_URL + Apis.auth + "/register",data)
        if (resStatus(res.status)){
            localStorage.setItem("regyol",res.data.message)
            return toast("registratsiyadan muvaffaqiyatli o'tdingiz")
        }
    }catch (err){
        if (err.response.status === 409 || err.response.status === 404){
            localStorage.setItem("regyol","/auth/register")
            return toast.error("registratsiyada hatolik")
        }
    }
}