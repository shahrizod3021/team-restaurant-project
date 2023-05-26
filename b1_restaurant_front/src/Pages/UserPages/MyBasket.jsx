import React, {useEffect, useState} from "react";
import {DeleteFromBasket, GetBasket} from "../../Services/service.js";
import {Loading} from "../../Component/Loading.jsx";
import {Apis} from "../../Services/Apis.js";
import {useNavigate} from "react-router-dom";

export const MyBasket = () => {
    const [basket, setBasket] = useState({})
    const [loading, setLoading] = useState(false)
    const navigate  = useNavigate()
    const getBasket = async () => {
        await GetBasket(localStorage.getItem("uuid"),setBasket)
        setLoading(true)
    }
    useEffect(() => {
        getBasket()
    }, [])

    const deleteFromBasket = async  (id, saleId) =>{
        await DeleteFromBasket(localStorage.getItem("uuid"), id, saleId)
        getBasket()
    }
    return (
        <div>
            {loading ? (
                <>
                    {basket < 1  ? (
                        <>
                            <h1 className={"text-danger"}>Savatchangiz bo'sh</h1>
                        </>
                    ) : (
                        <>
                            <div>
                                <div className="row row-cols-1 row-cols-md-3 g-4">
                                    {basket.product.length === 0 ? (
                                        <>
                                            {basket.aksiya.map((item) => (
                                                <>
                                                    <div className="col">
                                                        <div className="card ">
                                                            <img src={Apis.getPhoto + item.photoId} style={{height: "40vh"}}
                                                                 className="card-img-top" alt="..."/>
                                                            <div className="card-body">
                                                                <h5 className="card-title">{item.name}</h5>
                                                                <p className={"text-success"}>{item.foyiz}%</p>
                                                                <div className={"d-flex"}>
                                                                    {item.products.map((item) => (
                                                                        <>
                                                                            <p className={"text-light"}>{item.name}/</p>
                                                                        </>
                                                                    ))}
                                                                    <button className={"btn btn-danger"} onClick={() => deleteFromBasket(0, item.id)}>savatchadan olib tashlash</button>
                                                                </div>
                                                            </div>
                                                            <div className="card-footer">
                                                                <small className="text-light">Mahsulot narxi: <span
                                                                    className={"text-warning"}>{item.allPrice} so'm</span></small>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </>
                                            ))}
                                        </>
                                    ) : (
                                        <>
                                            {basket.product.map((item) => (
                                                <>
                                                    <div className="col mb-7">
                                                        <div className="card h-100">
                                                            <img src={Apis.getPhoto + item.photoId} style={{height: "40vh"}}
                                                                 className="card-img-top" alt="..."/>
                                                            <div className="card-body">
                                                                <h5 className="card-title">{item.name}</h5>
                                                                <p className="card-text text-light">Tavsif: {item.description}</p>
                                                                <button className={"btn btn-danger btn-sm me-1"} onClick={() => deleteFromBasket(item.id, 0)}>olib tashlash</button>
                                                                <button className={"btn btn-sm btn-primary"} onClick={() => navigate("/category/"+`${item.category.id}`)}>mahsulotni ko'rish</button>
                                                            </div>
                                                            <div className="card-footer">
                                                                <small className="text-light">Mahsulot narxi: <span
                                                                    className={"text-warning"}>{item.price} so'm</span></small>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                            ))}
                                            {basket.aksiya.map((item) => (
                                                <>
                                                    <div className="col">
                                                        <div className="card h-100">
                                                            <img src={Apis.getPhoto + item.photoId} style={{height: "40vh"}}
                                                                 className="card-img-top" alt="..."/>
                                                            <div className="card-body">
                                                                <h5 className="card-title">{item.name}</h5>
                                                                <p className="card-text text-light">{item.foyiz}% chegirma</p>
                                                                <div className={"d-flex"}>
                                                                    {item.products.map((item) => (
                                                                        <>
                                                                            <p className={"text-light"}>{item.name}/</p>
                                                                        </>
                                                                    ))}
                                                                </div>
                                                                <button className={"btn btn-danger"}
                                                                        onClick={() => deleteFromBasket(0, item.id)}>savatchadan
                                                                    olib tashlash
                                                                </button>
                                                            </div>
                                                            <div className="card-footer">
                                                                <small className="text-light">Mahsulot narxi: <span
                                                                    className={"text-success me-2"}>{item.allPrice} so'm</span><span><del
                                                                    className={"text-danger"}>{item.pastPrice}so'm</del></span></small>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </>
                                            ))}
                                        </>
                                    )}
                                </div>
                            </div>
                        </>
                    )}
                </>
            ) : (
                <>
                    <Loading/>
                </>
            )}

        </div>
    );
}