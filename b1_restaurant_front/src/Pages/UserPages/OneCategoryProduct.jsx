import {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {BASE_URL} from "../../Services/BaseUrl.js";
import {Apis} from "../../Services/Apis.js";
import axios from "axios";
import '../../assets/SideBar.css'
import sale from '../../assets/download.png'
import {Loading} from "../../Component/Loading.jsx";
import {AddToBasket,  GetOneUser, Ordering} from "../../Services/service.js";

export const OneCategoryProduct = () => {
    const [category, setCategory] = useState('')
    const [product, setProduct] = useState([])
    const param = useParams().id
    const [loading, setLoading] = useState(false)
    const [photo, setPhoto] = useState('')
    const [name, setName] = useState('')
    const [price, setPrice] = useState(Number)
    const [soni, setSoni] = useState(1)
    const [productId, setProductId] = useState(Number)
    const [user, setUser] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        const getOneCategory = async () => {
            const res = await axios.get(BASE_URL + Apis.category + "/" + param)
            setCategory(res.data)
            setLoading(true)
        }
        const getProductOfOneCategory = async () => {
            try {
                const res = await axios.get(BASE_URL + Apis.product + "/" + param)
                setProduct(res.data);
                setLoading(true)
            } catch (err) {
            }
        }
        const oneUser = async () => {
            await GetOneUser(localStorage.getItem("uuid"), setUser)
            setLoading(true)
        }

        oneUser()
        getOneCategory()
        getProductOfOneCategory()
    }, [])
    const getMalumot = (photoId, name, price, id) => {
        setPhoto(photoId)
        setName(name)
        setPrice(price)
        setProductId(id)
    }
    const ordered = async () => {
        await Ordering(localStorage.getItem("uuid"),    soni, price * soni,  productId, 0)
    }
    const addToBasket = async () => {
        await AddToBasket(user.id, productId, 0)
    }
    return (
        <div>
            {loading ? (
                <>
                    {category.sale === true ? (
                        <>
                            <img className={"salejon"} src={sale} alt="" width={"10%"}/>
                        </>
                    ) : (
                        <>
                        </>
                    )}
                    <div className={"container"}>
                        <div className="card text-bg-dark oneCategory ">
                            <img src={Apis.getPhoto + category.photoId} className="card-img" height={"500vh"}
                                 alt="..."/>
                            <div className="mask card-img-overlay" style={{backgroundColor: "rgba(0,0,0,0.6)"}}>
                                <h1 className="card-title text-light">{category.name}</h1>
                                <hr/>
                                {category.sale === true ? (
                                    <>
                                        <p className="card-text"><small>ushbu kategoriyda chegirma mahsulotlar
                                            mavjud</small></p>
                                    </>
                                ) : (
                                    <>
                                        <p className="card-text"><small>ushbu kategoriyda chegirma mahsulotlar mavjud
                                            emas</small></p>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                    <h1 className={"text-center text-warning mt-5 mb-2"} style={{fontFamily: "cursive"}}>ushbu
                        kategoriya
                        mahsulotlari</h1>
                    <div className="ProductCard mb-10 container row row-cols-1 row-cols-md-2 g-4">
                        {product.map((item) => (
                            <>
                                <button onClick={() => getMalumot(item.photoId, item.name, item.price, item.id)}
                                        data-mdb-toggle="modal" data-mdb-target="#exampleModal"
                                        className={"bg-transparent border-0 text-start"}>
                                    <div className="oneProduct card mb-3" style={{maxWidth: "540px"}}>
                                        <div className="row g-0">
                                            <div className="col-md-4">
                                                <img
                                                    src={Apis.getPhoto + item.photoId}
                                                    alt="Trendy Pants and Shoes"
                                                    className="img-fluid rounded-start"
                                                    style={{height: "35vh"}}
                                                />
                                            </div>
                                            <div className="col-md-8">
                                                <div className="card-body" style={{height:"35vh"}}>
                                                    <h1 className={"text-warning mb-2"}>{item.name}</h1>
                                                    <p className={"text-light mb-4"}>{item.desciption}</p>
                                                    {item.sale ? (
                                                        <>
                                                            <Link to={"/sale/" + `${item.id}`} className={"link-light"}>Chegirmani
                                                                ko'rish</Link>
                                                        </>
                                                    ) : (
                                                        <></>
                                                    )}
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
                    <div className={"MediaCard mb-10"}>
                        {product.map((item) => (
                            <>
                                <button onClick={() => getMalumot(item.photoId, item.name, item.price, item.id)}
                                        data-mdb-toggle="modal" data-mdb-target="#exampleModal"
                                        className={"bg-transparent border-0 text-start"}>
                                    <div className="oneProduct card mb-3" style={{maxWidth: "540px"}}>
                                        <div className="row g-0">
                                            <div className="col-md-4">
                                                <img
                                                    src={Apis.getPhoto + item.photoId}
                                                    alt={item.name}
                                                    className="img-fluid rounded-start"
                                                    style={{height: "40vh", width: "100%"}}
                                                />
                                            </div>
                                            <div className="col-md-8">
                                                <div className="card-body">
                                                    <h1 className={"text-warning mb-2"}>{item.name}</h1>
                                                    <h6 className={"text-light mb-5"}>{item.desciption}</h6>
                                                    <div className="d-flex ">
                                                        <div className="mt-2 d-flex align-items-center">
                                                            <h4 className="card-text col-10 text-warning">{item.price} so'm</h4>
                                                            <button
                                                                style={{borderRadius: "100px", padding: "10px 15px"}}
                                                                className={"btn btn-outline-warning mb-2 bg-transparent "}>
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
                                <img src={Apis.getPhoto + photo} alt={"rasm mavjud emas"} height={"200vh"}/>
                                <div className="modal-header">
                                    <h5 className={"text-center"}>{name}</h5>
                                    <button type="button" className="btn-close" data-mdb-dismiss="modal"
                                            aria-label="Close" onClick={() => setSoni(1)}></button>
                                </div>
                                <div className="modal-body h-50">
                                    {soni <= 0 ? (
                                        <>
                                            <button className={"btn btn-disabled"}>-</button>
                                        </>
                                    ) : (
                                        <button className={"btn btn-dark"} onClick={() => setSoni(soni - 1)}>-</button>

                                    )}
                                    <button className={"btn btn-warning"} onClick={() => setSoni(soni + 1)}>+</button>
                                    <h5 className={"mt-2"}>soni {soni}</h5>
                                    <p style={{float: "right"}}>{price * soni}so'm</p>
                                </div>
                                <div className="modal-footer">
                                    {user.length === 0 ? (
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
                                            <button type={"button"}
                                                    className={"btn btn-warning btn-block"}
                                                    onClick={() => addToBasket()}>
                                                Savatchaga qo'shish <i
                                                className={"bi bi-basket-fill"}></i>
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
    );
}