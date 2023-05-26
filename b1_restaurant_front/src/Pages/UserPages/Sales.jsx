import {useEffect, useState} from "react";
import axios from "axios";
import {BASE_URL} from "../../Services/BaseUrl.js";
import {Apis} from "../../Services/Apis.js";
import {useNavigate, useParams} from "react-router-dom";
import {Loading} from "../../Component/Loading.jsx";
import {AddToBasket, Ordering} from "../../Services/service.js";

export const Sales = () => {
    const [sale, setSale] = useState([])
    const param = useParams().id
    const [loading, setLoading] = useState(false)
    const [name, setName] = useState('')
    const [price, setPrice] = useState(Number)
    const [soni, setSoni] = useState(1)
    const [aksiyaId, setAksiyaId] = useState(Number)
    const [photo, setPhoto] = useState('')
    const navigate = useNavigate()

    const getOne = async () => {
        setSale((await axios.get(BASE_URL + Apis.sale + "/" + param)).data)
        setLoading(true)
    }
    useEffect(() => {
        getOne()
    }, [])

    const getMalumot = (photoId, name, price, id) => {
        setPrice(price)
        setPhoto(photoId)
        setName(name)
        setAksiyaId(id)
    }
    const ordered = async () => {
        await Ordering(localStorage.getItem("uuid"), soni,price * soni, 0, aksiyaId)
    }
    const addToBasket = async () => {
        await AddToBasket(localStorage.getItem("uuid"), 0, aksiyaId)
    }
    return (
        <div>
            {loading ? (
                <>
                    <div className={"container mb-5"}>
                        {sale.map((item) => (
                            <>
                                <button onClick={() => getMalumot(item.photoId, item.name, item.allPrice, item.id)}
                                        data-mdb-target={item.active ? ("#exampleModal"
                                        ) : ("#notfound")} data-mdb-toggle="modal"
                                        className={"bg-transparent border-0 mb-8 text-start"}>
                                    <div className="oneProduct card mb-3" style={{maxWidth: "540px"}}>
                                        <div className="row g-0">
                                            <div className="col-md-4">
                                                <img
                                                    src={Apis.getPhoto + item.photoId}
                                                    alt={item.name}
                                                    className="img-fluid rounded-start"
                                                    style={{height: "35vh"}}
                                                    width={"100%"}
                                                />
                                            </div>
                                            {item.active ? (
                                                <></>
                                            ) : (
                                                <>
                                                    <div className={"mask card-img-overlay"}
                                                         style={{backgroundColor: "rgba(0,0,0,0.6)"}}>
                                                        <h1 className="card-title text-danger text-center mt-5">Yopilgan</h1>
                                                    </div>
                                                </>
                                            )}
                                            <div className="col-md-8" style={{height:"35vh"}}>
                                                <div className="card-body">
                                                    <h1 className={"text-warning mb-7"}>{item.name}</h1>

                                                    <h4 className={"text-danger"}>
                                                        <del>{item.pastPrice}so'm</del>
                                                    </h4>
                                                    <div className="d-flex">

                                                        <div className="d-flex align-items-center">
                                                            <h5 className="card-text col-10 text-warning">{item.allPrice} so'm</h5>
                                                            <button
                                                                style={{borderRadius: "100px", padding: "10px 15px"}}
                                                                className={"btn btn-outline-warning  mb-2 bg-transparent "}>
                                                                <i className={"text-warning fas fa-cart-shopping"}></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </button>
                                <div className="modal fade" id="exampleModal" tabIndex="-1"
                                     aria-labelledby="exampleModalLabel"
                                     aria-hidden="true">
                                    <div className="modal-dialog modal-dialog-centered">
                                        <div className="modal-content">
                                            <img src={Apis.getPhoto + photo} alt={"rasm mavjud emas"} height={"200vh"}/>
                                            <div className="modal-header">
                                                <h5 className={"text-center"}>{name}</h5>
                                                <button type="button" className="btn-close" data-mdb-dismiss="modal"
                                                        aria-label="Close" onClick={() => setSoni(1)}></button>
                                            </div>
                                            <div className={"d-flex container"}>
                                                {item.products.map((item) => (
                                                    <>
                                                        <p className={"me-2"}>{item.name}</p>
                                                    </>
                                                ))}
                                            </div>
                                            <div className="modal-body" style={{height:"15vh"}}>
                                                {soni <= 0 ? (
                                                    <>
                                                        <button className={"btn btn-disabled"}>-</button>
                                                    </>
                                                ) : (
                                                    <button className={"btn btn-dark"}
                                                            onClick={() => setSoni(soni - 1)}>-</button>

                                                )}
                                                <button className={"btn btn-warning"}
                                                        onClick={() => setSoni(soni + 1)}>+
                                                </button>
                                                <h5 className={"mt-2"}>soni {soni}</h5>
                                                <p style={{float: "right"}}>{price * soni}so'm</p>
                                            </div>
                                            <div className="modal-footer">
                                                {localStorage.getItem("uuid") === null ? (
                                                    <>
                                                        <button type="button" onClick={() => setTimeout(() => {
                                                            navigate("/auth/register")
                                                            window.location.reload()
                                                        }, 1000)}
                                                                className={soni <= 0 ? (
                                                                    "btn btn-block btn-disabled"
                                                                ) : (
                                                                    "btn btn-block btn-warning"
                                                                )}
                                                        >Zakaz berish
                                                        </button>
                                                    </>
                                                ) :  (
                                                    <>
                                                        <button type="button" onClick={() => ordered()}
                                                                className={soni <= 0 ? (
                                                                    "btn btn-block btn-disabled"
                                                                ) : (
                                                                    "btn btn-block btn-warning"
                                                                )}
                                                        >Zakaz berish
                                                        </button>
                                                        <button type="button" className={"btn btn-outline-warning btn-block"} onClick={() =>addToBasket()}>Savatchaga qo'shish
                                                            <i className={"bi-basket-fill"}></i>
                                                        </button>
                                                    </>
                                                )}

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ))}
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