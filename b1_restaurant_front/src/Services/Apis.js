import {BASE_URL} from "./BaseUrl.js";

export const Apis = {
    auth: "/auth",
    userUpload: '/auth/upload/',
    color: "/color",
    restaurant: "/restaurant",
    upload: '/attachment/upload',
    getPhoto: BASE_URL + '/attachment/download?id=',
    category: '/category',
    product: '/product',
    sale: '/sale',
    salProducts: '/sale/products',
    filial: '/filial/',
    search: '/search',
    order: '/order',
    basket: '/basket',
    history: '/history',
    message:'/message'
}