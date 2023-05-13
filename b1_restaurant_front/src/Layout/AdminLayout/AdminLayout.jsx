import React, {useEffect, useState} from "react";
import {Outlet} from "react-router-dom";
import {Tekshirish} from "../../Services/service.js";
import {NotFoundPage} from "../../Component/NotFoundPage.jsx";
import {SideBar} from "../../Component/SideBar.jsx";
import {Navbar} from "../../Component/Navbar.jsx";
export const AdminLayout = () => {
    const [user, setUser] =useState('')

const tekshir = async () => {
    await Tekshirish(setUser)
}
useEffect(() => {
    tekshir()
}, [])
    return(
        <div>
            {user.length === 0 ? (
                <>
                    <NotFoundPage/>
                </>
            ) : (
                <>
                    <SideBar/>
                    <div className={"container-fluid page-body-wrapper"}>
                        <Navbar/>
                        <Outlet/>
                    </div>
                </>
            )}
        </div>
    )
}