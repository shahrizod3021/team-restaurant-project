import {
    GetColor,
    GetMessage,
    GetOrder,
    GetProduct,
    GetRestaurant,
    GetSale,
    GetUnOrder
} from "../../Services/service.js";
import {useEffect, useState} from "react";
import face from '../../assets/images/faces/face6.jpg'
import carousel from '../../assets/images/dashboard/Rectangle.jpg'
import {Loading} from "../../Component/Loading.jsx";
import axios from "axios";
import {BASE_URL} from "../../Services/BaseUrl.js";
import {Apis} from "../../Services/Apis.js";


export const Basic = () => {
    const [color, setColor] = useState({})
    const [restaurant, setRestaurant] = useState({})
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState([])
    const [order, setOrder] = useState([])
    const [unOrdered, setUnOrdered] = useState([])
    const [aksiya, setAksiya] = useState([])
    const [product, setProduct] = useState([])

    const getRestaurant = async () => {
        await GetRestaurant(setRestaurant)
        await GetColor(setColor, localStorage.getItem("uuid"))
        await GetMessage(setMessage)
        await GetProduct(setProduct)
        await GetUnOrder(setUnOrdered)
        await GetOrder(setOrder)
        await GetSale(setAksiya)
        setLoading(true)
    }
    useEffect(() => {
        getRestaurant()
    }, [])
    return (
        <div className={"basic"} style={{color: `${color.bgColor}`, height:"150vh"}}>
            {loading ? (
                <>
                    <div className="row mb-5">
                        <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
                            <div className="card mb-2" style={{backgroundColor: `${color.textColor}`}}>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-9">
                                            <div className="d-flex align-items-center align-self-start">
                                                <h4 className="mb-0">{restaurant.monthlyProfit}so'm</h4>
                                                {restaurant.foydaFoiz === 0 ? (
                                                    <>
                                                        <p className="text-danger ml-2 mb-0 font-weight-medium">-{restaurant.zarazFoyiz}%</p>
                                                    </>
                                                ) : (
                                                    <>
                                                        <p className="text-success ml-2 mb-0 font-weight-medium">+{restaurant.foydaFoiz}%</p>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                        <div className="col-3">
                                            {restaurant.foydaFoiz === 0 ? (
                                                <>
                                                    <div className="text-danger" style={{fontSize: "20px"}}>
                                                        <span className="bi-arrow-down-left icon-item"></span>
                                                    </div>
                                                </>
                                            ) : (
                                                <>
                                                    <div className="text-success" style={{fontSize: "20px"}}>
                                                        <span className="bi-arrow-up-right icon-item"></span>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                    <h6 className=" font-weight-normal">Oylik foyda</h6>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
                            <div className="card mb-2" style={{backgroundColor: `${color.textColor}`}}>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-9">
                                            <div className="d-flex align-items-center align-self-start">
                                                <h4 className="mb-0">{restaurant.dailyProfit}so'm</h4>
                                                {restaurant.kunlikFoydaFoiz === 0 ? (
                                                    <>
                                                        <p className="text-danger ml-2 mb-0 font-weight-medium">-{restaurant.kunlikZararFoiz}%</p>
                                                    </>
                                                ) : (
                                                    <>
                                                        <p className="text-success ml-2 mb-0 font-weight-medium">+{restaurant.kunlikFoydaFoiz}%</p>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                        <div className="col-3">
                                            {restaurant.kunlikFoydaFoiz === 0 ? (
                                                <>
                                                    <div className="text-danger" style={{fontSize: "20px"}}>
                                                        <span className="bi-arrow-down-left icon-item"></span>
                                                    </div>

                                                </>
                                            ) : (
                                                <>
                                                    <div className="text-success" style={{fontSize: "20px"}}>
                                                        <span className="bi-arrow-up-right icon-item"></span>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                    <h6 className=" font-weight-normal">Kunlik foyda</h6>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
                            <div className="card mb-2 " style={{backgroundColor: `${color.textColor}`}}>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-9">
                                            <div className="d-flex align-items-center align-self-start">
                                                <h4 className="mb-0">{restaurant.allProfit} so'm</h4>
                                            </div>
                                        </div>
                                        <div className="col-3">
                                            <div className="text-success" style={{fontSize: "20px"}}>
                                                <span className="bi-arrow-up-right"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <h6 className=" font-weight-normal">Umumiy foyda</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-3 grid-margin">
                            <div className="card mb-3" style={{backgroundColor: `${color.textColor}`}}>
                                <div className="card-body">
                                    <h5>Yetqizilingan zakazlar soni</h5>
                                    <div className="row">
                                        <div className="col-8 col-sm-12 col-xl-8 my-auto">
                                            <div className="d-flex d-sm-block d-md-flex align-items-center">
                                                <h2 className="mb-0">{order.length} ta</h2>
                                            </div>
                                        </div>
                                        <div className="col-4 col-sm-12 col-xl-4 text-center text-xl-right">
                                            <i style={{fontSize: "3.75rem"}}
                                               className="icon-lg fas fa-code text-primary ml-auto"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3 grid-margin">
                            <div className="card mb-3" style={{backgroundColor: `${color.textColor}`}}>
                                <div className="card-body">
                                    <h5>Jami Aksiyalar soni</h5>
                                    <div className="row">
                                        <div className="col-8 col-sm-12 col-xl-8 my-auto">
                                            <div className="d-flex d-sm-block d-md-flex align-items-center">
                                                <h2 className="mb-0">{aksiya.length} ta</h2>
                                            </div>
                                        </div>
                                        <div className="col-4 col-sm-12 col-xl-4 text-center text-xl-right">
                                            <i style={{fontSize: "3.75rem"}}
                                               className="icon-lg fas fa-wallet text-danger ml-auto"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3 grid-margin">
                            <div className="card mb-8" style={{backgroundColor: `${color.textColor}`}}>
                                <div className="card-body">
                                    <h5 >Mahsulotlar soni</h5>
                                    <div className="row">
                                        <div className="col-8 col-sm-12 col-xl-8 my-auto">
                                            <div className="d-flex d-sm-block d-md-flex align-items-center">
                                                <h2 className="mb-0">{product.length} ta</h2>
                                            </div>
                                        </div>
                                        <div className="col-4 col-sm-12 col-xl-4 text-center text-xl-right">
                                            <i style={{fontSize: "2.3rem"}}
                                               className="bi-basket text-success ml-auto"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3 grid-margin">
                            <div className="card mb-8" style={{backgroundColor: `${color.textColor}`}}>
                                <div className="card-body">
                                    <h6>Yetqazilinmagan zakazlar soni</h6>
                                    <div className="row">
                                        <div className="col-8 col-sm-12 col-xl-8 my-auto">
                                            <div className="d-flex d-sm-block d-md-flex align-items-center">
                                                <h2 className="mb-0">{unOrdered.length} ta</h2>
                                            </div>
                                        </div>
                                        <div className="col-4 col-sm-12 col-xl-4 text-center text-xl-right">
                                            <i style={{fontSize: "3.75rem"}}
                                               className="icon-lg fas fa-search text-success ml-auto"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row messageandCar" style={{color: `${color.bgColor}`}}>
                        <div className="col-md-6 col-xl-4 grid-margin stretch-card">
                            <div className="card mb-3" style={{backgroundColor: `${color.textColor}`}}>
                                <div className="card-body">
                                    <div className="d-flex flex-row justify-content-between">
                                        <h4 style={{color: `${color.bgColor}`}} className="card-title">Messages</h4>
                                        <p className=" mb-1 small">View all</p>
                                    </div>
                                    <div className="preview-list">
                                        {message.map((item) => (
                                            <>
                                                <div className="preview-item border-bottom">
                                                    <div className="preview-thumbnail">
                                                        <img src={Apis.getPhoto + item.photoId} alt="image" height={"35"}
                                                             className="rounded-circle"/>
                                                    </div>
                                                    <div className="preview-item-content d-flex flex-grow">
                                                        <div className="flex-grow">
                                                            <div className="d-flex d-md-block d-xl-flex justify-content-between">
                                                                <h6 className="preview-subject">{item.name}</h6>
                                                                <p className=" text-small">{item.time.substring(0, 10)}</p>
                                                            </div>
                                                            <p>{item.message}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <hr className={"dropdown-divider"}/>
                                                </div>
                                            </>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

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