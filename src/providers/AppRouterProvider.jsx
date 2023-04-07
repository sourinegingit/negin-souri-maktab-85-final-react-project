
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Paymentgateway from "../components/paymentgateway";

import AdminPanel from "../pages/adminPanel";

import Auth from "../pages/auth/index";

import Home from "../pages/home/index";

import NotFound from "../pages/notFound";

import Basket from "../components/basket";

import FinalAuth from "../components/finalAuth";

import CartDetail from "../components/cartDetail/index";

import Layout from "../layouts/layout";

import Carts from "../components/carts";
import Collection from "../components/collections";
import Result from "../components/Result";


const AppRouterProvider = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/" element={<Layout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/carts" element={<Carts />} />
          <Route path="/panelAdmin" element={<AdminPanel />} />
          <Route path="/*" element={<NotFound />} />
          <Route path="paymentgateway" element={<Paymentgateway />} />
          <Route path="/basket" element={<Basket />} />
          <Route path="/finalAuth" element={<FinalAuth />} />
          <Route path="/productDetail">
            <Route path=":id" element={<CartDetail />} />
          </Route>
          <Route path=":id" element={<Collection />} />
          <Route path="/payment">
            <Route path=":paymentResult" element={<Result/>}/>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouterProvider;
