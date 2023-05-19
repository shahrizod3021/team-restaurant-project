import Select from "react-select";
import {Apis} from "../../Services/Apis.js";
import {Link} from "react-router-dom";
import axios from "axios";
import {BASE_URL} from "../../Services/BaseUrl.js";
import {useEffect, useState} from "react";
import Carousel from "react-multi-carousel";
import rasm from "../../assets/download.png";
import {AddSale, GetColor, PhotoUpload} from "../../Services/service.js";
import {toast} from "react-toastify";
import '../../assets/SideBar.css'
import  vd from '../../assets/drink-79908.mp4'

export const Aksiya = () => {
    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };
    const [sale, setSale] = useState([])
    const [name, setName] = useState('')
    const [foiz, setFoiz] = useState('')
    const [product, setProduct] = useState([])
    const [productsId, setSelectProduct] = useState([])
    const [color, setColor] = useState({})
    const getSale = async () => {
        const res = await axios.get(BASE_URL + Apis.sale + "/list")
        setSale(res.data)
    }
    const getColor = async () => {
        await GetColor(setColor, localStorage.getItem("uuid"))
    }

    const getProduct = async () => {
        const res = await axios.get(BASE_URL + Apis.product + "/list")
        setProduct(res.data)
    }
    useEffect(() => {
        getSale()
        getProduct()
        getColor()
    }, [])

    const addSale = async () => {
        const data = {
            name, foiz, productsId
        }
        await AddSale(data)
        setSelectProduct([])
        setFoiz("")
        setName("")
    }

    const uploadSalePhoto = async () => {
        let rasm = document.getElementById("rasm").files[0]
        const formData = new FormData()
        formData.append("photo", rasm);
        await PhotoUpload(formData);
        const photoId = localStorage.getItem("salePhoto");
        const res = await axios.put(BASE_URL + Apis.sale + "/upload/" + localStorage.getItem("saleId") + "?salePhoto=" + photoId)
        toast(res.data.message)
        await getSale()
    }

    function handleSelect1(data) {
        setSelectProduct(data);
    }

    const clear = () => {
        setName("")
        setSelectProduct([])
        setFoiz("")
    }

    return (
        <div className={"sale"} style={{height: "120vh"}}>
            <button className={"saleButton btn btn-primary"} style={{marginLeft: "20px"}} data-bs-toggle="modal"
                    data-bs-target="#addSale">Aksiya qo'sish <i className={"bi-plus-circle"}></i></button>
            <Carousel responsive={responsive}>
                {sale.map((item) => (
                    <div className={"me-2"}>
                        <div className="card mb-2" style={{backgroundColor:`${color.textColor}`}}>
                            <div className={"card-img-top col-12 bg-image"} style={{height: '16%'}}>
                                <label className={"w-100 d-flex flex-column hover-zoom"}  htmlFor={"rasm"}>
                                    <img style={{height:"40vh"}} src={Apis.getPhoto + item.photoId} alt=""/>
                                </label>
                                <input type="file" className={"d-none"} id={"rasm"} name={"rasm"}
                                       onChange={(e) => uploadSalePhoto()}/>
                            </div>
                            <div className="card-body" style={{height:"40vh"}}>
                                <div className="row">
                                    <div className="col-9">
                                        <div className={"d-flex align-items-center"}>
                                            <h3 className={"col-8"} style={{color:`${color.bgColor}`}}>{item.name}</h3>
                                            <img className={"col-4"} src={rasm} alt="" />
                                        </div>
                                        <hr className={"mb-0 mt-0"}/>
                                        <div className="d-flex align-items-center align-self-start">
                                            <h3 className="text-success mb-0">{item.allPrice} so'm</h3>
                                            <p className="text-danger ml-2 mb-0 font-weight-medium">
                                                <del>{item.pastPrice} so'm</del>
                                            </p>
                                        </div>
                                        <div className={"d-flex"}>
                                            {item.products.map((item) => (
                                                <>
                                                    <p className={"text-warning me-2"}>{item.name} <i className={"bi-check"}></i></p>
                                                </>
                                            ))}
                                        </div>

                                    </div>
                                </div>
                                <div className={"card-footer"}>
                                    <button className={"btn btn-success"}>Aksiyani ko'rish</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </Carousel>
            <div className="modal fade" id="addSale" tabIndex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Mahsulot qo'shish</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close" onClick={() => clear()}></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <label htmlFor="name">
                                    Mahsulot nomi
                                </label>
                                <input type="text" className={"form-control"} id={"name"} name={"name"}
                                       placeholder={"Mahsulot nomini kiriting"} value={name}
                                       onChange={e => setName(e.target.value)}/>
                                <label htmlFor="price" className={"mt-3"}>
                                    Ushbu mahsulotlar uchun necha foiz aksiya
                                </label>
                                <input type="number" className={"form-control "} id={"price"} name={"price"}
                                       placeholder={"Ushbu mahsulotlar uchun aksiya foizini kiriting"} value={foiz}
                                       onChange={e => setFoiz(e.target.value)}/>
                                <Select
                                    className={"mt-3"}
                                    options={product.map((item) => (
                                        {value: item.id, label: item.name}
                                    ))}
                                    placeholder="Mahsulotni tanlang"
                                    value={productsId}
                                    onChange={handleSelect1}
                                    isSearchable={true}
                                    id={"product"}
                                    name={"product"}
                                    isMulti
                                />
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal"
                                    onClick={() => clear()}>Yopish
                            </button>
                            {name.trim().length === 0 || foiz.trim().length === 0 || productsId.length === 0 ? (
                                <>
                                    <button type="button" className="btn btn-primary disabled" data-bs-toggle="modal"
                                            data-bs-target="#uploadProductPhoto">Keyingi
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button type="button" className="btn btn-primary" data-bs-toggle="modal"
                                            data-bs-target="#uploadSalesPhoto" onClick={() => addSale()}>Keyingi
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="uploadSalesPhoto" tabIndex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Kategoriya rasmini joylash</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close" onClick={() => setName("")}></button>
                        </div>
                        <div className="modal-body">
                            <div className={"col-12"} style={{height: '16%', borderStyle: 'dashed'}}>
                                <label className={"w-100 d-flex flex-column"} style={{height: '100%'}} htmlFor={"rasm"}>
                                    <h2 className={"text-center"}>Rasmni kiriting</h2>
                                    <i className={"text-center  bi-cloud-upload"} style={{fontSize: "50px"}}></i>
                                </label>
                                <input type="file" className={"d-none"} id={"rasm"} name={"rasm"}
                                       onChange={(e) => uploadSalePhoto()}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}