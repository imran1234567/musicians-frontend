import React, { Component } from "react";
import d3 from "./../../../../../../images/d3.jpg"; 
import ReactHtmlParser  from 'react-html-parser';
import Axios from "axios";
import { Apis } from "../../../../../../config";

export default class Orange extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orangeText:"",
      orangeImage:"",
    };
  }
  async componentDidMount() {
    try {
      // Fetch article content and static images
      const response = await Axios.get(Apis.GetAllPagesContent);
      if (
        response.data.success &&
        response.data.Content &&
        response.data.Content.orangeText &&
        response.data.Content.orangeImage 
      ) {
        this.setState({
          orangeText: response.data.Content.orangeText,
          orangeImage: response.data.Content.orangeImage,
          
        });
      }
    } catch (error) {
      console.error("Error fetching content:", error);
    }
    await Axios
      .get("http://13.233.106.34:4000/api/product/getAllproductList")
      .then((response) => {
        const products = response.data.product.filter(
          (product) => product.featured === true
        );
        this.setState({ products });
      })
      .catch((error) => {
        this.setState({ error: error.message });
      });

  }
  render() {
    const { orangeText,orangeImage , products } = this.state;
    
    console.log(products);
    
    return (
      <div>
        <section class="orange" style={{ backgroundImage: `url(${orangeImage})` }}>
          <div class="container">
            <div class="orange-text">
            <h3>{products ? products[0].name:""} </h3>
              <ul>
                <li>Brand: {products ? products[0].brand:""} </li>
                <li>Product Code: {products ? products[0].slug:""} </li>
                <li>Availability: In Stock</li>
              </ul> 
              <h4>${products ? products[0].price:""}</h4>    
            </div>
          </div>
        </section>
      </div>
    );
  }
}
