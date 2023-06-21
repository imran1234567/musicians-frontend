import React, { Component } from "react";
import axios from "axios";
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
      <div className="blog-container">
        <div className="blog-image">
          <img src={imageUrl} alt={title} />
        </div>
        <div className="blog-content">
          <h2 style={{textAlign:'center'}}>{title}</h2>
          <p>{content}</p>
        </div>
      </div>
    );
  }
}
