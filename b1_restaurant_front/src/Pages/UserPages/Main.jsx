import '../../assets/SideBar.css'
import Carousel from "react-multi-carousel";
import {Component, useEffect, useState} from "react";
import rasm from '../../assets/banner.jpg'
import login from '../../assets/images/auth/login-bg.jpg'
import axios from "axios";
import {BASE_URL} from "../../Services/BaseUrl.js";
import {Apis} from "../../Services/Apis.js";
import {toast} from "react-toastify";
import {Link, useNavigate} from "react-router-dom";
import saleimg from '../../assets/download.png'
import {Loading} from "../../Component/Loading.jsx";


export const Main = () => {
    const navigate = useNavigate()

    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: {max: 4000, min: 3000},
            items: 5
        },
        desktop: {
            breakpoint: {max: 3000, min: 1024},
            items: 1
        },
        tablet: {
            breakpoint: {max: 1024, min: 464},
            items: 2
        },
        mobile: {
            breakpoint: {max: 464, min: 0},
            items: 1
        }
    };
    const responsive2 = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: {max: 4000, min: 3000},
            items: 5
        },
        desktop: {
            breakpoint: {max: 3000, min: 1024},
            items: 7
        },
        tablet: {
            breakpoint: {max: 1024, min: 464},
            items: 2
        },
        mobile: {
            breakpoint: {max: 464, min: 0},
            items: 3
        }
    };
    const [category, setCategory] = useState([])
    const [sale, setSale] = useState([])
    const [todaySale, setTodaySale] = useState([])
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        const getSale = async () => {
            const res = await axios.get(BASE_URL + Apis.sale + "/list")
            setSale(res.data)
            const res1 = await axios.get(BASE_URL + Apis.sale + "/today")
            setTodaySale(res1.data);
            const res2 = await axios.get(BASE_URL + Apis.category + "/list")
            setCategory(res2.data);
            setLoading(true)
        }
        getSale()

    }, [])
    return (
        <div>
            {loading ? (
                <>
                    <div id="banner" className="banner full-screen-mode parallax">
                        <div className="container pr">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <div className="banner-static">
                                    <div className="banner-text">
                                        <div className="banner-cell">
                                            <h1 className={"mb-0"}>Restaurant</h1>
                                            <h2 className={"mb-0"}>Biz bilan taom yanada mazaliroq </h2>
                                            <div className="book-btn">
                                                <Link to={"/aboutus"} className="table-btn hvr-underline-from-center">Biz
                                                    haqimizda</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={"aksiyacarusel"}>
                        <div className={"me-5 mt-3 w-50"}>
                            <Carousel responsive={
                                responsive}
                                      containerClass={"container-with-dots"}
                            >
                                {sale.map((item) => (
                                    <>
                                        {item.active ? (
                                            <>
                                                <div>
                                                    <img className={"carimg "} src={Apis.getPhoto + item.photoId} alt=""
                                                         width={"100%"}
                                                         height={"400"} draggable={false}/>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div>
                                                    <img className={"carimg"} src={Apis.getPhoto + item.photoId} alt=""
                                                         width={"100%"}
                                                         height={"400"} draggable={false}/>
                                                    <div className={"mask card-img-overlay carimg"}
                                                         style={{backgroundColor: "rgba(0,0,0,0.6)"}}>
                                                        <h1 className="card-title text-danger text-center">Yopilgan</h1>
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </>
                                ))}
                            </Carousel>
                        </div>
                        <div className={"col-4 mt-4 p-1"} style={{border: "1px solid red"}}>
                            <div className={"d-flex"} style={{height: '5vh'}}>
                                <h4 className={"me-5"}>Bugungi kun aksiyalari</h4>
                            </div>
                            <Carousel
                                responsive={responsive}
                                arrows
                                autoPlay
                                autoPlaySpeed={3000}
                                centerMode={false}
                                dotListClass={""}
                                infinite
                                minimumTouchDrag={80}
                                pauseOnHover
                                renderArrowsWhenDisabled={false}
                                renderButtonGroupOutside={false}
                                renderDotsOutside={false}
                                focusOnSelect={false}
                                draggable
                                keyBoardControl={true}
                                containerClass={"container-with-dots"}
                            >

                                {todaySale.map((item) => (
                                    <div className="card">
                                        <img className={"card-img-top"} draggable={false}
                                             src={Apis.getPhoto + item.photoId}
                                             height={"200"} alt=""/>
                                        <div className="card-body" style={{height: "auto"}}>
                                            <div className="row">
                                                <div className="col-9">
                                                    <div className={"d-flex align-items-center mb-2"}>
                                                        <h3 className={"col-8  text-warning"}>{item.name}</h3>
                                                        <div className="d-flex col-4 align-items-center">
                                                            <h4 className={"text-success mt-3"}>{item.foyiz}%</h4>
                                                            <img className={"col-12"} src={saleimg} alt=""
                                                                 height={"40vh"}/>
                                                        </div>
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
                                                                <p className={"text-warning me-2"}>{item.name} <i
                                                                    className={"bi-check"}></i></p>
                                                            </>
                                                        ))}
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </Carousel>
                        </div>
                    </div>

                    <div style={{marginLeft: "10px"}} className={" mediaCarauselinBasic  mt-3"}>
                        <Carousel
                            responsive={responsive}
                            arrows
                            autoPlay
                            autoPlaySpeed={3000}
                            centerMode={false}
                            dotListClass={""}
                            infinite
                            minimumTouchDrag={80}
                            pauseOnHover
                            renderArrowsWhenDisabled={false}
                            renderButtonGroupOutside={false}
                            renderDotsOutside={false}
                            focusOnSelect={false}
                            draggable
                            keyBoardControl={true}
                            containerClass={"container-with-dots"}
                        >
                            {sale.map((item) => (
                                <>
                                    {item.active ? (
                                        <>
                                            <div className={"me-2"}>
                                                <div className="card mb-2">
                                                    <img className={"card-img-top"} src={Apis.getPhoto + item.photoId}
                                                         height={"150"}
                                                         alt=""/>
                                                    <div className="card-body" style={{height: "auto"}}>
                                                        <div className="row">
                                                            <div className="col-9">
                                                                <div className={"d-flex align-items-center mb-2"}>
                                                                    <h3 className={"col-8 text-light"}>{item.name}</h3>
                                                                    <div className="d-flex align-items-center">
                                                                        <p className={"text-success mt-3"}>{item.foyiz}%</p>
                                                                        <img className={"col-12"} src={saleimg} alt=""
                                                                             height={"40vh"}/>
                                                                    </div>
                                                                </div>
                                                                <hr className={"dropdown-divider mb-1"}/>
                                                                <div
                                                                    className="d-flex align-items-center align-self-start">
                                                                    <h3 className="text-success mb-0">{item.allPrice} so'm</h3>
                                                                    <p className="text-danger ml-2 mb-0 font-weight-medium">
                                                                        <del>{item.pastPrice} so'm</del>
                                                                    </p>
                                                                </div>
                                                                <div className={"d-flex"}>
                                                                    {item.products.map((item) => (
                                                                        <>
                                                                            <p className={"text-warning me-2"}>{item.name}
                                                                                <i
                                                                                    className={"bi-check"}></i></p>

                                                                        </>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                        </>
                                    )}
                                </>

                            ))}
                        </Carousel>
                    </div>
                    <div className={"category container mt-5 mb-10"}>
                        <Carousel responsive={responsive2} swipeable={true}>
                            {category.map((item) => (
                                <div className={""} onClick={() => navigate("/category/" + item.id)}>
                                    <img draggable={false} className={"rounded-circle"} width={"100"} height={"100"}
                                         src={Apis.getPhoto + item.photoId} alt=""/>
                                    <Link to={"/category/" + item.id} draggable={false} className={"link-warning"}><p
                                        className={"categoryName text-center"} draggable={false}>{item.name}</p></Link>
                                </div>
                            ))}
                        </Carousel>
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