import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default class Artical extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blogs: [], // To store the fetched blogs
    };
  }

  componentDidMount() {
    // Fetch the blogs from the API using Axios
    axios
      .get("http://13.233.106.34:4000/api/blog/getAllBlog")
      .then((response) => {
        const { data } = response;
        if (data.success) {
          this.setState({ blogs: data.blogs });
        }
      })
      .catch((error) => console.log(error));
  }

  render() {
    const { blogs } = this.state;

    return (
      <div>
        <section className="articals">
          <div className="container-fluid">
            <h2 className="sec-title">Articles &amp; Resources</h2>

            <div className="articals-list row">
              {blogs.map((blog) => (
                <div
                  className="col-lg-3 col-md-3 col-12 article-class"
                  key={blog.id}
                >
                  <Link to={`/blog/blog/${blog.id}`} className="artical-link">
                    <div className="artical-box">
                      <img src={blog.imageUrl} alt={blog.title} />
                      <div className="artical-text">
                        <h5>{blog.title}</h5>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  }
}
