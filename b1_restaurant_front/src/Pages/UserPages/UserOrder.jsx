import {useEffect, useState} from "react";
import axios from "axios";
import {BASE_URL} from "../../Services/BaseUrl.js";
import {Apis} from "../../Services/Apis.js";
import {Loading} from "../../Component/Loading.jsx";
import {Link} from "react-router-dom";

export const UserOrder = () => {
    const [loading, setLoading] = useState(false)
    const [myOrder, setMyOrder] = useState([])

    const getMyOrder = async () => {
        const res = await axios.get(BASE_URL + Apis.order + "/myOrder/" + localStorage.getItem("uuid"))
        setMyOrder(res.data)
        setLoading(true)
    }
    useEffect(() => {
        getMyOrder()
    }, [])


    return (
        <div>
            {loading ? (
                <>
                    <div className="row row-cols-1 row-cols-md-2 g-4">
                        {myOrder.length === 0 ? (
                            <>
                                <h3 className={"text-center text-danger"}>Sizda zakazlar mavjud emas</h3>
                            </>
                        ) : (
                            <>
                                {myOrder.map((item) => (
                                    <>
                                        <div className="col">
                                            <div className="card">
                                                {item.aksiya === null ? (
                                                    <>
                                                        <img height={"300vh"}
                                                             src={Apis.getPhoto + item.product.photoId}
                                                             className="card-img-top" alt="..."/>

                                                    </>
                                                ) : (
                                                    <>
                                                        <img height={"300vh"} src={Apis.getPhoto + item.aksiya.photoId}
                                                             className="card-img-top" alt="..."/>

                                                    </>
                                                )}
                                                <div className="card-body">
                                                    <h5 className="card-title">{item.name}</h5>
                                                    <p className="card-text text-warning">{item.allPrice} so'm</p>
                                                    <p className={"text-light"}>{item.kun}-kun : {item.oy}-oy : {item.yil+1900}: yil</p>
                                                </div>
                                                <div className={'card-footer'}>
                                                    {item.delivered === false ? (
                                                        <>
                                                            <h5 className={"card-text text-danger"}>Zakaz yetqazilinmagan</h5>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <h5 className={'card-text text-success'}>Zakaz yetqazilingan</h5>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                ))}

                            </>
                        )}
                    </div>
                </>
            ) : (
                <>
                    <Loading/>
                </>
            )}
        </div>

    )
}