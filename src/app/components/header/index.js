import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { NavDropdown } from "react-bootstrap";
import {
  faSearch,
  faHeart,
  faUser,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Navbar from "react-bootstrap/Navbar";
import { Nav, Container } from "react-bootstrap";
import Logo from "../../../assets/logo.png";
import Login from "../../auth/login";
import { GetCategoryDetails, GetUserLogin } from "../services";
import b6 from "../../../images/b6.jpg";
import { orange } from "@material-ui/core/colors";

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: "",
      userName: "",
      searchtxt: "",
      headerData: [],
      headerItems: [],
      expanded: false,
    };
  }

  handleToggle = () => {
    this.setState((prevState) => ({
      expanded: !prevState.expanded,
    }));
  };

  handleChange = (e) => {
    this.setState({ searchtxt: e.target.value });
  };

  handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      this.handleClickSearch();
    }
  };

  handleClickSearch = () => {
    const { searchtxt } = this.state;
    this.props.history.push({
      pathname: "/SearchItem",
      state: { value: searchtxt },
    });
  };

  handleMouseEnter = (categoryId) => {
    this.setState((prevState) => ({
      headerItems: prevState.headerItems.map((item) => {
        if (item.categoryId === categoryId) {
          return {
            ...item,
            showSubmenu: true,
          };
        }
        return item;
      }),
    }));
  };

  handleMouseLeave = (categoryId) => {
    this.setState((prevState) => ({
      headerItems: prevState.headerItems.map((item) => {
        if (item.categoryId === categoryId) {
          return {
            ...item,
            showSubmenu: false,
          };
        }
        return item;
      }),
    }));
  };

  async componentDidMount() {
    let cookies = await GetUserLogin.isAuthenticate();
    let navCatgory = await GetCategoryDetails.getCategoryList();
    this.setState({ token: cookies, headerData: navCatgory.data }, () => {
      this.setState({
        headerItems: Object.values(
          this.state.headerData.reduce((result, item) => {
            const existingCategory = result[item.categoryId];
            if (existingCategory) {
              existingCategory.subCategory.push({
                id: item.id,
                sub_name: item.sub_name,
              });
            } else {
              result[item.categoryId] = {
                name: item.category.name,
                categoryId: item.categoryId,
                subCategory: [
                  {
                    id: item.id,
                    sub_name: item.sub_name,
                  },
                ],
              };
            }
            return result;
          }, {})
        ),
      });
    });
    let email = sessionStorage.getItem("email");
    if (email) {
      let user = await GetUserLogin.getCustomerDetail(email);
      if (user) {
        this.setState({ userName: user.data.firstName });
      }
    }
  }

  handleLogout = async (event) => {
    event.preventDefault();
    await GetUserLogin.logout();
  };

  render() {
    let {
      token,
      userName,
      searchtxt,
      performSearch,
      headerItems,
      expanded,
      searchResults,
    } = this.state;
    const { cartItems, wishItems } = this.props;
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
                    <Link to="/support" className="nav-link">
                      ORDER SUPPORT
                    </Link>
                  </li>
                  <li>
                    <Link to="/locator" className="nav-link">
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

          {/* Updated mid header section */}
          <div class="header-mid">
            <div class="container-fluid">
              <div class="header-mid-content">
                <Link class="logo" to="/">
                  <img src={Logo} alt="logo" className="image-logo" />
                </Link>
                <div class="mid-header-right">
                  {/* Updated Search box */}
                  <div id="searchbox" class="s-search">
                    <div class="input-group" style={{ maxWidth: "800px" }}>
                      <div
                        className="form-outline"
                        style={{ position: "relative" }}
                      >
                        <input
                          type="search"
                          id="form1"
                          className="control"
                          placeholder="Search for a Product here..."
                          style={{
                            backgroundColor: "transparent",
                            color: "white",
                            paddingRight: "2.5rem", // Add padding on the right to accommodate the icon
                          }}
                          value={this.state.searchtxt}
                          onChange={(e) => this.handleChange(e)}
                          onKeyDown={this.handleKeyDown}
                        />
                        <Link
                          to={{
                            pathname: "/SearchItem",
                            state: { value: searchtxt },
                          }}
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            position: "absolute",
                            right: "8px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            height: "100%",
                          }}
                        >
                          <FontAwesomeIcon
                            icon={faSearch}
                            style={{
                              position: "absolute",
                              top: "50%",
                              right: "10px",
                              transform: "translateY(-50%)",
                              color: "white",
                              cursor: "pointer",
                            }}
                          />
                        </Link>
                      </div>
                    </div>
                  </div>

                  <ul class="header-right-icon">
                    <li class="user">
                      {token ? (
                        <Link to="/account/view">
                          <i class="bx bx-user"></i>
                        </Link>
                      ) : (
                        <a data-target="#bd-example-modal" data-toggle="modal">
                          <i class="bx bx-user"></i>
                        </a>
                      )}
                    </li>
                    <li class="wishlist">
                      {token ? (
                        <Link to="/wishlist">
                          <i class="bx bx-heart"></i>
                        </Link>
                      ) : (
                        <a data-target="#bd-example-modal" data-toggle="modal">
                          <i class="bx bx-heart"></i>
                        </a>
                      )}
                      <span>{wishItems.length}</span>
                    </li>
                    <li class="cart">
                      {token ? (
                        <Link to="/cart">
                          <i class="bx bx-cart"></i>
                        </Link>
                      ) : (
                        <a data-target="#bd-example-modal" data-toggle="modal">
                          <i class="bx bx-cart"></i>
                        </a>
                      )}

                      <span>{cartItems.length}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="navigation-bar">
            <Navbar className="navigate" expand="lg" expanded={expanded}>
              <Container fluid>
                <Navbar.Toggle
                  aria-controls="responsive-navbar-nav"
                  onClick={this.handleToggle}
                />
                <Navbar.Collapse id="responsive-nav">
                  <Nav className="me-auto1" style={{ color: "white" }}>
                    {headerItems.map((item) => {
                      return (
                        <div className="navbar-cat">
                          <NavDropdown
                            title={item.name.toUpperCase()}
                            id="guitar-bass-dropdown"
                            className="nav-dropdown-title"
                            style={{ color: "white", left: 0 }}
                            onMouseEnter={() =>
                              this.handleMouseEnter(item.categoryId)
                            }
                            onMouseLeave={() =>
                              this.handleMouseLeave(item.categoryId)
                            }
                            show={item.showSubmenu}
                          >
                            <div className="nav-image">
                              <img src={b6} alt="product" />
                            </div>
                            <div className="submenu-class">
                              {item.subCategory.map((data) => {
                                return (
                                  <div className="submenu" key={data.id}>
                                    <NavDropdown.Item
                                      as={Link}
                                      to={`/cat/${item.categoryId}/${data.id}`}
                                      activeClassName="active"
                                      style={{ textTransform: "uppercase" }}
                                    >
                                      {data.sub_name.toUpperCase()} <br></br>
                                      <small style={{ color: "blue" }}>
                                        View All
                                      </small>
                                    </NavDropdown.Item>
                                  </div>
                                );
                              })}
                            </div>
                          </NavDropdown>
                        </div>
                      );
                    })}
                  </Nav>
                </Navbar.Collapse>
              </Container>
            </Navbar>
          </div>
        </header>
        <Login />
      </div>
    );
  }
}

export default withRouter(
  connect((state) => ({
    cartItems: state.cart.cartItems,
    wishItems: state.wish.wishItems,
  }))(Navigation)
);
