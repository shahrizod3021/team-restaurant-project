import {toast} from "react-toastify";
import {resStatus} from "../handler/ResponseStatus.js";
import {BASE_URL} from "./BaseUrl.js";
import axios from "axios";
import {Apis} from "./Apis.js";
import {NotFoundPage} from "../Component/NotFoundPage.jsx";
import React from "react";
import {set} from "mdb-ui-kit/src/js/mdb/perfect-scrollbar/lib/css.js";
export const Tekshirish = async (setUser) => {
    if (localStorage.getItem("pathjon") === "/auth/admin"){
        setUser(localStorage.getItem("pathjon"))
    }
}

export const GetOneUser = async  (id, setUser) => {
    try {
        const res = await axios.get(BASE_URL + Apis.auth + "/" + id)
        if (resStatus(res.status)){
            setUser(res.data)
        }
    }catch (err){

    }
}

export const GetColor = async (setColor, id) => {
    try {
        const res = await axios.get(BASE_URL + Apis.color + "/" + id)
        if (resStatus(res.status)){
            setColor(res.data)
        }
    }catch (err){
        toast.error("rangda hatolik")
    }
}

export const GetRestaurant = async (setRestaurant) => {
    try {
        const res  =await axios.get(BASE_URL + Apis.restaurant)
        setRestaurant(res.data);
    }catch (err){
        toast.error("internal error. Status code 500")
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
            localStorage.setItem("uuid",res.data.user.id)
            return toast.success("Hush kelibsiz " + res.data.user.name)
        }
    }catch (err){
        if (err.response.status === 403){
            localStorage.setItem("pathjon","/auth/login")
            return  toast.error("Ma'lumotlarni kiritishda hatolik. Iltimos qaytadan urunib ko'ring")
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
        localStorage.setItem("regyol","/auth/register")
        return toast.warning("ma'lumot bo'sh")
    }
    try {
        const res = await axios.post(BASE_URL + Apis.auth + "/register",data)
        if (resStatus(res.status)){
            localStorage.setItem("uuid",res.data.user.id)
            localStorage.setItem("regyol",res.data.path)
            return toast("registratsiyadan muvaffaqiyatli o'tdingiz")
        }
    }catch (err){
        if (err.response.status === 409 || err.response.status === 404){
            localStorage.setItem("regyol","/auth/register")
            return toast.error("registratsiyada hatolik")
        }
        if (err.response.status === 500){
            localStorage.setItem("regyol","/auth/register")
            return toast.error("bunday telefon raqam bizning bazada mavjud boshqa telefon raqam orqali registratsiyadan o'tishga harakat qilib ko'ring")
        }
    }
}