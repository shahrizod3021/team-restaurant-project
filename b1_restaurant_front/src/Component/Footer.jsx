import {useEffect, useState} from "react";
import {GetColor} from "../Services/service.js";

export const Footer = () =>{
    const [color, setColor] = useState({})

    const getColor = async () => {
        await GetColor(setColor, localStorage.getItem("uuid"))
    }

    useEffect(() => {
        getColor()
    }, [])
    return (
        <div className={"footer"} style={{backgroundColor:`${color.bgColor}`, bottom:"0", position:"fixed", width:"90%",  boxShadow: "1px 1px 10px 1px black"}}>
            <div className={"descFooter"}>
                <div className={"d-flex align-items-center"}>
                    <h1 className={"text-primary col-10"}>Restaurant</h1>
                    <h6 className={"col-2"} style={{color:`${color.textColor}`}}>+998 98 000 97 92</h6>
                </div>
            </div>
            <div className={"mobileFooter"} style={{backgroundColor:`${color.bgColor}`}}>
                <h1 className={"text-center"}>Restaurant</h1>
            </div>

        </div>
    )
}