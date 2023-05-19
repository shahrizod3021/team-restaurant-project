import {Apis} from "../../Services/Apis.js";
import {Link} from "react-router-dom";
import axios from "axios";
import {BASE_URL} from "../../Services/BaseUrl.js";
import {useEffect, useState} from "react";
import {AddProduct, DeleteCategory, DeleteProduct, EditProduct, GetColor, PhotoUpload} from "../../Services/service.js";
import {toast} from "react-toastify";
import {Pagenation} from "../../Component/Pagenation.jsx";

export const Proudct = () => {

    const [product, setProduct] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [prePage] = useState(5)

    const indexOfLastData = currentPage * prePage;
    const indexOfFirstData = indexOfLastData - prePage;
    const currentData = product.slice(indexOfFirstData, indexOfLastData);

    const getProduct = async () => {
        try {
            const res = await axios.get(BASE_URL + Apis.product + "/list")
            setProduct(res.data)
        } catch (err) {

        }
    }
    useEffect(() => {
        getProduct()
    }, [])

    const paginate = (pageNumber) => setCurrentPage(pageNumber)
    return (
        <div style={{height:"100vh"}}>
            <Productjon data={currentData}/>
            <Pagenation totalData={product.length} perPage={prePage} paginate={paginate}/>
        </div>
    )
}

