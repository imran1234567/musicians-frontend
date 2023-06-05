import React, { Component } from 'react'
import BannersSlider from '../banner-carousel'
import Category from '../category'
import Featured from '../featured'
// import Topsavers from './top-section';
// import Bestofferbanner from './best-offers-banner';
// import Topstample from './top-stample';

export default class Home extends Component {
    render() {
        return (
            <div className="wrapper">
                <Category/>
                <BannersSlider/>
                <Featured/>
                {/* <Bannerslider />
                <Topsavers />
                <Bestofferbanner />
                <Topstample /> */}
            </div>
        )
    }
}
