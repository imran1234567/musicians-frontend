import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { GetCategoryDetails } from '../../../services';
import List from '../catgoryItem';
import { Link } from 'react-router-dom';
import cat1 from '../../../../../assets/cat-1.jpeg';

const CategoryList = () => {
    const { catId, SubId } = useParams();
    const [products, setProducts] = useState([])

    const getDetails = async () => {
        const productList = await GetCategoryDetails.getProductListByCategory(catId, SubId);
        setProducts(productList.data);
    }
    useEffect(() => {
        getDetails();
    }, [catId, SubId])
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-4">
                    <List />
                </div>
                <div className="col-md-8">
                    <section class="featured-product" style={{ padding: 0 }}>
                        <div class="container-fluid">
                            <div class="featured-product-list row">
                                {products.map((row, index) => {
                                    return (
                                        <div class="col-lg-4 col-md-4 col-12" key={index}>
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
                                                        <a href="javascript:void(0)" class="cart-btn" onClick={() => this.props.addToCart(row)}>add to cart</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>)
                                })
                                }
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};


export default CategoryList;
