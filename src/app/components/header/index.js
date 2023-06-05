import React, { Component } from 'react'
// import Login from '../../auth/login';
import { Link, withRouter } from 'react-router-dom';
// import Cartsidebar from '../web/views/cart-sidebar';
import { GetUserLogin } from '../services';
import Logo from '../../../assets/logo.png';
import Login from '../../auth/login';
import { connect } from 'react-redux';
import { NavDropdown } from "react-bootstrap";
import {
  faSearch,
  faHeart,
  faUser,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Navbar from "react-bootstrap/Navbar";
import { Nav, Container, Row } from "react-bootstrap";

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
                                        <Link to="/about" className="nav-link">
                                            ABOUT US
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/contact" className="nav-link">
                                            CONTACT
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/order" className="nav-link">
                                            ORDER SUPPORT
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/store" className="nav-link">
                                            STORE LOCATOR
                                        </Link>
                                    </li>
                                </ul>
                                <h5>
                                    FREE AUSTRALIA WIDE SHIPPING ON ORDERS ABOVE <span>$49!</span>
                                </h5>
                                <div class="call-us">
                                    <h5>
                                        We’re here to help! Call Us Now:{" "}
                                        <a href="tel:(02) 9755 9999">(02) 9755 9999</a>
                                    </h5>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="header-mid">
                        <div class="container-fluid">
                            <div class="header-mid-content">
                                <Link class="logo" to="/">
                                    <img src={Logo} alt="logo" className="image-logo" />
                                </Link>
                                <div class="mid-header-right">
                                    <div id="searchbox" class="s-search">
                                        <div class="input-group">
                                            <div class="form-outline">
                                                <input
                                                    type="search"
                                                    id="form1"
                                                    class="form-control"
                                                    placeholder="Search for a Product here..."
                                                />
                                            </div>
                                            <button type="button" className="btn " >
                                                <Link to="/person" style={{display:'flex',justifyContent:'end'}}>
                                                    <FontAwesomeIcon icon={faSearch} style={{marginTop:'2px', color:'white'}}/>
                                                </Link>
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

                    <div className="navigation-bar">
                        <Navbar className="navigate" expand="md">
                            <Container className="container-fluid">
                                <Nav className="me-auto1" style={{ color: "white" }}>
                                    <NavDropdown
                                        title="GUITAR/BASS"
                                        id="guitar-bass-dropdown"
                                        className=".nav-dropdown-title"
                                        color="white"
                                    >
                                        <div className="submenu">
                                            <NavDropdown.Item
                                                as={Link}
                                                to="/guitar/guitar1"
                                                activeClassName="active"
                                            >
                                                Effect Pedals
                                            </NavDropdown.Item>
                                            <NavDropdown.Item
                                                as={Link}
                                                to="/guitar/guitar2"
                                                activeClassName="active"
                                            >
                                                Electric guitar
                                            </NavDropdown.Item>
                                            <NavDropdown.Item
                                                as={Link}
                                                to="/guitar/guitar3"
                                                activeClassName="active"
                                            >
                                                Guitar Stands & Hangers
                                            </NavDropdown.Item>
                                            <NavDropdown.Item
                                                as={Link}
                                                to="/guitar/guitar4"
                                                activeClassName="active"
                                            >
                                                Guitar Straps
                                            </NavDropdown.Item>
                                            <NavDropdown.Item
                                                as={Link}
                                                to="/guitar/guitar5"
                                                activeClassName="active"
                                            >
                                                Guitar Wireless Systems
                                            </NavDropdown.Item>
                                            <NavDropdown.Item
                                                as={Link}
                                                to="/guitar/guitar6"
                                                activeClassName="active"
                                            >
                                                Guitarist Stools
                                            </NavDropdown.Item>
                                            <NavDropdown.Item
                                                as={Link}
                                                to="/guitar/guitar7"
                                                activeClassName="active"
                                            >
                                                Hard Cases & Gigs Bags
                                            </NavDropdown.Item>
                                            <NavDropdown.Item
                                                as={Link}
                                                to="/guitar/guitar8"
                                                activeClassName="active"
                                            >
                                                Instrument Cables
                                            </NavDropdown.Item>
                                            <NavDropdown.Item
                                                as={Link}
                                                to="/guitar/guitar9"
                                                activeClassName="active"
                                            >
                                                Lifestyle
                                            </NavDropdown.Item>
                                            <NavDropdown.Item
                                                as={Link}
                                                to="/guitar/guitar10"
                                                activeClassName="active"
                                            >
                                                Pedal Boards
                                            </NavDropdown.Item>
                                            <NavDropdown.Item
                                                as={Link}
                                                to="/guitar/guitar11"
                                                activeClassName="active"
                                            >
                                                Ukulele Stands- Bags & Cases
                                            </NavDropdown.Item>
                                            <NavDropdown.Item
                                                as={Link}
                                                to="/guitar/guitar12"
                                                activeClassName="active"
                                            >
                                                Ukuleles
                                            </NavDropdown.Item>
                                            <NavDropdown.Item
                                                as={Link}
                                                to="/guitar/guitar13"
                                                activeClassName="active"
                                            >
                                                Acoustic Guitars
                                            </NavDropdown.Item>
                                            <NavDropdown.Item
                                                as={Link}
                                                to="/guitar/guitar14"
                                                activeClassName="active"
                                            >
                                                Classical Guitars
                                            </NavDropdown.Item>
                                            <NavDropdown.Item
                                                as={Link}
                                                to="/guitar/guitar15"
                                                activeClassName="active"
                                            >
                                                Turners
                                            </NavDropdown.Item>
                                        </div>
                                    </NavDropdown>

                                    <NavDropdown
                                        title="KEYBOARDS/PIANOS"
                                        id="keyboards-pianos-dropdown"
                                    >
                                        <div className="submenu">
                                            {/* Add submenu items for keyboards/pianos */}
                                            <NavDropdown.Item
                                                as={Link}
                                                to="/keyboards/keyboard1"
                                                activeClassName="active"
                                            >
                                                Guitar/Bass
                                            </NavDropdown.Item>
                                            <NavDropdown.Item
                                                as={Link}
                                                to="/keyboards/keyboard2"
                                                activeClassName="active"
                                            >
                                                Keyboards
                                            </NavDropdown.Item>
                                            <NavDropdown.Item
                                                as={Link}
                                                to="/keyboards/keyboard3"
                                                activeClassName="active"
                                            >
                                                Amps
                                            </NavDropdown.Item>
                                            <NavDropdown.Item
                                                as={Link}
                                                to="/keyboards/keyboard4"
                                                activeClassName="active"
                                            >
                                                Live Sound
                                            </NavDropdown.Item>
                                            <NavDropdown.Item
                                                as={Link}
                                                to="/keyboards/keyboard5"
                                                activeClassName="active"
                                            >
                                                Studio
                                            </NavDropdown.Item>
                                            <NavDropdown.Item
                                                as={Link}
                                                to="/keyboards/keyboard6"
                                                activeClassName="active"
                                            >
                                                DJ
                                            </NavDropdown.Item>
                                            <NavDropdown.Item
                                                as={Link}
                                                to="/keyboards/keyboard7"
                                                activeClassName="active"
                                            >
                                                Drums/Percussion
                                            </NavDropdown.Item>
                                            <NavDropdown.Item
                                                as={Link}
                                                to="/keyboards/keyboard8"
                                                activeClassName="active"
                                            >
                                                Folk
                                            </NavDropdown.Item>
                                            <NavDropdown.Item
                                                as={Link}
                                                to="/keyboards/keyboard9"
                                                activeClassName="active"
                                            >
                                                Orchestral/Bass & Woodwind
                                            </NavDropdown.Item>
                                        </div>
                                    </NavDropdown>

                                    <NavDropdown title="AMPS/EFFECTS" id="amps-effects-dropdown">
                                        <div className="submenu">
                                            {/* Add submenu items for amps/effects */}
                                            <NavDropdown.Item
                                                as={Link}
                                                to="/amps/amp1"
                                                activeClassName="active"
                                            >
                                                Drum Amps
                                            </NavDropdown.Item>
                                            <NavDropdown.Item
                                                as={Link}
                                                to="/amps/amp2"
                                                activeClassName="active"
                                            >
                                                Keyboard Amps
                                            </NavDropdown.Item>
                                            <NavDropdown.Item
                                                as={Link}
                                                to="/amps/amp3"
                                                activeClassName="active"
                                            >
                                                Bass Amps
                                            </NavDropdown.Item>
                                            <NavDropdown.Item
                                                as={Link}
                                                to="/amps/amp4"
                                                activeClassName="active"
                                            >
                                                Guitar Amps
                                            </NavDropdown.Item>
                                        </div>
                                    </NavDropdown>

                                    <NavDropdown title="LIVE SOUND" id="live-sound">
                                        <div className="submenu">
                                            {/* Add submenu items for keyboards/pianos */}
                                            <NavDropdown.Item
                                                as={Link}
                                                to="/sound/sound1"
                                                activeClassName="active"
                                            >
                                                Active Speakers
                                            </NavDropdown.Item>
                                            <NavDropdown.Item
                                                as={Link}
                                                to="/sound/sound2"
                                                activeClassName="active"
                                            >
                                                DI Boxes
                                            </NavDropdown.Item>
                                            <NavDropdown.Item
                                                as={Link}
                                                to="/sound/sound3"
                                                activeClassName="active"
                                            >
                                                Instrument Microphones
                                            </NavDropdown.Item>
                                            <NavDropdown.Item
                                                as={Link}
                                                to="/sound/sound4"
                                                activeClassName="active"
                                            >
                                                Passive Mixers
                                            </NavDropdown.Item>
                                            <NavDropdown.Item
                                                as={Link}
                                                to="/sound/sound5"
                                                activeClassName="active"
                                            >
                                                Passive Speakers
                                            </NavDropdown.Item>
                                            <NavDropdown.Item
                                                as={Link}
                                                to="/sound/sound6"
                                                activeClassName="active"
                                            >
                                                Portable P.A
                                            </NavDropdown.Item>
                                            <NavDropdown.Item
                                                as={Link}
                                                to="/sound/sound7"
                                                activeClassName="active"
                                            >
                                                Power Amps
                                            </NavDropdown.Item>
                                            <NavDropdown.Item
                                                as={Link}
                                                to="/sound/sound8"
                                                activeClassName="active"
                                            >
                                                Power Mixers
                                            </NavDropdown.Item>
                                            <NavDropdown.Item
                                                as={Link}
                                                to="/sound/sound9"
                                                activeClassName="active"
                                            >
                                                Vocal Microphones
                                            </NavDropdown.Item>
                                            <NavDropdown.Item
                                                as={Link}
                                                to="/sound/sound10"
                                                activeClassName="active"
                                            >
                                                Vocal Processors
                                            </NavDropdown.Item>
                                            <NavDropdown.Item
                                                as={Link}
                                                to="/sound/sound11"
                                                activeClassName="active"
                                            >
                                                Microphone Stands
                                            </NavDropdown.Item>
                                        </div>
                                    </NavDropdown>
                                    <NavDropdown title="Studio" id="studio">
                                        <div className="submenu">
                                            {/* Add submenu items for keyboards/pianos */}
                                            <NavDropdown.Item
                                                as={Link}
                                                to="/studio/studio1"
                                                activeClassName="active"
                                            >
                                                Headphones
                                            </NavDropdown.Item>
                                            <NavDropdown.Item
                                                as={Link}
                                                to="/studio/studio1"
                                                activeClassName="active"
                                            >
                                                Recording Microphones
                                            </NavDropdown.Item>
                                            <NavDropdown.Item
                                                as={Link}
                                                to="/studio/studio1"
                                                activeClassName="active"
                                            >
                                                Studio Monitors
                                            </NavDropdown.Item>
                                            <NavDropdown.Item
                                                as={Link}
                                                to="/studio/studio1"
                                                activeClassName="active"
                                            >
                                                Vocal Processors
                                            </NavDropdown.Item>
                                            <NavDropdown.Item
                                                as={Link}
                                                to="/studio/studio1"
                                                activeClassName="active"
                                            >
                                                Studio Controllers
                                            </NavDropdown.Item>
                                            <NavDropdown.Item
                                                as={Link}
                                                to="/studio/studio1"
                                                activeClassName="active"
                                            >
                                                Recording Gear
                                            </NavDropdown.Item>
                                            <NavDropdown.Item
                                                as={Link}
                                                to="/studio/studio1"
                                                activeClassName="active"
                                            >
                                                Studio Accessories
                                            </NavDropdown.Item>
                                        </div>
                                    </NavDropdown>
                                    <NavDropdown title="DJ" id="DJ-PART">
                                        <div className="submenu">
                                            {/* Add submenu items for keyboards/pianos */}
                                            <NavDropdown.Item
                                                as={Link}
                                                to="/dj/dj1"
                                                activeClassName="active"
                                            >
                                                Headphones
                                            </NavDropdown.Item>
                                            <NavDropdown.Item
                                                as={Link}
                                                to="/dj/dj2"
                                                activeClassName="active"
                                            >
                                                Lighting
                                            </NavDropdown.Item>
                                            <NavDropdown.Item
                                                as={Link}
                                                to="/dj/dj3"
                                                activeClassName="active"
                                            >
                                                DJ Controllers
                                            </NavDropdown.Item>
                                            <NavDropdown.Item
                                                as={Link}
                                                to="/dj/dj4"
                                                activeClassName="active"
                                            >
                                                DJ Gear
                                            </NavDropdown.Item>
                                            <NavDropdown.Item
                                                as={Link}
                                                to="/dj/dj5"
                                                activeClassName="active"
                                            >
                                                DJ Accessories
                                            </NavDropdown.Item>
                                        </div>
                                    </NavDropdown>
                                    <NavDropdown title="Drums/Percussion" id="percussion">
                                        <div className="submenu">
                                            {/* Add submenu items for keyboards/pianos */}
                                            <NavDropdown.Item
                                                as={Link}
                                                to="/percussion/percussion1"
                                                activeClassName="active"
                                            >
                                                Cajons
                                            </NavDropdown.Item>
                                            <NavDropdown.Item
                                                as={Link}
                                                to="/percussion/percussion2"
                                                activeClassName="active"
                                            >
                                                Congas & Bongos
                                            </NavDropdown.Item>
                                            <NavDropdown.Item
                                                as={Link}
                                                to="/percussion/percussion3"
                                                activeClassName="active"
                                            >
                                                Cymbals
                                            </NavDropdown.Item>
                                            <NavDropdown.Item
                                                as={Link}
                                                to="/percussion/percussion4"
                                                activeClassName="active"
                                            >
                                                Drum Accessories
                                            </NavDropdown.Item>
                                            <NavDropdown.Item
                                                as={Link}
                                                to="/percussion/percussion5"
                                                activeClassName="active"
                                            >
                                                Electronic Drum Kits
                                            </NavDropdown.Item>
                                            <NavDropdown.Item
                                                as={Link}
                                                to="/percussion/percussion6"
                                                activeClassName="active"
                                            >
                                                Junior Drum kits
                                            </NavDropdown.Item>
                                            <NavDropdown.Item
                                                as={Link}
                                                to="/percussion/percussion7"
                                                activeClassName="active"
                                            >
                                                Percussion Pads & Drum Machine
                                            </NavDropdown.Item>
                                            <NavDropdown.Item
                                                as={Link}
                                                to="/percussion/percussion8"
                                                activeClassName="active"
                                            >
                                                Timbales
                                            </NavDropdown.Item>
                                            <NavDropdown.Item
                                                as={Link}
                                                to="/percussion/percussion9"
                                                activeClassName="active"
                                            >
                                                World Percussion
                                            </NavDropdown.Item>
                                            <NavDropdown.Item
                                                as={Link}
                                                to="/percussion/percussion10"
                                                activeClassName="active"
                                            >
                                                Acoustic Drum Kits
                                            </NavDropdown.Item>
                                        </div>
                                    </NavDropdown>
                                    <NavDropdown title="Folk" id="percussion">
                                        <div className="submenu">
                                            {/* Add submenu items for keyboards/pianos */}
                                            <NavDropdown.Item
                                                as={Link}
                                                to="/folk/folk1"
                                                activeClassName="active"
                                            >
                                                Accordions
                                            </NavDropdown.Item>
                                            <NavDropdown.Item
                                                as={Link}
                                                to="/folk/folk2"
                                                activeClassName="active"
                                            >
                                                Banjos
                                            </NavDropdown.Item>
                                            <NavDropdown.Item
                                                as={Link}
                                                to="/folk/folk3"
                                                activeClassName="active"
                                            >
                                                Harmonicas
                                            </NavDropdown.Item>
                                            <NavDropdown.Item
                                                as={Link}
                                                to="/folk/folk4"
                                                activeClassName="active"
                                            >
                                                Mandolins
                                            </NavDropdown.Item>
                                        </div>
                                    </NavDropdown>
                                    <NavDropdown
                                        title="Orchestral/Brass & Woodwind"
                                        id="orchestral"
                                    >
                                        <div className="submenu">
                                            {/* Add submenu items for keyboards/pianos */}
                                            <NavDropdown.Item
                                                as={Link}
                                                to="/woodwind/woodwind1"
                                                activeClassName="active"
                                            >
                                                Accessories
                                            </NavDropdown.Item>
                                            <NavDropdown.Item
                                                as={Link}
                                                to="/woodwind/woodwind2"
                                                activeClassName="active"
                                            >
                                                Cellos
                                            </NavDropdown.Item>
                                            <NavDropdown.Item
                                                as={Link}
                                                to="/woodwind/woodwind3"
                                                activeClassName="active"
                                            >
                                                Clarinets
                                            </NavDropdown.Item>
                                            <NavDropdown.Item
                                                as={Link}
                                                to="/woodwind/woodwind4"
                                                activeClassName="active"
                                            >
                                                Cornets
                                            </NavDropdown.Item>
                                            <NavDropdown.Item
                                                as={Link}
                                                to="/woodwind/woodwind5"
                                                activeClassName="active"
                                            >
                                                Flutes
                                            </NavDropdown.Item>
                                            <NavDropdown.Item
                                                as={Link}
                                                to="/woodwind/woodwind6"
                                                activeClassName="active"
                                            >
                                                Saxophones
                                            </NavDropdown.Item>
                                            <NavDropdown.Item
                                                as={Link}
                                                to="/woodwind/woodwind7"
                                                activeClassName="active"
                                            >
                                                Trombones
                                            </NavDropdown.Item>
                                            <NavDropdown.Item
                                                as={Link}
                                                to="/woodwind/woodwind8"
                                                activeClassName="active"
                                            >
                                                Trumpets
                                            </NavDropdown.Item>
                                            <NavDropdown.Item
                                                as={Link}
                                                to="/woodwind/woodwind9"
                                                activeClassName="active"
                                            >
                                                Violins
                                            </NavDropdown.Item>
                                        </div>
                                    </NavDropdown>
                                </Nav>
                            </Container>
                        </Navbar>
                    </div>
                </header>
                {/* <header id="header">
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
                </header> */}
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

