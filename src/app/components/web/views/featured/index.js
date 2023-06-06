import React, { Component } from 'react';
import { connect } from 'react-redux';
import GroceryStampleDetails from '../../../services/GroceryStampleDetails';
import { addToCart } from '../../../../store/actions/cartActions';
import { CircularProgress } from '@material-ui/core';
import cat1 from '../../../../../assets/cat-1.jpeg';
import {Link} from 'react-router-dom';

class Featured extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productList: [],
            isLoaded: false
        }
    }

    async componentDidMount() {
        let list = await GroceryStampleDetails.getAllGroceryStaple();
        console.log("list", list.product)
        if (list) {
            this.setState({
                productList: list,
                isLoaded: true
            })
        }
    }

    render() {
        let list = this.state.productList?.product;
        return (
            <section class="featured-product">
                <div class="container-fluid">
                    <h2 class="sec-title">Featured Products</h2>
                    <div class="featured-product-list row">
                        {!this.state.isLoaded ? <div className="progress-bar-bk"><CircularProgress color="secondary" /></div> :
                            list.map((row, index) => {
                                return (
                                <div class="col-lg-3 col-md-3 col-12" key={index}>
                                    <div class="product-box">
                                        <div class="product-image">
                                            <img src={cat1} />
                                        </div>
                                        <div class="product-text">
                                        <Link to={{ pathname: `/p/${row.slug}/${row.id}`, state: row }}>
                                            <h6>{row.name}</h6>
                                        </Link>
                                            <h5>${row.price}</h5>
                                            <div class="add-cart">
                                                <a href="javascript:void(0)" class="cart-btn" onClick={()=>this.props.addToCart(row)}>add to cart</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>)
                            })
                        }
                    </div>
                </div>
            </section>
        );
    }
}

export default connect(null, {addToCart})(Featured);
