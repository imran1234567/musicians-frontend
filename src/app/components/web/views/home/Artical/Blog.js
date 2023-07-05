import React, { Component } from "react";
import axios from "axios";
import ReactHtmlParser from "react-html-parser";
import "./Blog.css"; // Import the CSS file for styling

export default class Blog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blog: null,
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;

    axios
      .get(`http://13.233.106.34:4000/api/blog/blog/${id}`)
      .then((response) => {
        const { data } = response;
        if (data.success) {
          this.setState({ blog: data.blog });
        }
      })
      .catch((error) => console.log(error));
  }

  render() {
    const { blog } = this.state;

    if (!blog) {
      return <div>Loading...</div>;
    }

    const { imageUrl, title, content } = blog;

    return (
      <div className="container">
        <div className="info-site">
          <h1 className="mb-4 mt-4 sec-title" style={{ textAlign: "center" }}>
            {title}
          </h1>
          <div className="blog-image">
            <img src={imageUrl} alt={title} />
          </div>
          <div className="blog-content">
            <p>{content}</p>
          </div>
        </div>
      </div>
    );
  }
}
