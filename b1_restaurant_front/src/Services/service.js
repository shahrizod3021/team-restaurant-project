import {toast} from "react-toastify";
import {resStatus} from "../handler/ResponseStatus.js";
import {BASE_URL} from "./BaseUrl.js";
import axios from "axios";
import {Apis} from "./Apis.js";
import {NotFoundPage} from "../Component/NotFoundPage.jsx";
import React from "react";
import {set} from "mdb-ui-kit/src/js/mdb/perfect-scrollbar/lib/css.js";

export const Tekshirish = async (setUser) => {
    if (localStorage.getItem("pathjon") === "/auth/admin") {
        setUser(localStorage.getItem("pathjon"))
    }
}

export const GetOneUser = async (id, setUser) => {
    try {
        const res = await axios.get(BASE_URL + Apis.auth + "/" + id)
        if (resStatus(res.status)) {
            setUser(res.data)
        }
    } catch (err) {
    }
}
export const GetColor = async (setColor, id) => {
    try {
        const res = await axios.get(BASE_URL + Apis.color + "/" + id)
        if (resStatus(res.status)) {
            setColor(res.data)
        }
    } catch (err) {
    }
}

export const PhotoUpload = async (data) => {
    try {
        const res = await axios.post(BASE_URL + Apis.upload, data)
        if (resStatus(res.status)) {
            localStorage.setItem("photoId", res.data)
            localStorage.setItem("categoryPhoto", res.data)
            localStorage.setItem("productPhoto", res.data)
            localStorage.setItem("salePhoto", res.data)
        }
    } catch (err) {
        toast.error("rasm saqalshda hatolik")
    }
}

export const EditUser = async (id,data) => {
    if (data.name.trim().length === 0){
        data.name = "";
    }
    if (data.surname.trim().length === 0){
        data.surname = "";

    }
    if (data.phoneNumber.trim().length === 0){
        data.phoneNumber = "";

    }
    if (data.password.trim().length === 0){
        data.password = "";
    }
    if (data.name.trim().length === 0 && data.surname.trim().length === 0 && data.password.trim().length === 0 && data.phoneNumber.trim().length === 0){
        return toast.warning("ma'lumot kiritmadingiz", {position: "top-left"})
    }
    try {
        const res = await axios.put(BASE_URL + Apis.auth  + "/" + id, data)
        if (resStatus(res.status)){
            return toast.success(res.data.message);
        }
    }catch (err){
        toast.error("Taxrirlashda hatolik")
    }
}

export const AddProduct = async (id, name, description, price,) => {
    try {
        const res = await axios.post(BASE_URL + Apis.product + "?name=" + name + "&description=" + description + "&price=" + price + "&categoryId=" + id)
        localStorage.setItem("productId", res.data.id)
    } catch (err) {
        toast.error("Mahsulotni qo'shishda hatolik")
    }
}

export const Search = async (name) => {
    try {
        const res = await axios.post(BASE_URL + Apis.search + "?query=" + name)
        if (res.data.categoryId !== null) {
            localStorage.setItem("searchPath", "/category/" + res.data.categoryId)
            localStorage.setItem("searchItem", res.data.categoryId)
        } else if (res.data.products != null) {
            localStorage.setItem("searchPath", res.data.path)
        }
        return res.data.products
    } catch (err) {
        toast.error("qidirishda hatolik")
    }
}

export const Ordering = async (id, howMuch, price, productId, aksiyaId) => {
    if (productId === 0) {
        productId = 0
    }
    if (aksiyaId === 0) {
        aksiyaId = 0;
    }
    try {
        const res = await axios.post(BASE_URL + Apis.order + "?id=" + id + "&howMuch="+howMuch + "&allPrice=" + price + "&product=" + productId + "&sale=" + aksiyaId)
        toast.success(res.data.message, {position : "top-center"})
    } catch (err) {
        toast.error("zakaz qilishda hatolik", {position: "top-center"})
    }
}

export const GetHistory = async (setData) => {
    try {
        const res = await axios.get(BASE_URL + Apis.history + "/list")
        setData(res.data)
    }catch (err){
        toast.error("Arxivlarni olib kelib bo'lmadi")
    }
}

export const AddToBasket = async (uuid, productId, saleId) => {
    try {
        const res = await axios.post(BASE_URL + Apis.basket + "?uuid=" + uuid + "&product=" + productId + "&sale="+ saleId)
        if (resStatus(res.status)){
            return toast.success(res.data.message, {position: "top-center"})
        }
    }catch (err){
        toast.warning(err.response.data.message, {position:"top-center"})
    }
}
export const GetBasket = async (id, setData) => {
    try {
        const res = await axios.get(BASE_URL + Apis.basket + "/" + id)
        setData(res.data)
    }catch (err){

    }
}
export const DeleteFromBasket = async(uuid, productId, saleId) =>{
    try {
        const res =await axios.delete(BASE_URL +Apis.basket + "?userId=" + uuid + "&productId=" + productId + "&saleId=" + saleId)
        if (resStatus(res.status)){
            return toast.dark(res.data.message)
        }
    }catch (err){
        toast.error(err.message)
    }
}
export const GetCategory =async () => {
      const res = await axios.get(BASE_URL + Apis.category + "/list")
    return res.data
}

export const DeleteProduct = async (id) => {
    try {
        const res = await axios.delete(BASE_URL + Apis.product + "/" + id)
        toast.success(res.data.message)
    } catch (err) {

    }
}

