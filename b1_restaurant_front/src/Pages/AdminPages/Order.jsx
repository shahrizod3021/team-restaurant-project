import {useEffect, useState} from "react";
import axios from "axios";
import {BASE_URL} from "../../Services/BaseUrl.js";
import {Apis} from "../../Services/Apis.js";
import {GetColor} from "../../Services/service.js";
import {Loading} from "../../Component/Loading.jsx";
import {toast} from "react-toastify";
import {Pagenation} from "../../Component/Pagenation.jsx";

export const Order = () => {
    const [order, setOrder] = useState([])
    const [order1, setOrder1] = useState([])
    const [loading, setLoading] = useState(false)
    const [color, setColor] = useState({})
    const [currentPage, setCurrentPage] = useState(1);
    const [prePage] = useState(5)
    const indexOfLastData = currentPage * prePage;
    const indexOfFirstData = indexOfLastData - prePage;
    const currentData = order.slice(indexOfFirstData, indexOfLastData);
    const currentData1 = order1.slice(indexOfFirstData, indexOfLastData);
    const [search, setSearch] = useState('')
    const [search1, setSearch1] = useState('')

    const GetAll = async () => {
        const res = await axios.get(BASE_URL + Apis.order + "/list")
        setOrder(res.data)
        const res1 = await axios.get(BASE_URL + Apis.order + "/ordered")
        setOrder1(res1.data)
        await GetColor(setColor, localStorage.getItem("uuid"))
        setLoading(true)

    }
    useEffect(() => {
        GetAll()

    }, [])
    const paginate = (pageNumber) => setCurrentPage(pageNumber)
    const paginate1 = (pageNumber) => setCurrentPage(pageNumber)

    const filter = order.filter(item => item.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
    const filter1 = order.filter(item => item.name.toLocaleLowerCase().includes(search1.toLocaleLowerCase()))

    return (
        <div style={{height: "200vh"}}>
            <div>
                <input type="search" className={"form-control mb-2"} value={search}
                       onChange={e => setSearch(e.target.value)}
                       name={"search"} id={"search"} placeholder={"shu yerda qidiring"}/>
                {search.length === 0 ? (
                    <>
                        <OrderJon loading={loading} data={currentData} color={color} getAll={() => GetAll()}/>
                        <Pagenation totalData={order.length} perPage={prePage} paginate={paginate}/>
                    </>
                ) : (
                    <>
                        {filter.length === 0 ? (
                            <>
                                <OrderJon loading={loading} data={null} color={color} getAll={() => GetAll()}/>
                                <Pagenation totalData={order.length} perPage={prePage} paginate={paginate}/>
                            </>
                        ) : (
                            <>

                                <OrderJon loading={loading} data={filter} color={color} getAll={() => GetAll()}/>
                                <Pagenation totalData={filter.length} perPage={prePage} paginate={paginate}/>
                            </>
                        )}
                    </>
                )}
            </div>
            <div>
                <input type="search" className={"form-control mb-2"} value={search1}
                       onChange={e => setSearch1(e.target.value)}
                       name={"search"} id={"search"} placeholder={"shu yerda qidiring"}/>
                {search1.length === 0 ? (
                    <>
                        <Ordered data={currentData1} color={color} loading={loading}/>
                        <Pagenation totalData={order1.length} perPage={prePage} paginate={paginate1}/>
                    </>
                ) : (
                    <>
                        {filter1.length === 0 ? (
                            <>
                                <Ordered data={null} color={color} loading={loading}/>
                                <Pagenation totalData={order1.length} perPage={prePage} paginate={paginate1}/>
                            </>
                        ) : (
                            <>
                                <Ordered data={filter1} color={color} loading={loading}/>
                                <Pagenation totalData={filter1.length} perPage={prePage} paginate={paginate1}/>
                            </>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}

const OrderJon = ({data, color, getAll, loading}) => {
    const [ordered, setOrdered] = useState(false)

    const deliviring = async (id) => {
        try {
            setOrdered(false)
            const res = await axios.put(BASE_URL + Apis.order + "/" + id)
            toast.success(res.data.message, {position: "top-center"})
            setTimeout(() => (
                window.location.reload()
            ), 1000)
        } catch (err) {
            toast.error(err.message)
        }
    }

    return (
        <div style={{backgroundColor: `${color.bgColor}`}}>
            {loading ? (
                <>
                    <div className={"row"}>
                        <div className="col-12">
                            <div className="card" style={{backgroundColor: `${color.textColor}`}}>
                                <div className={"card-header"}>
                                    <h1 className={"text-center text-primary"}>Yetkizilinmagan zakazlar ro'yhati</h1>
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
                                                        <>
                                                            <tr>
                                                                <td className={'col-4'}>{i + 1}</td>
                                                                <td className={'col-4'}>{item.name}
                                                                </td>
                                                                <td className={'col-4'}>
                                                                    <div className={"form-check form-switch"}>
                                                                        <input value={ordered}
                                                                               onClick={() => deliviring(item.id)}
                                                                               className="form-check-input "
                                                                               type="checkbox"
                                                                               role="switch"
                                                                               id="flexSwitchCheckDefault"/>
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
                </>
            ) : (
                <>
                    <Loading/>
                </>
            )}

        </div>
    )
}

const Ordered = ({data, color, loading}) => {
    return (
        <div>
            {loading ? (
                <>
                    <div className={"row"}>
                        <div className="col-12">
                            <div className="card" style={{backgroundColor: `${color.textColor}`}}>
                                <div className={"card-header"}>
                                    <h1 className={"text-center text-primary"}>Yetkizilingan zakazlar ro'yhati</h1>
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
                                                        <th className={"col-4"}>price</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody style={{color: `${color.bgColor}`}}>
                                                    {data.map((item, i) => (
                                                        <>
                                                            {item.delivered === true ? (
                                                                <>
                                                                    <tr>
                                                                        <td className={'col-4'}>{i + 1}</td>
                                                                        <td className={'col-4'}>{item.name}</td>
                                                                        <td className={'col-4'}>{item.allPrice} so'm</td>
                                                                    </tr>
                                                                </>
                                                            ) : (
                                                                <>
                                                                </>
                                                            )}

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
                </>
            ) : (
                <>
                    <Loading/>
                </>
            )}
        </div>
    )
}
