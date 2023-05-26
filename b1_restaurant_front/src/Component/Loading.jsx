import React from "react";
import '../assets/SideBar.css'
export const Loading = () => {
    return (
        <div>
            <div style={{height:"83.5vh"}} className={"w-100 div d-flex align-items-center justify-content-center"}>
                <span className={"span"} style={{backgroundColor: "#ef0000"}}></span>
                 <span className={"span"} style={{backgroundColor: "#0030ef"}}></span>
                 <span className={"span"} style={{backgroundColor: "#18ef00"}}></span>
                 <span className={"span"} style={{backgroundColor: "#efeb00"}}></span>
                 <span className={"span"} style={{backgroundColor: "#ef00c7"}}></span>
            </div>
        </div>
    )
}