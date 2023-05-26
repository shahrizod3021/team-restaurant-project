import {useEffect, useState} from "react";
import {GetOneUser, Ordering, Search} from "../../Services/service.js";
import {Link, useLocation} from "react-router-dom";
import {Loading} from "../../Component/Loading.jsx";
import {Apis} from "../../Services/Apis.js";

export const Products = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const location = useLocation().pathname
    const name1 = (location.split("/")[2])
    const [name, setName] = useState('')
    const [price, setPrice] = useState(Number)
    const [soni, setSoni] = useState(1)
    const [productId, setProductId] = useState(Number)
    const [photo, setPhoto] = useState('')
    const [user, setUser] = useState('')

    useEffect(() => {
        const getAll = async () => {
            try {
                setProducts(await Search(name1))
                await GetOneUser(localStorage.getItem("uuid"),setUser)
                setLoading(true)
            } catch (err) {
            }
        }
        getAll()
    }, [])

    const getMalumot = (photoId, name, price, id) => {
        setPhoto(photoId)
        setName(name)
        setPrice(price)
        setProductId(id)
    }
    const ordered = async  () => {
        await Ordering(localStorage.getItem("uuid"), soni,price*soni, productId, 0)
    }
    return (
        <div>
            {loading ? (
                <>
                    <div className={"container"}>
                        {products.map((item) => (
                            <>
                                <button onClick={() => getMalumot(item.photoId, item.name, item.price, item.id)}
                                        data-mdb-toggle="modal" data-mdb-target="#exampleModal"
                                        className={"bg-transparent border-0 text-start mb-5"}>
                                    <div className="oneProduct card mb-3" style={{maxWidth: "540px"}}>
                                        <div className="row g-0">
                                            <div className="col-md-4">
                                                <img
                                                    src={Apis.getPhoto + item.photoId}
                                                    alt="Trendy Pants and Shoes"
                                                    className="img-fluid rounded-start"
                                                    style={{height: "35vh", width:"100%"}}
                                                />
                                            </div>
                                            <div className="col-md-8" style={{height:"35vh"}}>
                                                <div className="card-body">
                                                    <h1 className={"text-warning mb-2"}>{item.name}</h1>
                                                    <p className={"text-light mb-5"}>{item.description}</p>
                                                    <div className="d-flex ">
                                                        <div className="mt-2 d-flex align-items-center">
                                                            <h4 className="card-text col-10 text-warning">{item.price} so'm</h4>
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
                            </>
                        ))}
                    </div>
                    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel"
                         aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <img src={Apis.getPhoto + photo} alt={"rasm mavjud emas"}/>
                                <div className="modal-header">
                                    <h5 className={"text-center"}>{name}</h5>
                                    <button type="button" className="btn-close" data-mdb-dismiss="modal"
                                            aria-label="Close" onClick={() => setSoni(1)}></button>
                                </div>
                                <div className="modal-body">
                                    {soni <= 0 ? (
                                        <>
                                            <button className={"btn btn-disabled"}>-</button>
                                        </>
                                    ) : (
                                        <button className={"btn btn-dark"} onClick={() => setSoni(soni-1)}>-</button>

                                    )}
                                    <button className={"btn btn-warning"} onClick={() => setSoni(soni+1)}>+</button>
                                    <h5 className={"mt-2"}>soni {soni}</h5>
                                    <p style={{float:"right"}}>{price * soni}so'm</p>
                                </div>
                                <div className="modal-footer">
                                    {localStorage.getItem("uuid") === null ? (
                                        <>
                                            <button type="submit" onClick={() => setTimeout(() => {
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
                                    ) : (
                                        <>
                                            <button type="button" onClick={() => ordered()}
                                                    className={soni <= 0 ? (
                                                        "btn btn-block btn-disabled"
                                                    ) : (
                                                        "btn btn-block btn-warning"
                                                    )}
                                            >Zakaz berish
                                            </button>
                                        </>
                                    )}

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