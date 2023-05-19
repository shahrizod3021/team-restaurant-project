import {useEffect, useState} from "react";
import login from "../../assets/images/auth/login-bg.jpg";
import {useParams} from "react-router-dom";
import {BASE_URL} from "../../Services/BaseUrl.js";
import {Apis} from "../../Services/Apis.js";
import axios from "axios";
import {toast} from "react-toastify";

export const OneCategoryProduct = () => {
    const [category, setCategory] = useState('')
    const [product, setProduct] = useState([])
    const param = useParams().id

    const getOneCategory = async () => {
        try {
            const res = await axios.get(BASE_URL + Apis.category + "/" + param)
            setCategory(res.data)
        }catch (err){

        }
    }

    const getProductOfOneCategory = async  () => {
        try {
            const  res = await axios.get(BASE_URL + Apis.product + "/" + param)
            setProduct(res.data);
        }catch (err){
            console.log(err)
        }
    }

    useEffect(() => {
        getOneCategory()
        getProductOfOneCategory()
    }, [])
    return (
        <div>
            <div className="card col-3 mb-2">
                <img className={"card-img-top"} src={login} height={"120"} alt=""/>
                <div className="card-body">
                    <div className="row">
                        <div className="col-12">
                            <h3>Pepsi</h3>
                            <hr className={"dropdown-divider mb-1"}/>
                            <div className="d-flex align-items-center align-self-start">
                                <h3 className="text-success mb-0">{category.name}</h3>
                                <p className="text-danger ml-2 mb-0 font-weight-medium">
                                    <del>{category.id}</del>
                                </p>
                            </div>
                        </div>

                    </div>
                    <h6 className=" font-weight-normal">Umumiy foyda</h6>
                </div>
            </div>

            {product.map((item) =>  (
                <>
                    <div className="card col-3 mb-2">
                        <img className={"card-img-top"} src={login} height={"120"} alt=""/>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-12">
                                    <h3>{item.name}</h3>
                                    <hr className={"dropdown-divider mb-1"}/>
                                    <div className="d-flex align-items-center align-self-start">
                                        <h3 className="text-success mb-0">{item.description}</h3>
                                        <p className="text-danger ml-2 mb-0 font-weight-medium">
                                            <del>{category.id}</del>
                                        </p>
                                    </div>
                                </div>

                            </div>
                            <h6 className=" font-weight-normal">Umumiy foyda</h6>
                        </div>
                    </div>
                </>
            ))}

        </div>
    )
}