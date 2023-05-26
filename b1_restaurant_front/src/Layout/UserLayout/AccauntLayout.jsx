import {UserSideBar} from "../../Component/UserSideBar.jsx";
import {Outlet} from "react-router-dom";
import {useEffect, useState} from "react";
import {Check} from "../../Services/service.js";
import {NotFoundPage} from "../../Component/NotFoundPage.jsx";
import {Register} from "../../Services/Register.jsx";

export const AccauntLayout = () => {
    const[user, setUser] = useState('')
    const tekshirjon = async () => {
        await Check(setUser)
    }

    useEffect(() => {
        tekshirjon()
    }, [])
    return (
        <div>
            {user.length === 0 ? (
                <>
                    <Register/>
                </>
            ) : (
                <>
                    <UserSideBar/>
                    <main style={{marginTop:"58px"}}>
                        <div className={"container pt-4"}>
                            <Outlet/>
                        </div>
                    </main>

                </>
            )}

        </div>
    )
}