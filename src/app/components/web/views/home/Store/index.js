import React, { Component } from "react";
import image1 from "./../../../../../../images/image1.jpg";
import ReactHtmlParser  from 'react-html-parser';
import Axios from "axios";
import { Apis } from "../../../../../../config";
export default class Store1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      storeText:"",
      storeImage:"",
    };
  }
  async componentDidMount() {
    try {
      // Fetch article content and static images
      const response = await Axios.get(Apis.GetAllPagesContent);
      if (
        response.data.success &&
        response.data.Content &&
        response.data.Content.storeText &&
        response.data.Content.storeImage 
      ) {
        this.setState({
        storeText: response.data.Content.storeText,
        storeImage: response.data.Content.storeImage,
          
        });
      }
    } catch (error) {
      console.error("Error fetching content:", error);
    }
  }
  render() {
    const { storeText,storeImage  } = this.state;
    const handleClick = () => {
      window.location.href = "/locator";
    };
    return (
      <section class="store" style={{ backgroundImage: `url(${storeImage})` }}>
        <div className="container">
          <div class="store-content">
            <div class="store-text">
              <h3>
                {storeText && ReactHtmlParser(storeText)}
              </h3>
              <div class="store-btn">
                <button onClick={handleClick}>Store Locator</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
