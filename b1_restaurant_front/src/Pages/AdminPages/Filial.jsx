import {useEffect, useState} from "react";
import axios from "axios";
import {BASE_URL} from "../../Services/BaseUrl.js";
import {Apis} from "../../Services/Apis.js";
import {Pagenation} from "../../Component/Pagenation.jsx";
import {GetColor} from "../../Services/service.js";

export const Filial = () => {
    const [color, setColor] = useState([])
    const [country, setCountry] = useState([])
    const [region, setRegion] = useState([])
    const getFilial = async () => {
        const res = await axios.get(BASE_URL + Apis.filial + "list")
        setCountry(res.data)
        const res1 = await axios.get(BASE_URL + Apis.filial + "regionList")
        setRegion(res1.data)
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
    const [currentPage1, setCurrentPage1] = useState(1);
    const [prePage1] = useState(5)
    const indexOfLastData1 = currentPage1 * prePage;
    const indexOfFirstData1 = indexOfLastData1 - prePage;
    const currentData1 = region.slice(indexOfFirstData1, indexOfLastData1);
    const paginate = (pageNumber) => setCurrentPage(pageNumber)
    const paginate1 = (pageNumber) => setCurrentPage1(pageNumber)

    return (
        <div>
            <Pagenation totalData={country.length} perPage={prePage} paginate={paginate}/>
            <CountryJon data={currentData} color={color}/>
            <Pagenation totalData={region.length} perPage={prePage1} paginate={paginate1}/>
            <Region data={currentData1} color={color}/>
        </div>
    )


}

const CountryJon = ({data, color}) => {


    return (
        <div>
            <div className={"row"}>
                <div className="col-12">
                    <div className="card" style={{backgroundColor: `${color.textColor}`}}>
                        <div className={"card-header"}>
                            <button className={"btn btn-primary"}>Davlat qo'shish</button>
                        </div>
                        <div className="card-body">
                            <table className={"table"}>
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
                                        <td className={'col-4'}>{item.name}</td>
                                        <td className={'col-4'}>
                                            <button className={"btn btn-warning me-3"}><i className={"bi-pencil"}></i></button>
                                            <button className={"btn btn-danger"}><i className={"bi-trash"}></i></button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const Region = ({data, color}) => {
    return (
        <div style={{height:"auto", marginBottom:"100px"}}>
            <div className={"row "}>
                <div className="col-12">
                    <div className="card" style={{backgroundColor: `${color.textColor}`}}>
                        <div className={"card-header"}>
                            <button className={"btn btn-info"}>Viloyat qo'shish</button>
                        </div>
                        <div className="card-body">
                            <table className={"table"}>
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
                                        <td className={'col-3'}>{item.name}</td>
                                        <td className={"col-3"}>{item.country.name}</td>
                                        <td className={'col-3'}>
                                            <button className={"btn btn-warning me-3"}><i className={"bi-pencil"}></i></button>
                                            <button className={"btn btn-danger"}><i className={"bi-trash"}></i></button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}