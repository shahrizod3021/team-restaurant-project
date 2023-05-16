import {Link} from "react-router-dom";
import {GetColor, GetRestaurant} from "../../Services/service.js";
import {useEffect, useState} from "react";
import face from '../../assets/images/faces/face6.jpg'
import carousel from '../../assets/images/dashboard/Rectangle.jpg'
import carousel1 from '../../assets/images/dashboard/Img_5.jpg'
import carousel2 from '../../assets/images/dashboard/img_6.jpg'


export const Basic = () => {
    const [color, setColor] = useState({})
    const [restaurant, setRestaurant] = useState({})
    const getColor = async () => {
        await GetColor(setColor, localStorage.getItem("uuid"))
    }

    const getRestaurant = async () => {
        await GetRestaurant(setRestaurant)
    }

    useEffect(() => {
        getColor()
        getRestaurant()
    }, [])
    return (
        <div className={"basic"} style={{color: `${color.bgColor}`}}>
            <div className="row mb-5">
                <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
                    <div className="card mb-2" style={{backgroundColor: `${color.textColor}`}}>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-9">
                                    <div className="d-flex align-items-center align-self-start">
                                        <h3 className="mb-0">${restaurant.monthlyProfit}</h3>
                                        {restaurant.foydaFoiz === 0 ? (
                                            <>
                                                <p className="text-danger ml-2 mb-0 font-weight-medium">-{restaurant.zarazFoyiz}%</p>
                                            </>
                                        ) : (
                                            <>
                                                <p className="text-success ml-2 mb-0 font-weight-medium">+{restaurant.foydaFoiz}%</p>
                                            </>
                                        )}
                                    </div>
                                </div>
                                <div className="col-3">
                                    {restaurant.foydaFoiz === 0 ? (
                                        <>
                                            <div className="text-danger" style={{fontSize: "20px"}}>
                                                <span className="bi-arrow-down-left icon-item"></span>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="text-success" style={{fontSize: "20px"}}>
                                                <span className="bi-arrow-up-right icon-item"></span>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                            <h6 className=" font-weight-normal">Oylik foyda</h6>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
                    <div className="card mb-2 " style={{backgroundColor: `${color.textColor}`}}>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-9">
                                    <div className="d-flex align-items-center align-self-start">
                                        <h3 className="mb-0">${restaurant.allProfit}</h3>
                                        <p className="text-success ml-2 mb-0 font-weight-medium">+11%</p>
                                    </div>
                                </div>
                                <div className="col-3">
                                    <div className="text-success" style={{fontSize: "20px"}}>
                                        <span className="bi-arrow-up-right"></span>
                                    </div>
                                </div>
                            </div>
                            <h6 className=" font-weight-normal">Umumiy foyda</h6>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
                    <div className="card mb-2" style={{backgroundColor: `${color.textColor}`}}>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-9">
                                    <div className="d-flex align-items-center align-self-start">
                                        <h3 className="mb-0">${restaurant.dailyProfit}</h3>
                                        {restaurant.kunlikFoydaFoiz === 0 ? (
                                            <>
                                                <p className="text-danger ml-2 mb-0 font-weight-medium">-{restaurant.kunlikZararFoiz}%</p>
                                            </>
                                        ) : (
                                            <>
                                                <p className="text-success ml-2 mb-0 font-weight-medium">+{restaurant.kunlikZararFoiz}%</p>
                                            </>
                                        )}
                                    </div>
                                </div>
                                <div className="col-3">
                                    {restaurant.kunlikFoydaFoiz === 0 ? (
                                        <>
                                            <div className="text-danger" style={{fontSize: "20px"}}>
                                                <span className="bi-arrow-down-left icon-item"></span>
                                            </div>

                                        </>
                                    ) : (
                                        <>
                                            <div className="text-success" style={{fontSize: "20px"}}>
                                                <span className="bi-arrow-up-right icon-item"></span>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                            <h6 className=" font-weight-normal">Kunlik foyda</h6>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
                    <div className="card mb-2" style={{backgroundColor: `${color.textColor}`}}>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-9">
                                    <div className="d-flex align-items-center align-self-start">
                                        <h3 className="mb-0">$31.53</h3>
                                        <p className="text-success ml-2 mb-0 font-weight-medium">+3.5%</p>
                                    </div>
                                </div>
                                <div className="col-3">
                                    <div className="icon icon-box-success text-success" style={{fontSize: "20px"}}>
                                        <span className="bi-arrow-up-right icon-item"></span>
                                    </div>
                                </div>
                            </div>
                            <h6 className=" font-weight-normal">Expense current</h6>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="card mb-5" style={{backgroundColor: `${color.textColor}`}}>
                        <div className="card-body">
                            <h4 className="card-title" style={{color: `${color.bgColor}`}}>Buy another country</h4>
                            <div className="row">
                                <div className="col-md-5">
                                    <div className="table-responsive">
                                        <table className="table">
                                            <tbody>
                                            <tr>
                                                <td>
                                                    <i className="flag-icon flag flag-united-states"></i>
                                                </td>
                                                <td style={{color: `${color.bgColor}`}}>USA</td>
                                                <td style={{color: `${color.bgColor}`}} className="text-right"> 1500
                                                </td>
                                                <td style={{color: `${color.bgColor}`}}
                                                    className="text-right font-weight-medium"> 56.35%
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <i className="flag-icon flag flag-germany"></i>
                                                </td>
                                                <td style={{color: `${color.bgColor}`}}>Germany</td>
                                                <td style={{color: `${color.bgColor}`}} className="text-right"> 800</td>
                                                <td style={{color: `${color.bgColor}`}}
                                                    className="text-right font-weight-medium"> 33.25%
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <i className="flag-icon flag flag-au"></i>
                                                </td>
                                                <td style={{color: `${color.bgColor}`}}>Australia</td>
                                                <td style={{color: `${color.bgColor}`}} className="text-right"> 760</td>
                                                <td style={{color: `${color.bgColor}`}}
                                                    className="text-right font-weight-medium"> 15.45%
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <i className="flag-icon flag flag-gb"></i>
                                                </td>
                                                <td style={{color: `${color.bgColor}`}}>United Kingdom</td>
                                                <td style={{color: `${color.bgColor}`}} className="text-right"> 450</td>
                                                <td style={{color: `${color.bgColor}`}}
                                                    className="text-right font-weight-medium"> 25.00%
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <i className="flag-icon flag flag-ro"></i>
                                                </td>
                                                <td style={{color: `${color.bgColor}`}}>Romania</td>
                                                <td style={{color: `${color.bgColor}`}} className="text-right"> 620</td>
                                                <td style={{color: `${color.bgColor}`}}
                                                    className="text-right font-weight-medium"> 10.25%
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <i className="flag-icon flag flag-br"></i>
                                                </td>
                                                <td style={{color: `${color.bgColor}`}}>Brasil</td>
                                                <td style={{color: `${color.bgColor}`}} className="text-right"> 230</td>
                                                <td style={{color: `${color.bgColor}`}}
                                                    className="text-right font-weight-medium"> 75.00%
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="col-md-7">
                                    <div id="audience-map" className="vector-map"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-4 grid-margin">
                    <div className="card mb-3" style={{backgroundColor: `${color.textColor}`}}>
                        <div className="card-body">
                            <h5>Revenue</h5>
                            <div className="row">
                                <div className="col-8 col-sm-12 col-xl-8 my-auto">
                                    <div className="d-flex d-sm-block d-md-flex align-items-center">
                                        <h2 className="mb-0">$32123</h2>
                                        <p className="text-success ml-2 mb-0 font-weight-medium">+3.5%</p>
                                    </div>
                                    <h6 className=" font-weight-normal">11.38% Since last month</h6>
                                </div>
                                <div className="col-4 col-sm-12 col-xl-4 text-center text-xl-right">
                                    <i style={{fontSize: "3.75rem"}}
                                       className="icon-lg fas fa-code text-primary ml-auto"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-4 grid-margin">
                    <div className="card mb-3" style={{backgroundColor: `${color.textColor}`}}>
                        <div className="card-body">
                            <h5>Sales</h5>
                            <div className="row">
                                <div className="col-8 col-sm-12 col-xl-8 my-auto">
                                    <div className="d-flex d-sm-block d-md-flex align-items-center">
                                        <h2 className="mb-0">$45850</h2>
                                        <p className="text-success ml-2 mb-0 font-weight-medium">+8.3%</p>
                                    </div>
                                    <h6 className=" font-weight-normal"> 9.61% Since last month</h6>
                                </div>
                                <div className="col-4 col-sm-12 col-xl-4 text-center text-xl-right">
                                    <i style={{fontSize: "3.75rem"}}
                                       className="icon-lg fas fa-wallet text-danger ml-auto"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-4 grid-margin">
                    <div className="card mb-8" style={{backgroundColor: `${color.textColor}`}}>
                        <div className="card-body">
                            <h5>Purchase</h5>
                            <div className="row">
                                <div className="col-8 col-sm-12 col-xl-8 my-auto">
                                    <div className="d-flex d-sm-block d-md-flex align-items-center">
                                        <h2 className="mb-0">$2039</h2>
                                        <p className="text-danger ml-2 mb-0 font-weight-medium">-2.1% </p>
                                    </div>
                                    <h6 className=" font-weight-normal">2.27% Since last month</h6>
                                </div>
                                <div className="col-4 col-sm-12 col-xl-4 text-center text-xl-right">
                                    <i style={{fontSize: "3.75rem"}}
                                       className="icon-lg fas fa-search text-success ml-auto"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row messageandCar" style={{color: `${color.bgColor}`}}>
                <div className="col-md-6 col-xl-4 grid-margin stretch-card">
                    <div className="card mb-3" style={{backgroundColor: `${color.textColor}`}}>
                        <div className="card-body">
                            <div className="d-flex flex-row justify-content-between">
                                <h4 style={{color: `${color.bgColor}`}} className="card-title">Messages</h4>
                                <p className=" mb-1 small">View all</p>
                            </div>
                            <div className="preview-list">
                                <div className="preview-item border-bottom">
                                    <div className="preview-thumbnail">
                                        <img src={face} alt="image" height={"35"}
                                             className="rounded-circle"/>
                                    </div>
                                    <div className="preview-item-content d-flex flex-grow">
                                        <div className="flex-grow">
                                            <div className="d-flex d-md-block d-xl-flex justify-content-between">
                                                <h6 className="preview-subject">Leonard</h6>
                                                <p className=" text-small">5 minutes ago</p>
                                            </div>
                                            <p>Well, it seems to be working now.</p>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <hr className={"dropdown-divider"}/>
                                </div>
                                <div className="preview-item border-bottom">
                                    <div className="preview-thumbnail">
                                        <img src={face} alt="image" height={"35"}
                                             className="rounded-circle"/>
                                    </div>
                                    <div className="preview-item-content d-flex flex-grow">
                                        <div className="flex-grow">
                                            <div className="d-flex d-md-block d-xl-flex justify-content-between">
                                                <h6 className="preview-subject">Luella Mills</h6>
                                                <p className=" text-small">10 Minutes Ago</p>
                                            </div>
                                            <p>Well, it seems to be working now.</p>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <hr className={"dropdown-divider"}/>
                                </div>

                                <div className="preview-item border-bottom">
                                    <div className="preview-thumbnail">
                                        <img src={face} alt="image" height={"35"}
                                             className="rounded-circle"/>
                                    </div>
                                    <div className="preview-item-content d-flex flex-grow">
                                        <div className="flex-grow">
                                            <div className="d-flex d-md-block d-xl-flex justify-content-between">
                                                <h6 className="preview-subject">Ethel Kelly</h6>
                                                <p className=" text-small">2 Hours Ago</p>
                                            </div>
                                            <p>Please review the tickets</p>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <hr className={"dropdown-divider"}/>
                                </div>

                                <div className="preview-item border-bottom">
                                    <div className="preview-thumbnail">
                                        <img src={face} alt="image" height={"35"}
                                             className="rounded-circle"/>
                                    </div>
                                    <div className="preview-item-content d-flex flex-grow">
                                        <div className="flex-grow">
                                            <div className="d-flex d-md-block d-xl-flex justify-content-between">
                                                <h6 className="preview-subject">Herman May</h6>
                                                <p className=" text-small">4 Hours Ago</p>
                                            </div>
                                            <p>Thanks a lot. It was easy to fix it .</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-xl-4 grid-margin stretch-card">
                    <div className="card mb-2" style={{backgroundColor: `${color.textColor}`}}>
                        <div className="card-body">
                            <h4 className="card-title" style={{color: `${color.bgColor}`}}>Portfolio Slide</h4>
                            <div className="owl-carousel owl-theme full-width owl-carousel-dash portfolio-carousel"
                                 id="owl-carousel-basic">
                                <div className="item">
                                    <img src={carousel} alt=""/>
                                </div>
                            </div>
                            <div className="d-flex py-4">
                                <div className="preview-list w-100">
                                    <div className="preview-item p-0">
                                        <div className="preview-thumbnail">
                                            <img src={face} height={"35"} className="rounded-circle" alt=""/>
                                        </div>
                                        <div className="preview-item-content d-flex flex-grow">
                                            <div className="flex-grow">
                                                <div className="d-flex d-md-block d-xl-flex justify-content-between">
                                                    <h6 className="preview-subject">CeeCee Bass</h6>
                                                    <p className="text-muted text-small">4 Hours Ago</p>
                                                </div>
                                                <p>Well, it seems to be working now.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <p>Well, it seems to be working now. </p>
                            <div className="progress progress-md portfolio-progress">
                                <div className="progress-bar bg-success" role="progressbar" style={{width: "50%"}}
                                     aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}