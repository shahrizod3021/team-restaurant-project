import {BrowserRouter, Route, Routes} from "react-router-dom";
import {AdminLayout} from "./Layout/AdminLayout/AdminLayout.jsx";
import {Login} from "./Services/Login.jsx";
import {Register} from "./Services/Register.jsx";
import {UserLayout} from "./Layout/UserLayout/UserLayout.jsx";
import {OneUser} from "./Pages/UserPages/OneUser.jsx";
import {Basic} from "./Pages/AdminPages/Basic.jsx";
import {NotFoundPage} from "./Component/NotFoundPage.jsx";
import {Main} from "./Pages/UserPages/Main.jsx";
import {Category} from "./Pages/AdminPages/Category.jsx";
import {UploadPhoto} from "./Pages/UserPages/UploadPhoto.jsx";
import {OneCategoryProduct} from "./Pages/UserPages/OneCategoryProduct.jsx";
import {Proudct} from "./Pages/AdminPages/Proudct.jsx";
import {Aksiya} from "./Pages/AdminPages/Aksiya.jsx";
import {Filial} from "./Pages/AdminPages/Filial.jsx";
import {Products} from "./Pages/UserPages/Products.jsx";
import {NotFoundItem} from "./Component/NotFoundItem.jsx";
import {Order} from "./Pages/AdminPages/Order.jsx";
import {Sales} from "./Pages/UserPages/Sales.jsx";
import {AccauntLayout} from "./Layout/UserLayout/AccauntLayout.jsx";
import {UserOrder} from "./Pages/UserPages/UserOrder.jsx";
import {MyBasket} from "./Pages/UserPages/MyBasket.jsx";
import {History} from "./Pages/AdminPages/History.jsx";
import {ContactUs} from "./Pages/UserPages/ContactUs.jsx";

export const App = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path={"/auth/admin"} element={<AdminLayout/>}>
                        <Route index element={<Basic/>}/>
                        <Route path={"/auth/admin/category"} element={<Category/>}/>
                        <Route path={"/auth/admin/product"} element={<Proudct/>}/>
                        <Route path={"/auth/admin/sale"} element={<Aksiya/>}/>
                        <Route path={"/auth/admin/filial"} element={<Filial/>}/>
                        <Route path={"/auth/admin/zakaz"} element={<Order/>}/>
                        <Route path={"/auth/admin/arxiv"} element={<History/>} />
                    </Route>
                    <Route path={"/upload/photo"} element={<UploadPhoto/>}/>
                    <Route path={"/"} element={<UserLayout/>}>
                        <Route index element={<Main/>}/>
                        <Route path={"*"} element={<NotFoundPage/>}/>
                        <Route path={"/sale/:id"} element={<Sales/>}/>
                        <Route path={"/notfound"} element={<NotFoundItem/>}/>
                        <Route path={"/category/:id"} element={<OneCategoryProduct/>}/>
                        <Route path={"/product/:name"} element={<Products/>}/>
                        <Route path={"/contactus"} element={<ContactUs/>}/>
                    </Route>
                    <Route path={"/auth/user"} element={<AccauntLayout/>}>
                        <Route index element={<OneUser/>}/>
                        <Route path={"/auth/user/myOrder"} element={<UserOrder/>}/>
                        <Route path={'/auth/user/myBasket'} element={<MyBasket/>}/>
                    </Route>
                    <Route path={"/auth/login"} element={<Login/>}/>
                    <Route path={"/auth/register"} element={<Register/>}/>
                    <Route path={"*"} element={<NotFoundPage/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

