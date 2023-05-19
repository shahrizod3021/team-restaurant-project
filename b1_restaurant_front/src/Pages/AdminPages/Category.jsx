import {useEffect, useState} from "react";
import {AddCategory, DeleteCategory, EditCategory, GetColor, PhotoUpload} from "../../Services/service.js";
import axios from "axios";
import {BASE_URL} from "../../Services/BaseUrl.js";
import {Apis} from "../../Services/Apis.js";
import {toast} from "react-toastify";
import '../../assets/SideBar.css'
import {Link, useNavigate} from "react-router-dom";
import {Pagenation} from "../../Component/Pagenation.jsx";

export const Category = () => {
    const [category, setCategory] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [prePage] = useState(5)

    const indexOfLastData = currentPage * prePage;
    const indexOfFirstData = indexOfLastData - prePage;
    const currentData = category.slice(indexOfFirstData, indexOfLastData);

    const getCategory = async () => {
        const res = await axios.get(BASE_URL + Apis.category + "/list")
        setCategory(res.data);
    }

    useEffect(() => {
        getCategory()
    }, [])
    const paginate = (pageNumber) => setCurrentPage(pageNumber)
    return (
        <div>
            <Pagenation totalData={category.length} perPage={prePage}  paginate={paginate}/>
            <CategoryJon data={currentData} method={() => getCategory()} />
        </div>
    )
}

