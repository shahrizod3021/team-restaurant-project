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
    const [currentPage, setCurrentPage] = useState(1);
    const [prePage] = useState(5)

    const [category, setCategory] = useState([])
    const [color, setColor] = useState({})
    const getColor = async () => {
        await GetColor(setColor, localStorage.getItem("uuid"))
    }
    const getCategory = async () => {
        const res = await axios.get(BASE_URL + Apis.category + "/list")
        setCategory(res.data);
    }

    useEffect(() => {
        getColor()
        getCategory()
    }, [])

    const indexOfLastData = currentPage * prePage;
    const indexOfFirstData = indexOfLastData - prePage;
    const currentData = category.slice(indexOfFirstData, indexOfLastData);
    const paginate = (pageNumber) => setCurrentPage(pageNumber)
    const [search, setSearch] = useState('')
    const filter = category.filter(item => item.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
    return (
        <div style={{height: "110vh"}}>
            <form className={"mb-2 input-group"}>
                <input type="search"
                       value={search}
                       onChange={e => setSearch(e.target.value)}
                       className={"form-control"}
                       placeholder={"shu yerda qidiring"}
                />
            </form>
            {search.length === 0 ? (
                <>
                    <CategoryJon data={currentData} color={color} getCategory={() => getCategory()}/>
                    <Pagenation totalData={category.length} perPage={prePage} paginate={paginate}/>
                </>
            ) : (
                <>
                    {filter.length === 0 ? (
                        <>
                            <CategoryJon data={null} color={color} getCategory={() => getCategory()}/>
                            <Pagenation totalData={category.length} perPage={prePage} paginate={paginate}/>
                        </>
                    ) : (
                        <>
                            <CategoryJon data={filter} color={color} getCategory={() => getCategory()}/>
                            <Pagenation totalData={filter.length} perPage={prePage} paginate={paginate}/>
                        </>
                    )}
                </>
            )}

        </div>
    )
}

const CategoryJon = ({data, color, getCategory}) => {
    const [name, setName] = useState('')
    const [id, setId] = useState('')
    const [choose, setChoose] = useState('')

    const categoryPhoto = async () => {
        let rasm = document.getElementById("rasm").files[0]
        const formData = new FormData()
        formData.append("photo", rasm);
        await PhotoUpload(formData);
        const photoId = localStorage.getItem("categoryPhoto");
        if (choose === "add") {
            try {
                await axios.put(BASE_URL + Apis.category + "/upload/" + localStorage.getItem("categoryId") + "?categoryPhoto=" + photoId)
                getCategory()
                toast("Category saqalandi", {position: "top-center"})
            } catch (err) {
                toast.error("Ushbu nomdagi categoriya bizda mavjud", {position: "top-center"})
            }
        }
        if (choose === "edit") {
            const res = await axios.put(BASE_URL + Apis.category + "/upload/" + id + "?categoryPhoto=" + photoId)
            toast.success(res.data.message, {position: "top-center"})
            getCategory()
        }
    }


    const addCategoery = async () => {
        const data = {
            name
        }
        await AddCategory(data)
    }

    const editCategory = async () => {
        const data = {
            name
        }
        await EditCategory(data, id)
        getCategory()
    }

    const deleteCategory = async () => {
        await DeleteCategory(id)
        getCategory()
    }

    const clear = () => {
        setName("")
        setId("")
    }
    const change = (id, choose) => {
        setId(id)
        setChoose(choose)
    }
    return (
        <div>
            <div className={"row"} style={{height: "auto"}}>
                <div className="col-12 ">
                    <div className="card" style={{backgroundColor: `${color.textColor}`}}>
                        <div className="card-body" style={{color: `${color.bgColor}`}}>
                            <h4>Kategoriyalar jadvali</h4>
                            <div className={"row"}>
                                <div className="col-12">
                                    <button type="button" className="btn btn-primary mb-2" data-bs-toggle="modal"
                                            data-bs-target="#addModal" onClick={() => change(null, "add")}>
                                        Kategoriya yaratish <i className={"bi-plus-circle"}></i>
                                    </button>
                                    <div className="table-responsive">
                                        <table className="table ">
                                            {data === null ? (
                                                <>
                                                    <h3 className={"text-center text-danger"}>hech narsa topilamdi</h3>
                                                </>
                                            ) : (
                                                <>
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
                                                                         height={"30"}
                                                                         src={Apis.getPhoto + item.photoId}
                                                                         alt=""/>
                                                                    <button style={{
                                                                        border: "0",
                                                                        color: "#f1c40f",
                                                                        backgroundColor: "transparent"
                                                                    }} onClick={() => change(item.id, "edit")}
                                                                            data-bs-toggle="modal"
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
                                                                    }} onClick={() => change(item.id, "edit")}
                                                                            data-bs-toggle="modal"
                                                                            data-bs-target="#editName"><i
                                                                        className={"bi-pencil"}></i></button>
                                                                </td>
                                                                <td>
                                                                    <div className={"Action"}>
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
                                                </>
                                            )}

                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="addModal" tabIndex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog ">
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
                                    onClick={() => clear()}>Yopish
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
                                    aria-label="Close" onClick={() => clear()}></button>
                        </div>
                        <div className="modal-body">
                            <div className={"col-12"} style={{height: '16%', borderStyle: 'dashed'}}>
                                {data === null ? (
                                    <>

                                    </>
                                ) : (
                                    <>
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
                                                            <input type="file" className={"d-none"} id={"rasm"}
                                                                   name={"rasm"}
                                                                   onChange={() => categoryPhoto()} required/>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <label className={"w-100 d-flex flex-column"}
                                                                   style={{height: '100%'}} htmlFor={"rasm"}>
                                                                <h2 className={"text-center"}>Rasmni taxrirlang</h2>
                                                                <img src={Apis.getPhoto + item.photoId} alt=""/>
                                                            </label>
                                                            <input type="file" className={"d-none"} id={"rasm"}
                                                                   name={"rasm"}
                                                                   onChange={() => categoryPhoto()}
                                                                   required/>
                                                        </>
                                                    )}
                                                </>
                                            ) : (
                                                <>
                                                </>
                                            ))
                                        ))}
                                    </>
                                )}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="uploadCategoryPhoto" tabIndex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog modal-lg">
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
                                       onChange={() => categoryPhoto()}/>
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
                                    <button type="button" className="btn btn-primary disabled">Saqlash
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
