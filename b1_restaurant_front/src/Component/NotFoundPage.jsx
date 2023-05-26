import {createRef, useRef, useState} from "react";
import copy from "copy-to-clipboard";
import {toast} from "react-toastify";
import {useScreenshot} from "use-react-screenshot";

export const NotFoundPage = () => {

    return (
        <div >
            <h1 className={"text-center text-danger"} >404</h1>
            <h3 className={"text-center text-danger"}>this is not found page</h3>


        </div>
    )
}