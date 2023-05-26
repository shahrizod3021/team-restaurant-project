import {useEffect, useState} from "react";
import {GetColor, GetHistory} from "../../Services/service.js";
import {Pagenation} from "../../Component/Pagenation.jsx";
import {Loading} from "../../Component/Loading.jsx";
import {Apis} from "../../Services/Apis.js";
import axios from "axios";
import {BASE_URL} from "../../Services/BaseUrl.js";

export const History = () => {
    const [history, setHistory] = useState([])
    const [loading, setLoading] = useState(false)
    const [color, setColor] = useState({})
    const [currentPage, setCurrentPage] = useState(1);
    const [prePage] = useState(5)
    const indexOfLastData = currentPage * prePage;
    const indexOfFirstData = indexOfLastData - prePage;
    const currentData = history.slice(indexOfFirstData, indexOfLastData);
    const paginate = (pageNumber) => setCurrentPage(pageNumber)
    const getHistory = async () => {
        await GetHistory(setHistory)
        await GetColor(setColor, localStorage.getItem("uuid"))
        setLoading(true)
    }
    useEffect(() => {
        getHistory()
        console.log(history)
    }, [])

    return (
        <div>
            {loading ? (
                <>
                    <Historyjon data={currentData} color={color}/>
                    <Pagenation totalData={history.length} perPage={prePage} paginate={paginate}/>
                </>
            ) : (
                <>
                    <Loading/>
                </>
            )}

        </div>
    )
}

const Historyjon = ({data, color}) => {
    const [product, setProduct] = useState({})
    const [qozi, setQozi] = useState(Number)
    const [soni, setSoni] = useState(Number)
    const [sale, setSale] = useState({})

    const getProduct = async (id) => {
        if (id !== 0) {
            const res = await axios.get(BASE_URL + Apis.history + "/" + id)
            setProduct(res.data)
            setSoni(1)
        }
    }
    const getSale = async (id) =>{
        if (id !== 0){
            const res = await axios.get(BASE_URL + Apis.history + "/forSale/" + id)
            setSale(res.data)
            setQozi(1)
        }
    }
    return (
        <div>
            <div className={"row"} style={{height: "auto"}}>
                <div className="col-12 ">
                    <div className={"card"} style={{backgroundColor: `${color.textColor}`}}>
                        <div className={"card-body"} style={{color: `${color.bgColor}`}}>
                            <h4>Arxiv</h4>
                            <div className={"row"}>
                                <div className="col-12">
                                    <div className={"table-responsive"}>
                                        <table className="table ">
                                            {data === null ? (
                                                <>
                                                    <h3 className={'text-center text-danger'}>hech narsa topilmadi</h3>
                                                </>
                                            ) : (
                                                <>
                                                    <thead>
                                                    <tr style={{color: `${color.bgColor}`}}>
                                                        <th className={"col-2"}> Id</th>
                                                        <th className={"col-2"}> Foydalanuvchi ismi</th>
                                                        <th className={"col-3"}> Vaqt</th>
                                                        <th className={"col-3"}>Buyurtma Soni</th>
                                                        <th className={"col-3"}> Jarayon</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {data.map((item) => (
                                                        <>
                                                            <tr style={{color: `${color.bgColor}`}}>
                                                                <td>{item.id}</td>
                                                                <td>{item.name}</td>
                                                                <td>{item.date.substring(0, 10)}</td>
                                                                <td>{item.zakaz.howMuch}</td>
                                                                <td>
                                                                    {item.zakaz.products === null ? (
                                                                        <>
                                                                            <button className={'btn btn-primary'}
                                                                                    data-bs-toggle="modal"
                                                                                    data-bs-target="#getHistory"
                                                                                    onClick={() => getSale(item.zakaz.id)}
                                                                            >
                                                                                <i className={"bi-eye"}></i></button>
                                                                        </>
                                                                    ) : (
                                                                        <>
                                                                            <button className={'btn btn-primary'}
                                                                                    data-bs-toggle="modal"
                                                                                    data-bs-target="#getHistoryProduct"
                                                                                    onClick={() => getProduct(item.zakaz.id)}
                                                                            >
                                                                                <i className={"bi-eye"}></i></button>
                                                                        </>
                                                                    )}

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
            <div className="modal fade" id="getHistory" tabIndex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <img src={Apis.getPhoto + sale.photoId} alt={"rasm mavjud emas"}/>
                        <div className="modal-header">
                            <h5 className={"text-center"}>Aksiya nomi: <span className={"text-primary text-uppercase"}>{sale.name}</span></h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>

                        <div className="modal-body">
                            {qozi === 1 ? (
                                <>
                                    <h5>Ushbu aksiya mahsulotlari</h5>
                                    <div className={'d-flex'}>
                                        {sale.products.map((item) => (
                                            <>
                                                <p className={"text-warning"}>
                                                    {sale.products.length === 1 ? (<>{item.name}</>) : (<>{item.name} /</>)}
                                                </p>
                                            </>
                                        ))}
                                    </div>
                                </>
                            ) : (
                                <></>
                            )
                            }
                            <p style={{float: "right"}}>Umumiy summa: <span className={"text-warning"}>{sale.allPrice} so'm</span></p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="getHistoryProduct" tabIndex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        {soni === 1? (
                            <>   <img src={Apis.getPhoto + product.products.photoId} alt={"rasm mavjud emas"}/>
                                <div className="modal-header">
                                    <h5 className={"text-center"}>Mahsulot nomi: <span className={'text-primary'}>{product.name}</span></h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal"
                                            aria-label="Close"></button>
                                </div>

                                <div className="modal-body">
                                    <h6> Zakaz berilgan vaqt: {product.date.substring(0, 10)}</h6>
                                    <p style={{float: "right"}}>Jami Summa: <span className={"text-warning"}>{product.allPrice} so'm</span></p>
                                </div></>
                        ) : (
                            <></>
                        )}

                    </div>
                </div>
            </div>
        </div>
    )
}