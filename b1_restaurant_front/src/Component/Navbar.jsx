import {Link, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {GetCategory, GetOneUser} from "../Services/service.js";
import sale from '../assets/download.png'
import axios from "axios";
import {BASE_URL} from "../Services/BaseUrl.js";
import {Apis} from "../Services/Apis.js";
import {set} from "mdb-ui-kit/src/js/mdb/perfect-scrollbar/lib/css.js";

export const Navbar = () => {
    const [user, setUser] = useState('')
    const id = localStorage.getItem("uuid")
    const [category, setCategory] = useState([])
    const [product, setProduct] = useState([])
    const navigate = useNavigate()

    const oneUser = async () => {
        await GetOneUser(id, setUser)
        setCategory(await GetCategory())
        const res = await axios.get(BASE_URL + Apis.product + "/list")
        setProduct(res.data)
    }


    useEffect(() => {
        oneUser()
    }, [])
    return (
        <div className={"navbar navbar-expand-lg navbar-light "}>
            <div className={"container"}>
                <div>
                    <button style={{marginRight: "20px"}} data-mdb-toggle="modal" data-mdb-target="#category"
                            className={"navbarCategory btn btn-outline-danger"}>Chegirma kategoriyalar
                            <i style={{fontSize:"15px"}} className={"bi-list"}></i>

                    </button>
                    <button style={{height: "40px"}} data-mdb-toggle="modal" data-mdb-target="#product" className={'btn btn-outline-warning'}>Chegirma mahsulotlar</button>
                </div>
                <div>
                    <Link to={"/auth/user/myBasket"} className={"link-danger"} onClick={() => localStorage.setItem("buttonId", 3)}><i style={{fontSize: "25px"}}
                                                                                     className={"bi-heart-fill"}></i></Link>
                    {user.length === 0 ? (
                        <>
                            <Link style={{marginLeft: "20px", fontSize: "25px"}} className="link-danger  me-3"
                                  to="/auth/register">
                                <i className="fas fa-shopping-cart"></i>
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link style={{marginLeft: "20px", fontSize: "25px"}} className="link-danger me-3 "
                                  to="/auth/user/myOrder">
                                <i className="fas fa-shopping-cart" onClick={() => localStorage.setItem("buttonId","2")}></i>
                            </Link>
                        </>
                    )}
                </div>
            </div>
            <div className="modal fade" id="category" tabIndex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog modal-fullscreen">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Chegirma kategoriyalar</h5>
                            <button type="button" className="btn-close" data-mdb-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {category.map((item) => (
                                <>
                                    {item.sale ? (
                                        <h6 style={{cursor:"pointer"}} onClick={() => setTimeout(() => {
                                            navigate("/category/" + `${item.id}`)
                                            window.location.reload()
                                        },500)} className={"link-dark"}>{item.name}</h6>
                                    ) : (
                                        <></>
                                    )}
                                </>
                            ))}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary"
                                    data-mdb-dismiss="modal" >Yopish
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="product" tabIndex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog modal-fullscreen">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Chegirma kategoriyalar</h5>
                            <button type="button" className="btn-close" data-mdb-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {product.map((item) => (
                                <>
                                    {item.sale ? (
                                        <h5 style={{cursor:"pointer"}} onClick={() => setTimeout(() => {
                                            navigate("/sale/" + item.id)
                                            window.location.reload()
                                        },1000)} className={"link-dark"}>{item.name}</h5>
                                    ) : (
                                        <></>
                                    )}
                                </>
                            ))}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary"
                                    data-mdb-dismiss="modal" >Yopish
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}