const Productjon = ({data}) => {
    const [product, setProduct] = useState([])

    const [id, setId] = useState('')
    const [color, setColor] = useState({})
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    const [categoryId, setCategoryId] = useState('')
    const [category, setCategory] = useState([])
    const getColor = async () => {
        await GetColor(setColor, localStorage.getItem("uuid"))
    }

    const getProduct = async () => {
        const res = await axios.get(BASE_URL + Apis.product + "/list")
        setProduct(res.data)
    }

    const getCategory = async () => {
        try {
            const res = await axios.get(BASE_URL + Apis.category + "/list")
            setCategory(res.data)
        } catch (err) {
            toast.error("categoriyalar ro'yhatini olib kelishda hatolik")
        }
    }

    useEffect(() => {
        getColor()
        getCategory()
        getProduct()
    }, [])


    const uploadProductPhoto = async () => {
        let rasm = document.getElementById("rasm").files[0]
        const formData = new FormData()
        formData.append("photo", rasm);
        await PhotoUpload(formData);
        const photoId = localStorage.getItem("productPhoto");
        await axios.put(BASE_URL + Apis.product + "/upload/" + localStorage.getItem("productId") + "?productPhoto=" + photoId)
        toast("Mahsulot saqlandi")
        getProduct()
    }

    const editProductPhoto = async () => {
        let rasm = document.getElementById("rasm").files[0]
        const formData = new FormData()
        formData.append("photo", rasm);
        await PhotoUpload(formData);
        const photoId = localStorage.getItem("productPhoto");
        try {
            await axios.put(BASE_URL + Apis.product + "/upload/" + id + "?productPhoto=" + photoId)
            toast("mahsuolot rasmi taxrirlandi")
            await getProduct()
        } catch (err) {
            toast.error("rasm saqlashda hatolik")
        }
    }

    const addProduct = async () => {
        await AddProduct(categoryId, name, description, price)
        await  getProduct()
    }
    const editProduct = async () => {
        await EditProduct(id, name, description, price)
        setName("")
        setDescription("")
        setPrice("")
        await getProduct()
    }

    const deleteProduct = async () => {
        await DeleteProduct(id)
        getCategory()
        setCategoryId("")
        getProduct()
    }

    const clear = () => {
        setName("")
        setPrice("")
        setDescription("")
        setCategoryId("")
    }
    return (
        <div className={"row"} >
            <div className="col-12">
                <div className="card" style={{backgroundColor: `${color.textColor}`}}>
                    <div className="card-body" style={{color: `${color.bgColor}`}}>
                        <h4 className="">Mahsulotlar jadvali</h4>
                        <div className={"row"}>
                            <div className="col-12">
                                <button type="button" className="btn btn-primary mb-2" data-bs-toggle="modal"
                                        data-bs-target="#addProduct">
                                    Mahsulot qo'shish <i className={"bi-plus-circle"}></i>
                                </button>
                                <div className="table-responsive">
                                    <table className="table ">
                                        <thead>
                                        <tr style={{color: `${color.bgColor}`}}>
                                            <th className={"col-2"}> Rasm</th>
                                            <th className={"col-2"}> Id</th>
                                            <th className={"col-2"}> Nomi</th>
                                            <th className={"col-2"}> Tavfsiloti</th>
                                            <th className={"col-2"}> Narxi</th>
                                            <th className={"col-2"}> Jarayonlar</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {data.map((item, i) => (
                                            <>
                                                <tr style={{color: `${color.bgColor}`}}>
                                                    <td><img className={"rounded-circle me-2"} width={"30"}
                                                             height={"30"} src={Apis.getPhoto + item.photoId}
                                                             alt=""/>
                                                        <button style={{
                                                            border: "0",
                                                            color: "#f1c40f",
                                                            backgroundColor: "transparent"
                                                        }} onClick={() => setId(item.id)} data-bs-toggle="modal"
                                                                data-bs-target="#editProductPhoto"><i
                                                            className={"bi-pencil"}></i></button>
                                                    </td>
                                                    <td>{i + 1}</td>
                                                    <td>
                                                        <span className={"me-3 text-uppercase"}>{item.name}</span>
                                                        <button style={{
                                                            border: "0",
                                                            color: "#f1c40f",
                                                            backgroundColor: "transparent"
                                                        }} onClick={() => setId(item.id)} data-bs-toggle="modal"
                                                                data-bs-target="#editName"><i
                                                            className={"bi-pencil"}></i></button>
                                                    </td>
                                                    <td>
                                                        {item.description}
                                                        <button style={{
                                                            border: "0",
                                                            color: "#f1c40f",
                                                            backgroundColor: "transparent"
                                                        }} onClick={() => setId(item.id)} data-bs-toggle="modal"
                                                                data-bs-target="#editDescription"><i
                                                            className={"bi-pencil"}></i></button>
                                                    </td>
                                                    <td>
                                                            <span style={{
                                                                color: "gold",
                                                                fontStyle: "italic"
                                                            }}>{item.price}</span>so'm <button style={{
                                                        border: "0",
                                                        color: "#f1c40f",
                                                        backgroundColor: "transparent"
                                                    }} onClick={() => setId(item.id)} data-bs-toggle="modal"
                                                                                               data-bs-target="#editPrice">
                                                        <i
                                                            className={"bi-pencil"}></i></button>
                                                    </td>
                                                    <td>
                                                        <div className={"categoryAction "}>
                                                            <button className={"btn btn-danger me-2"}
                                                                    data-bs-toggle="modal"
                                                                    data-bs-target="#deleteProduct"
                                                                    onClick={() => setId(item.id)}><i
                                                                className={"bi-trash"}></i></button>
                                                            <Link to={"/product/" + item.id}
                                                                  className={"btn btn-primary"}><i
                                                                className={"bi-eye"}></i></Link>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="addProduct" tabIndex="-1" aria-labelledby="exampleModalLabel"
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
                                <input type="text" className={"form-control "} id={"name"} name={"name"}
                                       placeholder={"Mahsulot nomini kiriting"} value={name}
                                       onChange={e => setName(e.target.value)}/>
                                <label htmlFor="description" className={'mt-3'}>
                                    Mahsulot tavsifi
                                </label>
                                <input type="text" className={"form-control "} id={"description"} name={"description"}
                                       placeholder={"Mahsulot tafsilotini kiriting"} value={description}
                                       onChange={e => setDescription(e.target.value)}/>
                                <label htmlFor="price" className={"mt-3"}>
                                    Mahsulot narxi
                                </label>
                                <input type="number" className={"form-control "} id={"price"} name={"price"}
                                       placeholder={"Mahsulot narxini kiriting"} value={price}
                                       onChange={e => setPrice(e.target.value)}/>
                                <label htmlFor="price" className={"mt-3"}>
                                    Kategoriyani tanlang
                                </label>
                                <select name="categoryId" id="categoryId" value={categoryId}
                                        onChange={e => setCategoryId(e.target.value)} className={"form-select"}>
                                    <option value={"0"} className={"disabled"}>tanlang</option>
                                    {category.map((item) => (
                                        <>
                                            <option value={item.id}>{item.name}</option>
                                        </>
                                    ))}
                                </select>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal"
                                    onClick={() => clear()}>Yopish
                            </button>
                            {name.trim().length === 0 || description.trim().length === 0 || price.trim().length === 0 || categoryId.trim().length === 0 || categoryId.startsWith("0") ? (
                                <>
                                    <button type="button" className="btn btn-primary disabled" data-bs-toggle="modal"
                                            data-bs-target="#uploadProductPhoto">Keyingi
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button type="button" className="btn btn-primary" data-bs-toggle="modal"
                                            data-bs-target="#uploadProductPhoto" onClick={() => addProduct()}>Keyingi
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="editProductPhoto" tabIndex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Kategoriya rasmini joylash</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close" onClick={() => clear()}></button>
                        </div>
                        <div className="modal-body">
                            <div className={"col-12"} style={{height: '16%', borderStyle: 'dashed'}}>
                                {product.map((item) => (
                                    (item.id === id ? (
                                        <>
                                            {item.photoId === null ? (
                                                <>
                                                    <label className={"w-100 d-flex flex-column"}
                                                           style={{height: '100%'}} htmlFor={"rasm"}>
                                                        <h2 className={"text-center"}>Rasmni joylang</h2>
                                                        <i className="bi bi-cloud-arrow-up"
                                                           style={{textAlign: 'center', fontSize: '52px'}}/>
                                                    </label>
                                                    <input type="file" className={"d-none"} id={"rasm"} name={"rasm"}
                                                           onChange={(e) => editProductPhoto()}/>
                                                </>
                                            ) : (
                                                <>
                                                    <label className={"w-100 d-flex flex-column"}
                                                           style={{height: '100%'}} htmlFor={"rasm"}>
                                                        <h2 className={"text-center"}>Rasmni taxrirlang</h2>
                                                        <img src={Apis.getPhoto + item.photoId} alt=""/>
                                                    </label>
                                                    <input type="file" className={"d-none"} id={"rasm"} name={"rasm"}
                                                           onChange={(e) => editProductPhoto()}/>
                                                </>
                                            )}
                                        </>
                                    ) : (
                                        <>
                                        </>
                                    ))
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="uploadProductPhoto" tabIndex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Mahsulot rasmini joylash</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close" onClick={() => clear()}></button>
                        </div>
                        <div className="modal-body">
                            <div className={"col-12"} style={{height: '16%', borderStyle: 'dashed'}}>
                                <label className={"w-100 d-flex flex-column"} style={{height: '100%'}} htmlFor={"rasm"}>
                                    <h2 className={"text-center"}>Rasmni kiriting</h2>
                                    <i className={"text-center  bi-cloud-upload"} style={{fontSize: "50px"}}></i>
                                </label>
                                <input type="file" className={"d-none"} id={"rasm"} name={"rasm"}
                                       onChange={(e) => uploadProductPhoto()}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="editName" tabIndex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Mahsulotni taxrirlash</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close" onClick={() => clear()}></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <label htmlFor="name">Mahsulot nomi</label>
                                <input type="text" className={"form-control"}
                                       placeholder={"mahsulot nomini taxrirlang"} id={"name"} name={"name"}
                                       value={name} onChange={e => setName(e.target.value)}/>
                                <h5 className={"mt-3"}>Yana taxrirlash uchun</h5>
                                <label htmlFor="description">mahsulot tavfsiloti</label>
                                <input type="text" className={"form-control"}
                                       placeholder={"mahsulot tavfsilotini taxrirlang"} id={"description"}
                                       name={"description"}
                                       value={description} onChange={e => setDescription(e.target.value)}/>
                                <label htmlFor="description" className={"mt-3"}>mahsulot narxi</label>
                                <input type="number" className={"form-control"}
                                       placeholder={"mahsulot narxini taxrirlang"} id={"price"} name={"price"}
                                       value={price} onChange={e => setPrice(e.target.value)}/>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal"
                                    onClick={() => clear()}>Yopish
                            </button>
                            {name.trim().length === 0 ? (
                                <>
                                    <button type="button" className="btn btn-primary disabled" data-bs-toggle="modal"
                                            data-bs-target="#uploadCategoryPhoto">Saqlash
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button type="button" className="btn btn-primary"
                                            onClick={() => editProduct()}>Saqlash
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="editDescription" tabIndex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Mahsulotni taxrirlash</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close" onClick={() => clear()}></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <label htmlFor="description">mahsulot tavfsiloti</label>
                                <input type="text" className={"form-control"}
                                       placeholder={"mahsulot tavfsilotini taxrirlang"} id={"description"}
                                       name={"description"}
                                       value={description} onChange={e => setDescription(e.target.value)}/>
                                <h5 className={"mt-3"}>Yana taxrirlash uchun</h5>
                                <label htmlFor="name">Mahsulot nomi</label>
                                <input type="text" className={"form-control"}
                                       placeholder={"mahsulot nomini taxrirlang"} id={"name"} name={"name"}
                                       value={name} onChange={e => setName(e.target.value)}/>
                                <label htmlFor="description" className={"mt-3"}>mahsulot narxi</label>
                                <input type="number" className={"form-control"}
                                       placeholder={"mahsulot narxini taxrirlang"} id={"price"} name={"price"}
                                       value={price} onChange={e => setPrice(e.target.value)}/>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal"
                                    onClick={() => clear()}>Yopish
                            </button>
                            {description.trim().length === 0 ? (
                                <>
                                    <button type="button" className="btn btn-primary disabled" data-bs-toggle="modal"
                                            data-bs-target="#uploadCategoryPhoto">Saqlash
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button type="button" className="btn btn-primary"
                                            onClick={() => editProduct()}>Saqlash
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="editPrice" tabIndex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Mahsulotni taxrirlash</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close" onClick={() => clear()}></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <label htmlFor="description" className={"mt-3"}>mahsulot narxi</label>
                                <input type="number" className={"form-control"}
                                       placeholder={"mahsulot narxini taxrirlang"} id={"price"} name={"price"}
                                       value={price} onChange={e => setPrice(e.target.value)}/>
                                <label htmlFor="description">mahsulot tavfsiloti</label>
                                <label htmlFor="name">Mahsulot nomi</label>
                                <input type="text" className={"form-control"}
                                       placeholder={"mahsulot nomini taxrirlang"} id={"name"} name={"name"}
                                       value={name} onChange={e => setName(e.target.value)}/>
                                <h5 className={"mt-3"}>Yana taxrirlash uchun</h5>
                                <input type="text" className={"form-control"}
                                       placeholder={"mahsulot tavfsilotini taxrirlang"} id={"description"}
                                       name={"description"}
                                       value={description} onChange={e => setDescription(e.target.value)}/>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal"
                                    onClick={() => clear()}>Yopish
                            </button>
                            {price.trim().length === 0 ? (
                                <>
                                    <button type="button" className="btn btn-primary disabled">Saqlash
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button type="button" className="btn btn-primary"
                                            onClick={() => editProduct()}>Saqlash
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="deleteProduct" tabIndex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5 text-danger" id="exampleModalLabel">Kategoriyani olib
                                tashlash</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close" onClick={() => setName("")}></button>
                        </div>
                        <div className="modal-body">
                            <h5 className={"text-danger"}>siz ushbu mahsulotni o'chirishga rozimisiz?</h5>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-warning" data-bs-dismiss="modal"
                                    onClick={() => setName("")}>Yo'q roziemasman
                            </button>
                            <button type="button" className="btn btn-danger" onClick={() => deleteProduct()}>Ha roziman
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}