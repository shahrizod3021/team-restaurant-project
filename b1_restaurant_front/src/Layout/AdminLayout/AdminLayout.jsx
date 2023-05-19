import React, {useEffect, useState} from "react";
import {Outlet} from "react-router-dom";
import {GetColor, Tekshirish} from "../../Services/service.js";
import {NotFoundPage} from "../../Component/NotFoundPage.jsx";
import {SideBar} from "../../Component/SideBar.jsx";
import {Navbar} from "../../Component/Navbar.jsx";
import {set} from "mdb-ui-kit/src/js/mdb/perfect-scrollbar/lib/css.js";
import {Footer} from "../../Component/Footer.jsx";
import {Loading} from "../../Component/Loading.jsx";

export const AdminLayout = () => {
    const [user, setUser] = useState('')
    const [color, setColor] = useState({})
    const [load, setLoad] = useState(false)
    const tekshir = async () => {
        await Tekshirish(setUser)
    }

    const getColor = async () => {
        await GetColor(setColor, localStorage.getItem("uuid"))
    }

    useEffect(() => {
        getColor()
        tekshir()
    }, [])
    return (
        <div style={{height: "auto", backgroundColor: `${color.bgColor}`}}>

            {user.length === 0 ? (
                <>
                    <NotFoundPage/>
                </>
            ) : (
                <>
                    <SideBar/>
                    <main style={{marginTop: "58px"}}>
                        <div className={"container pt-4"}>
                            <Outlet/>
                        </div>
                        <Footer/>
                    </main>

                </>
            )}
        </div>
    )
}