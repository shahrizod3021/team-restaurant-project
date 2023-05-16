import '../../assets/SideBar.css'
import Carousel from "react-multi-carousel";
import {Component} from "react";
import * as PropTypes from "prop-types";
import rasm from '../../assets/banner.jpg'
import login from '../../assets/images/auth/login-bg.jpg'

function WithStyles(props) {
    return null;
}

WithStyles.propTypes = {
    image: PropTypes.string,
    description: PropTypes.string,
    headline: PropTypes.string
};
export  const Main = () => {
    return (
        <div>
            <div className={"aksiyacarusel mt-3"}>
                <Carousel
                    additionalTransfrom={0}
                    arrows
                    autoPlaySpeed={3000}
                    centerMode={false}
                    className=""
                    containerClass="container-fluid"
                    dotListClass=""
                    draggable
                    focusOnSelect={false}
                    infinite
                    itemClass=""
                    keyBoardControl
                    minimumTouchDrag={80}
                    pauseOnHover
                    renderArrowsWhenDisabled={false}
                    renderButtonGroupOutside={false}
                    renderDotsOutside={false}
                    responsive={{
                        desktop: {
                            breakpoint: {
                                max: 3000,
                                min: 1024
                            },
                            items: 1,
                            partialVisibilityGutter: 40
                        },
                        mobile: {
                            breakpoint: {
                                max: 464,
                                min: 0
                            },
                            items: 1,
                            partialVisibilityGutter: 30
                        },
                        tablet: {
                            breakpoint: {
                                max: 1024,
                                min: 464
                            },
                            items: 2,
                            partialVisibilityGutter: 30
                        }
                    }}
                    rewind={false}
                    rewindWithAnimation={false}
                    rtl={false}
                    shouldResetAutoplay
                    showDots={false}
                    sliderClass=""
                    slidesToSlide={1}
                    swipeable
                >
                    <div >
                        <img className={"carimg"} src={rasm} alt="" width={"80%"} height={"500"} style={{marginLeft:"150px"}}/>
                    </div>
                    <div>
                        <img className={"carimg"} src={login} alt="" width={"80%"} height={"500"}  style={{marginLeft:"150px"}} />
                    </div>
                    <div>
                        <img  className={"carimg"} src={login} alt="" width={"80%"} height={"500"}  style={{marginLeft:"150px"}}/>
                    </div>
                </Carousel>
            </div>
            <div className={"mediaCarauselinBasic row mt-3"}>
                <Carousel
                    additionalTransfrom={0}
                    arrows
                    autoPlaySpeed={3000}
                    centerMode={false}
                    className=""
                    containerClass="container-fluid"
                    dotListClass=""
                    draggable
                    focusOnSelect={false}
                    infinite
                    itemClass=""
                    keyBoardControl
                    minimumTouchDrag={80}
                    pauseOnHover
                    renderArrowsWhenDisabled={false}
                    renderButtonGroupOutside={false}
                    renderDotsOutside={false}
                    responsive={{
                        desktop: {
                            breakpoint: {
                                max: 3000,
                                min: 1024
                            },
                            items: 1,
                            partialVisibilityGutter: 40
                        },
                        mobile: {
                            breakpoint: {
                                max: 464,
                                min: 0
                            },
                            items: 2,
                            partialVisibilityGutter: 30
                        },
                        tablet: {
                            breakpoint: {
                                max: 1024,
                                min: 464
                            },
                            items: 2,
                            partialVisibilityGutter: 30
                        }
                    }}
                    rewind={false}
                    rewindWithAnimation={false}
                    rtl={false}
                    shouldResetAutoplay
                    showDots={false}
                    sliderClass=""
                    slidesToSlide={1}
                    swipeable
                >
                    <div className={"me-2"}>
                        <div className="card mb-2" >
                            <img className={"card-img-top"} src={login} height={"120"} alt="" />
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-9">
                                        <h3>Pepsi</h3>
                                        <hr className={"dropdown-divider mb-1"}/>
                                        <div className="d-flex align-items-center align-self-start">
                                            <h3 className="text-success mb-0">$122121</h3>
                                            <p className="text-danger ml-2 mb-0 font-weight-medium"><del>300$</del></p>
                                        </div>
                                    </div>

                                </div>
                                <h6 className=" font-weight-normal">Umumiy foyda</h6>
                            </div>
                        </div>
                    </div>
                    <div className={"me-2"}>
                        <div className="card mb-2" >
                            <img className={"card-img-top"} src={rasm} height={"120"} alt=""/>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-9">
                                        <h3>Pepsi</h3>
                                        <hr className={"dropdown-divider mb-1"}/>
                                        <div className="d-flex align-items-center align-self-start">
                                            <h3 className="mb-0 text-success">$122121</h3>
                                            <p className="text-danger ml-2 mb-0 font-weight-medium"><del>250$</del></p>
                                        </div>
                                    </div>

                                </div>
                                <h6 className=" font-weight-normal">Umumiy foyda</h6>
                            </div>
                        </div>
                    </div>
                    <div className={"me-2"}>
                        <div className="card mb-2" >
                            <img className={"card-img-top"} src={rasm} height={"120"} alt=""/>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-9">
                                        <h3>Pepsi</h3>
                                        <hr className={"dropdown-divider mb-1"}/>
                                        <div className="d-flex align-items-center align-self-start">
                                            <h3 className="text-success mb-0">$122121</h3>
                                            <p className="text-danger ml-2 mb-0 font-weight-medium"><del>120%</del></p>
                                        </div>
                                    </div>

                                </div>
                                <h6 className=" font-weight-normal">Umumiy foyda</h6>
                            </div>
                        </div>
                    </div>
                </Carousel>
            </div>

            <div className={"container row mt-5"}>
                <div className={"col-3"}>
                    <div className={"me-2"}>
                        <div className="card">
                            <img className={"card-img-top"} src="" alt=""/>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-9">
                                        <div className="d-flex align-items-center align-self-start">
                                            <h3 className={"mb-0 text-success"}>
                                                salom
                                            </h3>
                                            <p className={"text-danger ml-2 mb-0 font-weight-medium"}>1212</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}