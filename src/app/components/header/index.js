import React, { Component } from 'react'
// import Login from '../../auth/login';
import { Link, withRouter } from 'react-router-dom';
// import Cartsidebar from '../web/views/cart-sidebar';
import { GetUserLogin } from '../services';
import Logo from '../../../assets/logo.png';
import Login from '../../auth/login';
import { connect } from 'react-redux';

class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: '', userName: '', searchtxt: ''
        };
    }
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    async componentDidMount() {
        let cookies = await GetUserLogin.isAuthenticate();
        this.setState({ token: cookies })
        let email = sessionStorage.getItem('email')
        if (email) {
            let user = await GetUserLogin.getCustomerDetail(email);
            if (user) {
                this.setState({ userName: user.data.firstName })
            }
        }
    }
    handleLogout = async (event) => {
        event.preventDefault();
        await GetUserLogin.logout();
    }

    handleClickSearch = event => {
        let { searchtxt } = this.state;
        this.props.history.push(`/product/catalogsearch/result/${searchtxt}`);
    }

    render() {
        let { token, userName, searchtxt } = this.state;
        const { cartItems } = this.props;
        return (
            <div>
                <header id="header">
                    <div class="upper-header">
                        <div class="container-fluid">
                            <div class="upper-header-content">
                                <ul class="upper-header-menu">
                                    <li>
                                        <a href="#">About Us</a>
                                    </li>
                                    <li>
                                        <a href="#">Contact</a>
                                    </li>
                                    <li>
                                        <a href="#">Order Support</a>
                                    </li>
                                    <li>
                                        <a href="#">Store Locator</a>
                                    </li>
                                </ul>
                                <h5>FREE AUSTRALIA WIDE SHIPPING ON ORDERS ABOVE <span>$49!</span></h5>
                                <div class="call-us">
                                    <h5>We’re here to help! Call Us Now:  <a href="tel:(02) 9755 9999">(02) 9755 9999</a></h5>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="header-mid">
                        <div class="container-fluid">
                            <div class="header-mid-content">
                                <div class="logo">
                                    <img src={Logo} />
                                </div>
                                <div class="mid-header-right">
                                    <div id="searchbox" class="s-search">
                                        <div class="input-group">
                                            <div class="form-outline">
                                                <input type="search" id="form1" class="form-control" placeholder="Search for a Product here..." />
                                            </div>
                                            <button type="button" class="btn">
                                                <i class='bx bx-search'></i>
                                            </button>
                                        </div>
                                    </div>
                                    <ul class="header-right-icon">

                                        <li class="h-search">
                                            <a href="#">
                                                <i class="bx bx-search"></i>
                                            </a>
                                        </li>
                                        <li class="user">
                                            {token ? <a href="#">
                                                <i class='bx bx-user'></i>
                                            </a> : <a data-target="#bd-example-modal" data-toggle="modal">
                                                <i class='bx bx-user'></i>
                                            </a>}
                                        </li>
                                        <li class="wishlist">
                                            {token ? <a href="#">
                                                <i class='bx bx-heart'></i>
                                            </a> : <a data-target="#bd-example-modal" data-toggle="modal">
                                                <i class='bx bx-heart'></i>
                                            </a>}
                                            <span>0</span>
                                        </li>
                                        <li class="cart">
                                            {token ? <Link to="/cart">
                                                <i class='bx bx-cart'></i>
                                            </Link> : <a data-target="#bd-example-modal" data-toggle="modal">
                                                <i class='bx bx-cart'></i>
                                            </a>}

                                            <span>{cartItems.length}</span>
                                        </li>
                                        <li class="cart-total">
                                            <h5>${cartItems.reduce((sum,i)=>(
                                                sum += i.qty * i.netPrice
                                            ),0)}</h5>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <nav class="navbar navbar-expand-lg">
                        <div class="container-fluid">
                            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span class="navbar-toggler-icon"></span>
                            </button>
                            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul class="navbar-nav mb-2 mb-lg-0">
                                    <li class="nav-item">
                                        <a class="nav-link " href="#">Guitar/Bass</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" href="#">Keyboards/Pianos</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" href="#">Amps/Effects</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" href="#">Live Sound</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" href="#">Recording Studio</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" href="#">Dj/Lighting</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" href="#">Drums/Percussion</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" href="#">Orchestral</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" href="#">Accessories</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" href="#">Shop By Brand</a>
                                    </li>
                                    <li class="nav-item mobile-menu">
                                        <a class="nav-link" href="#">About Us</a>
                                    </li>
                                    <li class="nav-item mobile-menu">
                                        <a class="nav-link" href="#">Contact</a>
                                    </li>
                                    <li class="nav-item mobile-menu">
                                        <a class="nav-link" href="#">Order Support</a>
                                    </li>
                                    <li class="nav-item mobile-menu">
                                        <a class="nav-link" href="#">Store Locator</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </header>
                {/* <header className="header clearfix">
                    <div className="navbar-top bg-success pt-2 pb-2">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-lg-12 text-center">
                                    <a href="/" className="mb-0 text-white">
                                        20% cashback for new users | Code: <strong><span className="text-light">OGOFERS13 <span className="mdi mdi-tag-faces" /></span> </strong>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <nav className="navbar navbar-light navbar-expand-lg bg-dark bg-faded osahan-menu">
                        <div className="container-fluid">
                            <a className="navbar-brand" href="/"> <img src="/img/logo.png" alt="logo" /> </a>
                            <button className="navbar-toggler navbar-toggler-white" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon" />
                            </button>
                            <div className="navbar-collapse" id="navbarNavDropdown">
                                <div className="navbar-nav mr-auto mt-2 mt-lg-0 margin-auto top-categories-search-main">
                                    <div className="top-categories-search" onSubmit={this.handleClickSearch}>
                                        <div className="input-group">
                                            <input className="form-control" placeholder="Search products in Your City" aria-label="Search products in Your City" type="text" name="searchtxt" value={searchtxt} onChange={(e)=>this.handleChange(e)}/>
                                            <span className="input-group-btn">
                                                <button className="btn btn-secondary" type="submit" onClick={this.handleClickSearch}><i className="mdi mdi-file-find" /> Search</button>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="my-2 my-lg-0">
                                    <ul className="list-inline main-nav-right" >
                                        <li className="list-inline-item">
                                            <a data-target="#bd-example-modal" data-toggle="modal" className="btn btn-link" style={token ? { display: 'none' } : { display: 'block' }}><i className="mdi mdi-account-circle" /> Login/Sign Up</a>
                                            <div className="dropdown" style={token ? { display: 'block' } : { display: 'none' }}>
                                                <button className="btn btn-account dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    {userName}
                                                </button>

                                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                    <a className="dropdown-item" href="/account/view"><i className="uil uil-apps" />Dashboard</a>
                                                    <a className="dropdown-item" href="/account/profile"><i className="mdi mdi-account-outline" aria-hidden="true"></i>My Profile</a>
                                                    <a className="dropdown-item" href="/account/wishlist"><i className="mdi mdi-heart-outline" aria-hidden="true"></i>Wish List</a>
                                                    <a className="dropdown-item" href="/account/order/list"><i className="mdi mdi-format-list-bulleted" aria-hidden="true"></i> Orders List</a>
                                                    <div class="dropdown-divider"></div>
                                                    <span className="dropdown-item" onClick={this.handleLogout}><i className="mdi mdi-lock" aria-hidden="true"></i> Logout</span>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="list-inline-item cart-btn">
                                            <Cartsidebar />
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </nav>
                </header> */}
                {/* login popup */}
                <Login />
            </div>
        )
    }
}
export default withRouter(connect(
    (state) => ({
        cartItems: state.cart.cartItems,
    }))(Navigation));