export const EditProduct = async (id, name, description, price) => {
    if (name.trim().length === 0) {
        name = ""
    }
    if (description.trim().length === 0) {
        description = ""
    }
    if (price.trim().length === 0) {
        price = 0
    }
    try {
        const res = await axios.put(BASE_URL + Apis.product + "/" + id + "?name=" + name + "&description=" + description + "&price=" + price)
        if (resStatus(res.status)) {
            toast.success(res.data.message)
        }
    } catch (err) {
        toast.error("Mahsulotni taxrirlashda hatolik")
    }

}

export const AddSale = async (data) => {
    try {
        const res = await axios.post(BASE_URL + Apis.sale, data)
        localStorage.setItem("saleId", res.data.id)
    } catch (err) {
        toast.error(err.response.data.message)
    }
}
export const AddCategory = async (data) => {
    if (data.name.trim().length === 0) {
        return toast.warning("Ma'lumot bo'sh bo'lmasin")
    }
    try {
        const res = await axios.post(BASE_URL + Apis.category, data)
        if (resStatus(res.status)) {
            localStorage.setItem("categoryId", res.data.id)
        }
    } catch (err) {
        toast.error(err.response.data.message)
    }

}

export const EditCategory = async (data, id) => {
    if (data.name.trim().length === 0) {
        return toast.warning("ma'lumot bo'sh")
    }
    try {
        const res = await axios.put(BASE_URL + Apis.category + "/" + id, data)
        if (resStatus(res.status)) {
            toast.success(res.data.message)
        }
    } catch (err) {
        if (err.response.status === 409) {
            return toast.error(err.response.data.message)
        }
    }
}

export const DeleteCategory = async (id) => {
    try {
        const res = await axios.delete(BASE_URL + Apis.category + "/" + id)
        if (resStatus(res.status)) {
            return toast.success(res.data.message)
        }
    } catch (err) {
        if (err.response.status === 409) {
            return toast.error(err.response.data.message)
        }
    }
}
export const GetRestaurant = async (setRestaurant) => {
    try {
        const res = await axios.get(BASE_URL + Apis.restaurant)
        setRestaurant(res.data);
    } catch (err) {
    }
}

export const GetProduct = async (setData) =>{
    try {
        const res = await axios.get(BASE_URL + Apis.product + "/list")
        setData(res.data)
    }catch (err){
    }
}

export const GetOrder = async (setData) => {
    try {
        const res =await axios.get(BASE_URL + Apis.order + "/ordered")
        setData(res.data)
    }catch (err){

    }
}
export const GetUnOrder = async (setData) => {
    try {
        const res = await axios.get(BASE_URL + Apis.order + "/list")
        setData(res.data)
    }catch (err){

    }
}

export const GetSale = async (setData) =>{
    try {
        const res = await axios.get(BASE_URL + Apis.sale + "/list")
        setData(res.data)
    }catch (err){

    }
}

export const GetMessage = async (setData) => {
    try {
        const res = await axios.get(BASE_URL + Apis.message + "/list")
        setData(res.data)
    }catch (err){

    }
}

export const Check = async (setUser) => {
    if (localStorage.getItem("regyol") !== null) {
        setUser(localStorage.getItem("regyol"))
    }
}
export const Loginjon = async (data) => {
    const check = {
        password: data.password.trim().length === 0,
        phoneNumber: data.phoneNumber.length === 0,
    }
    if (check.password || check.phoneNumber) {
        return toast.warning("ma'lumot bo'sh")
    }
    try {
        const res = await axios.post(BASE_URL + Apis.auth + "/login", data)
        if (resStatus(res.status)) {
            localStorage.setItem("pathjon", res.data.path)
            localStorage.setItem("regyol", res.data.path)
            localStorage.setItem("uuid", res.data.user.id)
            return toast.success("Hush kelibsiz " + res.data.user.name)
        }
    } catch (err) {
        if (err.response.status === 403) {
            localStorage.setItem("pathjon", "/auth/login")
            return toast.error("Ma'lumotlarni kiritishda hatolik. Iltimos qaytadan urunib ko'ring")
        }
    }
}

export const Registerjon = async (data) => {
    const check = {
        password: data.password.trim().length === 0,
        phoneNumber: data.phoneNumber.length === 0,
        name: data.name.trim().length === 0,
        surname: data.surname.trim().length === 0,
    }
    if (check.name || check.surname || check.phoneNumber || check.password) {
        localStorage.setItem("regyol", "/auth/register")
        return toast.warning("ma'lumot bo'sh")
    }
    try {
        const res = await axios.post(BASE_URL + Apis.auth + "/register", data)
        if (resStatus(res.status)) {
            localStorage.setItem("uuid", res.data.user.id)
            localStorage.setItem("regyol", res.data.path)
            localStorage.setItem("pathjon",res.data.path)
            return toast("registratsiyadan muvaffaqiyatli o'tdingiz")
        }
    } catch (err) {
        if (err.response.status === 409 || err.response.status === 404) {
            localStorage.setItem("regyol", "/auth/register")
            return toast.error("registratsiyada hatolik")
        }
        if (err.response.status === 500) {
            localStorage.setItem("regyol", "/auth/register")
            return toast.error("bunday telefon raqam bizning bazada mavjud boshqa telefon raqam orqali registratsiyadan o'tishga harakat qilib ko'ring")
        }
    }
}