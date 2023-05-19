import '../../assets/SideBar.css'
import Carousel from "react-multi-carousel";
import {Component, useEffect, useState} from "react";
import rasm from '../../assets/banner.jpg'
import login from '../../assets/images/auth/login-bg.jpg'
import axios from "axios";
import {BASE_URL} from "../../Services/BaseUrl.js";
import {Apis} from "../../Services/Apis.js";
import {toast} from "react-toastify";
import {Link} from "react-router-dom";
import saleimg from '../../assets/download.png'


export const Main = () => {
    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 1
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
    const responsive2 = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 7
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 3
        }
    };
    const [category, setCategory] = useState([])
    const [sale, setSale] = useState([])
    const getCategory = async () => {
        try {
            const res = await axios.get(BASE_URL + Apis.category + "/list")
            setCategory(res.data);
        } catch (err) {
            toast.error("kategoriyalarda hatolik")
        }
    }
    const getSale = async  () => {
        const res = await axios.get(BASE_URL + Apis.sale + "/list")
        setSale(res.data)
    }

    useEffect(() => {
        getCategory()
        getSale()
    }, [])
    return (
        <div>

            <div id="banner" className="banner full-screen-mode parallax">
                <div className="container pr">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div className="banner-static">
                            <div className="banner-text">
                                <div className="banner-cell">
                                    <h1 className={"mb-0"}>Restaurant</h1>
                                    <h2 className={"mb-0"}>Biz bilan taom yanada mazaliroq </h2>
                                    <div className="book-btn">
                                        <Link to={"/aboutus"} className="table-btn hvr-underline-from-center">Biz haqimizda</Link>
                                    </div>
                                    <a href="#about">
                                        <div className="mouse"></div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={"aksiyacarusel"}>
                <div className={"me-5 mt-3 w-50"}>
                    <Carousel responsive={
                        responsive
                    }>
                        {sale.map((item) => (
                            <>
                                <div>
                                    <img className={"carimg "} src={Apis.getPhoto + item.photoId} alt="" width={"100%"} height={"400"}   draggable={false}/>
                                </div>
                            </>
                        ))}
                    </Carousel>
                </div>
                <div>
                    <img src={rasm} alt="" width={"70%"} height={"400vh"}/>
                </div>
            </div>

                <div style={{marginLeft:"10px"}} className={" mediaCarauselinBasic  mt-3"}>
                    <Carousel
                        responsive={responsive}
                    >
                        {sale.map((item) => (
                            <div className={"me-2"}>
                                <div className="card mb-2">
                                    <img className={"card-img-top"} src={Apis.getPhoto + item.photoId} height={"150"} alt=""/>
                                    <div className="card-body" style={{height:"auto"}}>
                                        <div className="row">
                                            <div className="col-9">
                                                <div className={"d-flex align-items-center mb-2"}>
                                                    <h3 className={"col-8"}>{item.name}</h3>
                                                    <img className={"col-4"} src={saleimg} alt="" />
                                                </div>
                                                <hr className={"dropdown-divider mb-1"}/>
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
                                                <Link to={"/"} className={"btn btn-primary"}>ko'rish <i className={"bi-eye"}></i></Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Carousel>
                </div>
            <div className={"category container mt-5"}>
              <Carousel responsive={responsive2}  swipeable={true}>
                  {category.map((item) => (
                      <div className={""}>
                          <img draggable={false} className={"rounded-circle"} width={"100"} height={"100"} src={Apis.getPhoto + item.photoId} alt=""/>
                          <Link to={"/category/"+item.id} draggable={false}  className={"link-warning"}><p className={"categoryName text-center"} draggable={false}>{item.name}</p></Link>
                      </div>
                  ))}
              </Carousel>
            </div>

        </div>
    )
}