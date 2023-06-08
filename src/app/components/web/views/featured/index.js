import React, { Component } from 'react';
import { connect } from 'react-redux';
import GroceryStampleDetails from '../../../services/GroceryStampleDetails';
import { addToCart } from '../../../../store/actions/cartActions';
import { CircularProgress } from '@material-ui/core';
import cat1 from '../../../../../assets/cat-1.jpeg';
import { Link } from 'react-router-dom';
import { GetUserLogin } from '../../../services';
import Login from '../../../../auth/login';

class Featured extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: "",
            productList: [],
            isLoaded: false
        }
    }

    async componentDidMount() {
        let list = await GroceryStampleDetails.getAllGroceryStaple();
        let cookies = await GetUserLogin.isAuthenticate();
        this.setState({
            token: cookies
        })
        console.log("list", list.product)
        if (list) {
            this.setState({
                productList: list,
                isLoaded: true
            })
        }
    }

    checkCart = (productId) => {
        const { cartItems } = this.props;
        const productExistsInCart = cartItems.some((product) => product.id === productId);
        if (productExistsInCart) {
            return true;
        } else {
            return false;
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
                                const isProductInCart = this.checkCart(row.id);
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
                                                    {isProductInCart ? <Link to="/cart" className="cart-btn">go to cart</Link> : <a href="javascript:void(0)" class="cart-btn" onClick={() => this.props.addToCart(row)}>add to cart</a>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>)
                            })
                        }
                    </div>
                </div>
                <Login />
            </section>
        );
    }
}

const mapStateToProps = (state) => ({
    cartItems: state.cart.cartItems,
});

export default connect(mapStateToProps, { addToCart })(Featured);
