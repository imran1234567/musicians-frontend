import React, { Component } from "react";
import { Link } from "react-router-dom";
import { GetCategoryDetails } from "../../../services";
import List from "../catgoryItem";
import cat1 from "../../../../../assets/cat-1.jpeg";
import { connect } from "react-redux";
import { addToCart } from "../../../../store/actions/cartActions";
import category from "./category.css";
import Range from "./Range/Range";
class CategoryList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
  }

  async componentDidMount() {
    await this.getDetails();
  }

  async componentDidUpdate(prevProps) {
    const { catId, subId } = this.props.match.params;
    const prevCatId = prevProps.match.params.catId;
    const prevSubId = prevProps.match.params.subId;

    if (catId !== prevCatId || subId !== prevSubId) {
      await this.getDetails();
    }
  }

  getDetails = async () => {
    const { catId, SubId } = this.props.match.params;

    try {
      const productList = await GetCategoryDetails.getProductListByCategory(
        catId,
        SubId
      );
      this.setState({ products: productList.data });
    } catch (error) {
      console.error("Error getting product list:", error);
    }
  };

  render() {
    const { products } = this.state;

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div className="list-name">
              <List />
            </div>
          </div>
          <div>
            <Range />
          </div>
          <div className="col-md-8">
            <section className="featured-product" style={{ padding: 0 }}>
              <div className="container-fluid">
                <div className="featured-product-list row">
                  {products.map((row, index) => (
                    <div className="col-lg-4 col-md-4 col-12" key={index}>
                      <div className="product-box">
                        <div className="product-image">
                          <img src={cat1} alt="Product" />
                        </div>
                        <div className="product-text">
                          <Link
                            to={{
                              pathname: `/p/${row.slug}/${row.id}`,
                              state: row,
                            }}
                          >
                            <h6>
                              <b>{row.name}</b>
                            </h6>
                          </Link>
                          <h5>${row.price}</h5>
                          <div className="add-cart">
                            <a
                              href="javascript:void(0)"
                              className="cart-btn"
                              onClick={() => this.props.addToCart(row)}
                            >
                              add to cart
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, { addToCart })(CategoryList);
