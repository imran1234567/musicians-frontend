import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Apis } from "../../../../../../config";
import ReactHtmlParser from "react-html-parser";

export default class Artical extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blogs: [],
      articleContent: "",
    };
  }

  async componentDidMount() {
    try {
      // Fetch article content
      const response = await axios.get(Apis.GetAllPagesContent);
      if (
        response.data.success &&
        response.data.Content &&
        response.data.Content.articleContent
      ) {
        this.setState({ articleContent: response.data.Content.articleContent });
      }
    } catch (error) {
      console.error("Error fetching content:", error);
    }

    try {
      // Fetch blogs
      const response = await axios.get(
        "http://3.25.175.163:4000/api/blog/getAllBlog"
      );
      const { data } = response;
      if (data.success) {
        this.setState({ blogs: data.blogs });
      }
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { blogs, articleContent } = this.state;

    return (
      <div>
        <section className="articals">
          <div className="container-fluid">
            <h2 className="sec-title">
              {articleContent && ReactHtmlParser(articleContent)}
            </h2>

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
