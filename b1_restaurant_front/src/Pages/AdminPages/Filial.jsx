import {useEffect, useState} from "react";
import axios from "axios";
import {BASE_URL} from "../../Services/BaseUrl.js";
import {Apis} from "../../Services/Apis.js";
import {Pagenation} from "../../Component/Pagenation.jsx";
import {GetColor} from "../../Services/service.js";
import {toast} from "react-toastify";
import {resStatus} from "../../handler/ResponseStatus.js";

export const Filial = () => {
    const [color, setColor] = useState([])
    const [country, setCountry] = useState([])
    const [region, setRegion] = useState([])
    const [district, setDistrict] = useState([])
    const [search, setSearch] = useState('')
    const [search1, setSearch1] = useState('')
    const [search2, setSearch2] = useState('')

    const getFilial = async () => {
        const res = await axios.get(BASE_URL + Apis.filial + "list")
        setCountry(res.data)
        const res1 = await axios.get(BASE_URL + Apis.filial + "regionList")
        setRegion(res1.data)
        const res2 = await axios.get(BASE_URL + Apis.filial + "districtList")
        setDistrict(res2.data)
    }

    const getColor = async () => {
        await GetColor(setColor, localStorage.getItem("uuid"))
    }
    useEffect(() => {
        getFilial()
        getColor()
    }, [])


    const [currentPage, setCurrentPage] = useState(1);
    const [prePage] = useState(5)
    const indexOfLastData = currentPage * prePage;
    const indexOfFirstData = indexOfLastData - prePage;
    const currentData = country.slice(indexOfFirstData, indexOfLastData);
    const currentData1 = region.slice(indexOfFirstData, indexOfLastData);
    const currentData2 = district.slice(indexOfFirstData, indexOfLastData)
    const paginate = (pageNumber) => setCurrentPage(pageNumber)
    const paginate1 = (pageNumber) => setCurrentPage(pageNumber)

    const paginate3 = (pageNumber) => setCurrentPage(pageNumber)

    const filter = country.filter(item => item.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
    const filter1 = region.filter(item => item.name.toLocaleLowerCase().includes(search1.toLocaleLowerCase()))
    const filter2 = district.filter(item => item.name.toLocaleLowerCase().includes(search2.toLocaleLowerCase()))

    return (
        <div style={{height: "auto", backgroundColor: `${color.bgColor}`}}>
            <form action="">
                <input type="search" className={"form-control mb-2"} placeholder={"shu yerda qidiring"} value={search} onChange={e => setSearch(e.target.value)} id={"search"} name={"search"}/>
            </form>
            {search.length === 0 ? (
                <>
                    <CountryJon data={currentData} color={color}/>
                    <div className={"veryBig mb-8 d-flex align-items-center"}>
                        <div className={"pagen"}>
                            <Pagenation totalData={country.length} perPage={prePage} paginate={paginate}/>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    {filter.length === 0 ? (
                        <>
                            <CountryJon data={null} color={color}/>
                            <div className={"veryBig mb-8 d-flex align-items-center"}>
                                <div className={"pagen"}>
                                    <Pagenation totalData={country.length} perPage={prePage} paginate={paginate}/>
                                </div>

                            </div>
                        </>
                    ) : (
                        <>
                            <CountryJon data={filter} color={color}/>
                            <div className={"veryBig mb-8 d-flex align-items-center"}>
                                <div className={"pagen"}>
                                    <Pagenation totalData={filter.length} perPage={prePage} paginate={paginate}/>
                                </div>
                            </div>
                        </>
                    )}
                </>
            )}
            <form action="">
                <input type="search" className={"form-control mb-2"} placeholder={"shu yerda qidiring"} value={search1} onChange={e => setSearch1(e.target.value)} id={"search"} name={"search"}/>
            </form>
            {search1.length === 0 ? (
                <>
                    <Region data={currentData1} color={color} country={country}/>
                    <div className={"veryBig col-12 mb-8 d-flex align-items-center"}>
                        <div className={"pagen"}>
                            <Pagenation totalData={region.length} perPage={prePage} paginate={paginate1}/>
                        </div>
                    </div>

                </>
            ) : (
                <>
                    {filter1.length === 0 ? (
                        <>
                            <Region data={null} color={color} country={country}/>
                            <div className={"veryBig col-12 mb-8 d-flex align-items-center"}>
                                <div className={"pagen"}>
                                    <Pagenation totalData={null} perPage={prePage} paginate={paginate1}/>
                                </div>

                            </div>

                        </>
                    ) : (
                        <>
                            <Region data={filter1} color={color} country={country}/>
                            <div className={"veryBig col-12 mb-8 d-flex align-items-center"}>
                                <div className={"pagen"}>
                                    <Pagenation totalData={filter1.length} perPage={prePage} paginate={paginate1}/>
                                </div>
                            </div>
                        </>
                    )}
                </>
            )}

            <form action="">
                <input type="search" value={search2} className={"form-control mb-2"} placeholder={"shu yerda qidiring"} onChange={e => setSearch2(e.target.value)} id={"search"} name={"search"}/>
            </form>
            {search2.length === 0 ? (

                <>
                    <div style={{height: "120vh"}}>
                        <DistrictJon data={currentData2} color={color} region={region} getDistrict={district}
                                     country={country}/>
                        <div className={"veryBig col-12 d-flex align-items-center"}>
                            <div className={"pagen"}>
                                <Pagenation totalData={district.length} perPage={prePage} paginate={paginate3}/>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    {filter2.length === 0 ? (
                        <>
                            <div style={{height: "120vh"}}>
                                <DistrictJon data={null} color={color} region={region}
                                             country={country}/>
                                <div className={"veryBig col-12 d-flex align-items-center"}>
                                    <div className={"pagen"}>
                                        <Pagenation totalData={district.length} perPage={prePage} paginate={paginate3}/>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <div style={{height: "120vh"}}>
                                <DistrictJon data={filter2} color={color} region={region}
                                             country={country}/>
                                <div className={"veryBig col-12 d-flex align-items-center"}>
                                    <div className={"pagen"}>
                                        <Pagenation totalData={filter2.length} perPage={prePage} paginate={paginate3}/>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </>
            )}


        </div>
    )


}

const CountryJon = ({data, color}) => {
    const [name, setName] = useState('')
    const [id, setId] = useState('')
    const clear = () => {
        setName("")
    }

    const editName = async () => {
        const data = {
            name
        }
        try {
            const res = await axios.put(BASE_URL + Apis.filial + id, data)
            if (resStatus(res.status)) {
                setTimeout(() => {
                    window.location.reload()
                }, 2000)
                return toast.success(res.data.message, {position: toast.POSITION.TOP_CENTER})
            }
        } catch (err) {
            if (err.response.status === 409) {
                return toast.error(err.response.data.message, {position: "top-center"})
            }
            toast.error(err.message)
        }
    }
    const addCountry = async () => {
        const data = {
            name
        }
        try {
            const res = await axios.post(BASE_URL + Apis.filial, data)
            toast.success(res.data.message, {position: toast.POSITION.TOP_CENTER})
            setTimeout(() => {
                window.location.reload()
            }, 2000)
        } catch (err) {
            if (err.response.status === 409) {
                toast.error(err.response.data.message, {position: toast.POSITION.TOP_CENTER})
            }
            toast.error(err.message)
        }
    }

    return (
        <div style={{backgroundColor: `${color.bgColor}`}}>
            <div className={"row"}>
                <div className="col-12">
                    <div className="card" style={{backgroundColor: `${color.textColor}`}}>
                        <div className={"card-header"}>
                            <button className={"btn btn-primary"} data-bs-toggle="modal"
                                    data-bs-target="#addCountry">Davlat qo'shish
                            </button>
                        </div>
                        <div className="card-body ">
                            <div className={"table-responsive"}>
                                <table className={"table"}>
                                    {data === null ? (
                                        <>
                                            <h1 className={"text-center text-danger"}>no value!!</h1>
                                        </>
                                    ) : (
                                        <>
                                            <thead style={{color: `${color.bgColor}`}}>
                                            <tr>
                                                <th className={"col-4"}>T/r</th>
                                                <th className={"col-4"}>Nomi</th>
                                                <th className={"col-4"}>Jarayon</th>
                                            </tr>
                                            </thead>
                                            <tbody style={{color: `${color.bgColor}`}}>

                                            {data.map((item, i) => (
                                                <tr>
                                                    <td className={'col-4'}>{i + 1}</td>
                                                    <td className={'col-4'}>{item.name}
                                                        <button style={{
                                                            border: "0",
                                                            color: "#f1c40f",
                                                            backgroundColor: "transparent"
                                                        }} onClick={() => setId(item.id)} data-bs-toggle="modal"
                                                                data-bs-target="#editName">
                                                            <i
                                                                className={"bi-pencil"}></i></button>
                                                    </td>
                                                    <td className={'col-4'}>
                                                        <div className={"Action"}>
                                                            <button className={"btn btn-danger"}
                                                                    onClick={() => setId(item.id)}
                                                                    data-bs-toggle="modal"
                                                                    data-bs-target="#deleteDavlat"><i
                                                                className={"bi-trash"}></i>
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
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
            <div className="modal fade" id="addCountry" tabIndex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Davalat qo'shish</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close" onClick={() => clear()}></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <label htmlFor="name">
                                    Davlat nomi
                                </label>
                                <input type="text" className={"form-control "} id={"name"} name={"name"}
                                       placeholder={"Davlat nomini kiriting"} value={name}
                                       onChange={e => setName(e.target.value)}/>

                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal"
                                    onClick={() => clear()}>Yopish
                            </button>
                            {name.trim().length === 0 ? (
                                <>
                                    <button type="button" className="btn btn-primary disabled">Saqlash
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button type="button" className="btn btn-primary"
                                            onClick={() => addCountry()}>Saqlash
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="editName" tabIndex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Taxrirlash</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close" onClick={() => clear()}></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <label htmlFor="name">
                                    Nomi
                                </label>
                                <input type="text" className={"mb-3 form-control"} id={"name"} name={"name"}
                                       placeholder={"Nomini taxrirlang"} value={name}
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
                                            data-bs-target="#uploadProductPhoto">Saqlash
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button type="button" className="btn btn-primary" onClick={() => editName()}>Saqlash
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="deleteDavlat" tabIndex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Olib tashlash</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close" onClick={() => clear()}></button>
                        </div>
                        <div className="modal-body">
                            <h5 className={"text-danger"}>Siz ushbu davlatni o'chirmoqchimisiz?</h5>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Yo'q
                            </button>
                            <button type="button" className="btn btn-danger" onClick={() => deleteJon(id, "")}>Ha
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const Region = ({data, color, country}) => {
    const [name, setName] = useState('')
    const [countryId, setCountryId] = useState('')
    const [id, setId] = useState('')

    const clear = () => {
        setName("")
    }
    const edit = async () => {
        const data = {
            name
        }
        try {
            const res = await axios.put(BASE_URL + Apis.filial + "region/" + id, data)
            if (resStatus(res.status)) {
                setTimeout(() => {
                    window.location.reload()
                }, 2000)
                return toast.success(res.data.message)
            }
        } catch (err) {
            if (err.response.status === 409) {
                return toast.error(err.response.data.message)
            }
            toast.error(err.message)
        }
    }
    const addRegion = async () => {
        const data = {
            name, countryId
        }
        try {
            const res = await axios.post(BASE_URL + Apis.filial + "addRegion", data)
            if (resStatus(res.status)) {
                setTimeout(() => {
                    window.location.reload()
                }, 2000)
                return toast.success(res.data.message, {position: toast.POSITION.TOP_CENTER})
            }
        } catch (err) {
            if (err.response.status === 409) {
                return toast.dark(err.response.data.message, {position: toast.POSITION.TOP_CENTER})
            }
            toast.error(err.message)
        }
    }
    return (
        <div>
            <div style={{height: "auto"}}>
                <div className={"row"}>
                    <div className="col-12" style={{backgroundColor: `${color.bgColor}`}}>
                        <div className="card" style={{backgroundColor: `${color.textColor}`}}>
                            <div className={"card-header"}>
                                <button className={"btn btn-info"} data-bs-toggle="modal"
                                        data-bs-target="#addRegion">Viloyat qo'shish
                                </button>
                            </div>
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className={"table"}>
                                        {data === null ? (
                                            <>
                                                <h1 className={"text-center text-danger"}>Hech narsa topilmadi</h1>
                                            </>
                                        ) : (
                                            <>
                                                <thead style={{color: `${color.bgColor}`}}>
                                                <tr>
                                                    <th className={"col-3"}>T/r</th>
                                                    <th className={"col-3"}>Nomi</th>
                                                    <th className={"col-3"}>Davlat</th>
                                                    <th className={"col-3"}>Jarayon</th>
                                                </tr>
                                                </thead>
                                                <tbody style={{color: `${color.bgColor}`}}>

                                                {data.map((item, i) => (
                                                    <tr>
                                                        <td className={'col-3'}>{i + 1}</td>
                                                        <td className={'col-3'}>{item.name}
                                                            <button style={{
                                                                border: "0",
                                                                color: "#f1c40f",
                                                                backgroundColor: "transparent"
                                                            }} onClick={() => setId(item.id)} data-bs-toggle="modal"
                                                                    data-bs-target="#editname">
                                                                <i
                                                                    className={"bi-pencil"}></i></button>
                                                        </td>
                                                        <td className={"col-3"}>{item.country.name}</td>
                                                        <td className={'col-3'}>
                                                            <button className={"btn btn-danger"}
                                                                    onClick={() => setId(item.id)}
                                                                    data-bs-toggle="modal"
                                                                    data-bs-target="#deleteViloyat"><i
                                                                className={"bi-trash"}></i>
                                                            </button>
                                                        </td>
                                                    </tr>
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
            <div className="modal fade" id="addRegion" tabIndex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog ">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Viloyat qo'shish</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close" onClick={() => clear()}></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <label htmlFor="name">
                                    Viloyat nomi
                                </label>
                                <input type="text" className={"mb-3 form-control"} id={"name"} name={"name"}
                                       placeholder={"Region nomini kiriting"} value={name}
                                       onChange={e => setName(e.target.value)}/>
                                <label htmlFor="name">
                                    Davlatni tanlang
                                </label>
                                <select name="countryId" id="countryId" size={10} className={"form-select"}
                                        value={countryId}
                                        onChange={e => setCountryId(e.target.value)}>
                                    <option value="0" className={"disabled"}>Tanlang</option>
                                    {country.map((item) => (
                                        <option value={item.id}>{item.name}</option>
                                    ))}
                                </select>

                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal"
                                    onClick={() => clear()}>Yopish
                            </button>
                            {name.trim().length === 0 || countryId.length === 0 || countryId === "0" ? (
                                <>
                                    <button type="button" className="btn btn-primary disabled">Saqlash
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button type="button" className="btn btn-primary"
                                            onClick={() => addRegion()}>Saqlash
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="editname" tabIndex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Taxrirlash</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close" onClick={() => clear()}></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <label htmlFor="name">
                                    Nomi
                                </label>
                                <input type="text" className={"mb-3 form-control"} id={"name"} name={"name"}
                                       placeholder={"Nomini taxrirlang"} value={name}
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
                                            data-bs-target="#uploadProductPhoto">Saqlash
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button type="button" className="btn btn-primary" onClick={() => edit()}>Saqlash
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="deleteViloyat" tabIndex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Olib tashlash</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close" onClick={() => clear()}></button>
                        </div>
                        <div className="modal-body">
                            <h5 className={"text-danger"}>Siz ushbu viloyatni o'chirmoqchimisiz?</h5>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Yo'q
                            </button>
                            <button type="button" className="btn btn-danger" onClick={() => deleteJon(id, "region/")}>Ha
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const DistrictJon = ({data, color, country}) => {
    const [id, setId] = useState('')
    const [name, setName] = useState('')
    const [regionId, setRegionId] = useState('')
    const [countryId, setCountryId] = useState('')
    const [region, setRegion] = useState([])
    const getViloyat = async () => {
        try {
            const res = await axios.get(BASE_URL + Apis.filial + countryId)
            setRegion(res.data)
        } catch (err) {

        }
    }
    const addDistrict = async () => {
        const data = {
            name, regionId
        }
        try {
            const res = await axios.post(BASE_URL + Apis.filial + "addDistrict", data)
            if (resStatus(res.status)) {
                clear()
                setTimeout(() => {
                    window.location.reload()
                }, 2000)
                return toast.success(res.data.message)
            }
        } catch (err) {
            toast.error(err.message, {position: "top-left"})
            clear()
        }
    }
    const clear = () => {
        setName("")
        setCountryId("")
        setRegionId("")
    }
    return (
        <div>
            <div style={{height: "auto", backgroundColor: `${color.textColor}`}}>
                <div className={"row"}>
                    <div className="col-12">
                        <div className="card" style={{backgroundColor: `${color.textColor}`}}>
                            <div className={"card-header"}>
                                <button className={"btn btn-info"} data-bs-toggle="modal"
                                        data-bs-target="#addDistrict">Shahar qo'shish
                                </button>
                            </div>
                            <div className="card-body">
                                <div className={"table-responsive"}>
                                    <table className={"table"}>
                                        {data === null ? (
                                            <>
                                                <h3 className={"text-center text-danger"}>hech narsa topilamdi</h3>
                                            </>
                                        ) : (
                                            <>
                                                <thead style={{color: `${color.bgColor}`}}>
                                                <tr>
                                                    <th className={"col-3"}>T/r</th>
                                                    <th className={"col-3"}>Nomi</th>
                                                    <th className={"col-3"}>Viloyat</th>
                                                    <th className={"col-3"}>Jarayon</th>
                                                </tr>
                                                </thead>
                                                <tbody style={{color: `${color.bgColor}`}}>
                                                {data.map((item, i) => (
                                                    <tr>
                                                        <td className={'col-3'}>{i + 1}</td>
                                                        <td className={'col-3'}>{item.name}
                                                            <button style={{
                                                                border: "0",
                                                                color: "#f1c40f",
                                                                backgroundColor: "transparent"
                                                            }} onClick={() => setId(item.id)} data-bs-toggle="modal"
                                                                    data-bs-target="#editDistrict">
                                                                <i
                                                                    className={"bi-pencil"}></i></button>
                                                        </td>
                                                        <td className={"col-3"}>{item.region.name}</td>
                                                        <td className={'col-3'}>
                                                            <button className={"btn btn-danger"}
                                                                    onClick={() => setId(item.id)}
                                                                    data-bs-toggle="modal"
                                                                    data-bs-target="#deleteDistrict"><i
                                                                className={"bi-trash"}></i>
                                                            </button>
                                                        </td>
                                                    </tr>
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
            <div className="modal fade" id="addDistrict" tabIndex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog ">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Shahar qo'shish</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close" onClick={() => clear()}></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <label htmlFor="name">
                                    Shahar(Tuman) nomi
                                </label>
                                <input type="text" className={"mb-3 form-control"} id={"name"} name={"name"}
                                       placeholder={"Shahar (Tuman) nomini kiriting"} value={name}
                                       onChange={e => setName(e.target.value)}/>
                                <label htmlFor="name">
                                    Davlatni tanlang
                                </label>
                                <select name="countryId" id="countryId" className={"form-select"} value={countryId}
                                        onChange={e => setCountryId(e.target.value)} onClick={() => getViloyat()}>
                                    <option value="0">Tanlang</option>
                                    {country.map((item) => (
                                        <>
                                            <option value={item.id}>{item.name}</option>
                                        </>
                                    ))}
                                </select>
                                <label htmlFor="name">
                                    Viloyatni tanlang
                                </label>
                                <select name="regionId" id="regionId" size={5} className={"form-select"}
                                        value={regionId}
                                        onChange={e => setRegionId(e.target.value)}>
                                    <option value="0" className={"disabled"}>Tanlang</option>
                                    {region.map((item) => (
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
                            {name.trim().length === 0 || regionId.length === 0 || regionId === "0" ? (
                                <>
                                    <button type="button" className="btn btn-primary disabled">Saqlash
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button type="button" className="btn btn-primary" data-bs-dismiss={"modal"}
                                            onClick={() => addDistrict()}>Saqlash
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="editDistrict" tabIndex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog ">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Taxrirlash</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close" onClick={() => clear()}></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <label htmlFor="name">
                                    Shahar(Tuman) nomi
                                </label>
                                <input type="text" className={"mb-3 form-control"} id={"name"} name={"name"}
                                       placeholder={"Shahar (Tuman) nomini taxrirlang"} value={name}
                                       onChange={e => setName(e.target.value)}/>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal"
                                    onClick={() => clear()}>Yopish
                            </button>
                            {name.trim().length === 0 ? (
                                <>
                                    <button type="button" className="btn btn-primary disabled">Taxrirlash
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button type="button" className="btn btn-primary" data-bs-dismiss={"modal"}
                                            onClick={() => editJon(id, "district/", name)}>Taxrirlash
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="deleteDistrict" tabIndex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Olib tashlash</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close" onClick={() => clear()}></button>
                        </div>
                        <div className="modal-body">
                            <h5 className={"text-danger"}>Siz ushbu tumanni o'chirmoqchimisiz?</h5>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Yo'q
                            </button>
                            <button type="button" className="btn btn-danger"
                                    onClick={() => deleteJon(id, "district/")}>Ha
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const editJon = async (id, yol, name) => {
    const data = {
        name
    }
    try {
        const res = await axios.put(BASE_URL + Apis.filial + yol + id, data)
        if (resStatus(res.status)) {
            setTimeout(() => {
                window.location.reload()
            }, 2000)
            return toast.success(res.data.message, {position: "top-center"})
        }
    } catch (err) {
        toast.dark(err.message, {position: "top-center"})
    }
}

const deleteJon = async (id, yol) => {
    try {
        const res = await axios.delete(BASE_URL + Apis.filial + yol + id)
        if (resStatus(res.status)) {
            setTimeout(() => {
                window.location.reload()
            }, 2000)
            return toast.success(res.data.message, {position: "top-center"})
        }
    } catch (err) {
        toast.error(err.message, {position: "top-center"})
    }
}