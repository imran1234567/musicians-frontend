import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Footer from "../footer";
import Header from "../header";
// import Footer from '../footer';
import Home from "../web/views/home";
import About from "./views/about";
import Cart from "./views/cart";
import Contact from "./views/contact";
import PrivateRoute from "../PrivateRoute";
import SearchItem from "../searchItem/SearchItem";

// import Productview from '../web/views/product';
import Singleproduct from "./views/single-product";
// import PrivateRoute from '../PrivateRoute';
// import Checkout from './views/checkout';
// import Shopdetails from './views/shop-details';
// import Login from './views/checkout/login';
// import Register from './views/checkout/register';
// import NotFound from '../../NotFound';
// import Complete from './views/checkout/complete';
import Account from "./views/account";
import CategoryList from "./views/categoryList";
import Range from "./views/categoryList/Range/Range";
import Wishlist from "./views/Wishlist/Wishlist";
import compare from "./views/compare";
import Checkout from "./views/checkout";
import privacy_policy from "./views/privacy_policy";
import Terms from "./views/terms";
import Delivery from "./views/Delivery";
import ScrollToTop from "./views/account/view/ScrollToTop";
import pay_method from "./views/account/view/pay_method";
import AccordionItem from "react-bootstrap/esm/AccordionItem";
import Affiliate from "./views/Affiliate";
import TopArrival from "./views/home/TopArrival";
import Orange from "./views/home/Orange";
import Artical from "./views/home/Artical";
import Blog from "./views/home/Artical/Blog";
import Store1 from "./views/home/Store";

import Testimonial from "./views/home/testimonial";
import Process from "./views/home/Process";
import OrderSuccess from "./views/checkout/OrderSuccess";
import OrderFailure from "./views/checkout/OrderFailure";
import NoProductFound from "../searchItem/NoProductFound";
import gift from "../gift";
import special from "../special";
import returns from "../returns";
import SiteMap from "../SiteMap";
import StoreLocator from "../StoreLocator";
import OrderSupport from "../OrderSupport";
import NewsletterPopup from "../NewsLetterPopup";
import BrandsList from "../brands";
import AffiliateRegister from "./views/Affiliate/AffiliateRegister";
import resultProduct from "../brands/resultProduct/resultProduct";

// import Failed from './views/checkout/failed';

export default class rootRoutes extends Component {
  render() {
    return (
      <div>
        <Header />
        <ScrollToTop />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/cart" component={Cart} />
          <Route exact path="/about" component={About} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/p/:slug/:id" component={Singleproduct} />
          <Route exact path="/cat/:catId/:SubId" component={CategoryList} />
          <PrivateRoute path="/account" component={Account} />
          <PrivateRoute path="/checkout" component={Checkout} />
          <Route exact path="/range" component={Range} />
          <Route exact path="/wishlist" component={Wishlist} />
          <Route exact path="/compare" component={compare} />

          <Route exact path="/policy" component={privacy_policy} />
          <Route exact path="/terms" component={Terms} />
          <Route exact path="/delivery" component={Delivery} />
          <Route exact path="/zip" component={pay_method} />
          <Route exact path="/accordion" component={AccordionItem} />
          <Route exact path="/affiliate" component={Affiliate} />
          <Route exact path="/SearchItem" component={SearchItem} />
          <Route exact path="/arrival" component={TopArrival} />
          <Route exact path="/orange" component={Orange} />
          <Route exact path="/artical" component={Artical} />
          <Route path="/blog/blog/:id" component={Blog} />

          <Route exact path="/store" component={Store1} />
          <Route exact path="/testimonial" component={Testimonial} />
          <Route exact path="/process" component={Process} />
          <Route exact path="/orderSuccess" component={OrderSuccess} />
          <Route exact path="/orderFailure" component={OrderFailure} />
          <Route exact path="/noProduct" component={NoProductFound} />
          <Route exact path="/gift" component={gift} />
          <Route exact path="/special" component={special} />
          <Route exact path="/returns" component={returns} />
          <Route exact path="/map" component={SiteMap} />
          <Route exact path="/locator" component={StoreLocator} />
          <Route exact path="/support" component={OrderSupport} />
          <Route exact path="/news" component={NewsletterPopup} />
          <Route exact path="/brands" component={BrandsList} />
          <Route exact path="/reg" component={AffiliateRegister} />
          <Route exact path="/resultProduct" component={resultProduct} />

          {/* <Route exact path='/p/:slug/:id' component={Singleproduct} />
                    <Route exact path='/shop/:slug' component={Shopdetails} />
                    <PrivateRoute path='/checkout' component={Checkout} /> 
                    <Route path='/product/catalogsearch/result' component={Productview} /> 
                    <PrivateRoute path='/order/success' component={Complete} /> 
                    <PrivateRoute path='/order/failed' component={Failed} />  

                    <PrivateRoute path='/account' component={Account} /> */}
          {/* <Route exact path='/login' component={Login} /> */}
          {/* <Route exact path='/register' component={Register} /> */}
          {/* <Route component={NotFound} /> */}
        </Switch>
        <Footer />
      </div>
    );
  }
}
