import React from "react";
import { Route, Switch } from "react-router-dom";
import Checkout from "./modules/checkout/Checkout";
import CheckoutConfirm from "./modules/checkout/CheckoutConfirm";
import Home from "./modules/signup/Home";
import Login from "./modules/signup/Login";
import NotFound from "./modules/notFound/NotFound";
import Signup from "./modules/signup/Signup";
import CategoryView from "./modules/category/CategoryView";
import ShoppingCart from "./modules/cart/ShoppingCart";
import PastPurchases from "./modules/pastPurchases/PastPurchases";
import BestSellers from "./modules/bestSellers/BestSellers";
import serviceDescription from "./modules/serviceDescription/ServiceDescription";
import SearchView from "./modules/search/SearchView";
import PropsRoute from "./common/PropsRoute";
import VendorHome from "./modules/vendor/VendorHome";
import OrderDetail from "./modules/vendor/OrderDetail/OrderDetailView";
import ManageProfile from "./modules/vendor/Profile/ManageProfile";
import ServiceView from "./modules/vendor/Services/ServiceView";
import ReviewForm from "./modules/review/ReviewPage";

import Reservation from "./modules/reservation/Reservation";

interface RouteProps {
  isAuthenticated: boolean;
  userHasAuthenticated: (authenticated: boolean) => void;
}

export const Routes: React.SFC<RouteProps> = (childProps) =>
  <Switch>
    <PropsRoute path="/" exact component={Home} props={childProps} />
    <PropsRoute path="/login" exact component={Login} props={childProps} />
    <PropsRoute path="/signup" exact component={Signup} props={childProps} />
    <Route path="/best" exact component={BestSellers} />
    <Route path="/servicedescription/:serviceid" exact component={serviceDescription} />
    <Route path="/cart" exact component={ShoppingCart} />
    <Route path="/category/:id" exact component={CategoryView} />
    <Route path="/past" exact component={PastPurchases} />
    <Route path="/checkout" exact component={Checkout} />
    <Route path="/checkout-confirm" exact component={CheckoutConfirm} />
    <Route path="/search/:id" exact component={SearchView} />
    <Route path="/vendor" exact component={VendorHome} />
    <Route path="/vendor/myProfile" exact component={ManageProfile} />
    <Route path="/vendor/services" exact component={ServiceView} />
    <Route path="/vendor/reservation/detail/:reservationId" exact component={OrderDetail} />
    <Route path="/review/:orderItemId" exact component={ReviewForm} />
    <Route path="/reservation/:id" exact component={Reservation}/>
    <Route component={NotFound} />
  </Switch>;