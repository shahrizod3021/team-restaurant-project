import {useEffect, useState} from "react";
import {Check} from "../../Services/service.js";
import {NotFoundPage} from "../../Component/NotFoundPage.jsx";
import {Outlet} from "react-router-dom";

export const OneUser = () => {
    const[user, setUser] = useState('')
    const tekshirjon = async () => {
        await Check(setUser)
    }

    useEffect(() => {
        tekshirjon()
    }, [])
    return(
        <div>
            {user.length !== 0 ? (
                <>
                    <h1>qozi</h1>

                </>
            ) : (
                <>
                    <NotFoundPage/>
                </>
            )}
        </div>
    )
}