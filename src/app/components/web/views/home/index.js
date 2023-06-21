import React, { Component } from "react";
import BannersSlider from "../banner-carousel";
import Category from "../category";
import Featured from "../featured";
import TopArrival from "./TopArrival";
import Orange from "./Orange";
import Artical from "./Artical";
import Store1 from "./Store";
import Testimonial from "./testimonial";
import Process from "./Process";

// import Topsavers from './top-section';
// import Bestofferbanner from './best-offers-banner';
// import Topstample from './top-stample';

export default class Home extends Component {
  render() {
    return (
      <div className="wrapper">
        <Category />

        <BannersSlider />
        <TopArrival />

        <Featured />
        <Orange />
        <Artical />
        <Store1 />
        <Testimonial />
        <Process />

        {/* <Bannerslider />
                <Topsavers />
                <Bestofferbanner />
                <Topstample /> */}
      </div>
    );
  }
}