const CategoryJon = ({data, method}) => {
    const [name, setName] = useState('')
    const [id, setId] = useState('')
    const [color, setColor] = useState({})
    const getColor = async () => {
        await GetColor(setColor, localStorage.getItem("uuid"))
    }

    useEffect(() => {
        getColor()
        method()
    }, [])

    const uploadCategoryPhoto = async () => {
        let rasm = document.getElementById("rasm").files[0]
        const formData = new FormData()
        formData.append("photo", rasm);
        await PhotoUpload(formData);
        const photoId = localStorage.getItem("categoryPhoto");
        try {
            const res = await axios.put(BASE_URL + Apis.category + "/upload/" + localStorage.getItem("categoryId") + "?categoryPhoto=" + photoId)
            toast("Categoriya saqlandi")
            method()
        } catch (err) {
            toast.error("Ushbu nomdagi categoriya bizda mavjud")
        }
    }

    const editCategoryPhoto = async () => {
        let rasm = document.getElementById("rasm").files[0]
        const formData = new FormData()
        formData.append("photo", rasm);
        await PhotoUpload(formData);
        const photoId = localStorage.getItem("categoryPhoto");
        try {
            const res = await axios.put(BASE_URL + Apis.category + "/upload/" + id + "?categoryPhoto=" + photoId)
            toast("categoriya rasmi taxrirlandi")
            setTimeout(() => (
                window.location.reload()
            ), 2000)
        } catch (err) {
            toast.error("rasm saqlashda hatolik")
        }
    }

    const addCategoery = async () => {
        const data = {
            name
        }
        await AddCategory(data)
        method()
    }

    const editCategory = async () => {
        const data = {
            name
        }
        await EditCategory(data, id)
        method()
    }

    const deleteCategory = async () => {
        await DeleteCategory(id)
        method()
    }
    return (
        <div>
            <div className={"row"} style={{height: "100vh"}}>
                <div className="col-12 " style={{}}>
                    <div className="card" style={{backgroundColor: `${color.textColor}`}}>
                        <div className="card-body" style={{color: `${color.bgColor}`}}>
                            <h4 className="">Kategoriyalar jadvali</h4>
                            <div className={"row"}>
                                <div className="col-12">
                                    <button type="button" className="btn btn-primary mb-2" data-bs-toggle="modal"
                                            data-bs-target="#exampleModal">
                                        Kategoriya yaratish <i className={"bi-plus-circle"}></i>
                                    </button>
                                    <div className="table-responsive">
                                        <table className="table ">
                                            <thead>
                                            <tr style={{color: `${color.bgColor}`}}>
                                                <th className={"col-2"}> Rasm</th>
                                                <th className={"col-2"}> Id</th>
                                                <th className={"col-3"}> Nomi</th>
                                                <th className={"col-3"}> Jarayonlar</th>
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
                                                                    data-bs-target="#editCategoryPhoto"><i
                                                                className={"bi-pencil"}></i></button>
                                                        </td>
                                                        <td>{i + 1}</td>
                                                        <td>
                                                            <span className={"me-3"}>{item.name}</span>
                                                            <button style={{
                                                                border: "0",
                                                                color: "#f1c40f",
                                                                backgroundColor: "transparent"
                                                            }} onClick={() => setId(item.id)} data-bs-toggle="modal"
                                                                    data-bs-target="#editName"><i
                                                                className={"bi-pencil"}></i></button>
                                                        </td>
                                                        <td>
                                                            <div className={"categoryAction"}>
                                                                <button className={"btn btn-danger me-2"}
                                                                        data-bs-toggle="modal"
                                                                        data-bs-target="#deleteCategory"
                                                                        onClick={() => setId(item.id)}><i
                                                                    className={"bi-trash"}></i></button>
                                                                <Link to={"/category/" + item.id}
                                                                      className={" btn btn-primary"}><i
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
            </div>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Kategoriya yaratish</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close" onClick={() => setName("")}></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <label htmlFor="name">
                                    Kategoriya nomi
                                </label>
                                <input type="text" className={"form-control "}
                                       placeholder={"Kategoriyan nomini kiriting"} value={name}
                                       onChange={e => setName(e.target.value)}/>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal"
                                    onClick={() => setName("")}>Yopish
                            </button>
                            {name.trim().length === 0 ? (
                                <>
                                    <button type="button" className="btn btn-primary disabled" data-bs-toggle="modal"
                                            data-bs-target="#uploadCategoryPhoto">Keyingi
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button type="button" className="btn btn-primary" data-bs-toggle="modal"
                                            data-bs-target="#uploadCategoryPhoto" onClick={() => addCategoery()}>Keyingi
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="editCategoryPhoto" tabIndex="-1" aria-labelledby="exampleModalLabel"
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
                                {data.map((item) => (
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
                                                           onChange={(e) => editCategoryPhoto()}/>
                                                </>
                                            ) : (
                                                <>
                                                    <label className={"w-100 d-flex flex-column"}
                                                           style={{height: '100%'}} htmlFor={"rasm"}>
                                                        <h2 className={"text-center"}>Rasmni taxrirlang</h2>
                                                        <img src={Apis.getPhoto + item.photoId} alt=""/>
                                                    </label>
                                                    <input type="file" className={"d-none"} id={"rasm"} name={"rasm"}
                                                           onChange={(e) => editCategoryPhoto()}/>
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
            <div className="modal fade" id="uploadCategoryPhoto" tabIndex="-1" aria-labelledby="exampleModalLabel"
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
                                       onChange={(e) => uploadCategoryPhoto()}/>
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
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Kategoiya nomini taxrirlash</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close" onClick={() => setName("")}></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <label htmlFor="name">Kategoriya nomi</label>
                                <input type="text" className={"form-control"}
                                       placeholder={"kategoriyaning nomini taxrirlang"} id={"name"} name={"name"}
                                       value={name} onChange={e => setName(e.target.value)}/>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal"
                                    onClick={() => setName("")}>Yopish
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
                                            onClick={() => editCategory()}>Saqlash
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="deleteCategory" tabIndex="-1" aria-labelledby="exampleModalLabel"
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
                            <h5 className={"text-danger"}>siz ushbu kategoriyani o'chirishga rozimisiz?
                                ushbu kategoriya o'chirilsa bu categoriyadagi mahsulotlar ham o'chib <ketadi
                                    className=""></ketadi></h5>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-warning" data-bs-dismiss="modal"
                                    onClick={() => setName("")}>Yo'q roziemasman
                            </button>
                            <button type="button" className="btn btn-danger" onClick={() => deleteCategory()}>Ha roziman
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}