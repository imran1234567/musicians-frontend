import React, { Component } from "react";
import { GetUserLogin } from "../../../../services";
import { NotificationManager } from "react-notifications";
// import "../css/index.css";
import profile from "../../../../../../images/profile.jpg";

import "./style.css";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: "",
      user: "",
      firstName: "",
      lastName: "",
      phoneNo: "",
      email: "",
      profilePhoto: profile || null, //set the initial photo
    };
  }

  handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      this.setState({
        profilePhoto: reader.result,
      });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  handleChangeUser(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      user: {
        ...this.state.user,
        [name]: value,
      },
    });
  }
  async componentDidMount() {
    let email = sessionStorage.getItem("email");
    if (email) {
      let value = await GetUserLogin.getCustomerDetail(email);
      if (value) {
        this.setState({ user: value.data });
      }
    }
  }
  handleLogout = async (event) => {
    event.preventDefault();
    await GetUserLogin.logout();
  };
  handleSubmit = async (event) => {
    event.preventDefault();
    const { id, firstName, lastName, phone, email, gender } = this.state.user;
    const data = {
      id: id,
      firstName: firstName,
      lastName: lastName,
      phone: phone,
      email: email,
      gender: gender,
      profilePhoto: this.state.profilePhoto, //saving that uploading image into the image state
    };
    let user = await GetUserLogin.getCustomerUpdate(data);
    if (user) {
      this.setState({
        user: {
          ...this.state.user,
          profilePhoto: this.state.profilePhoto,
        },
      });
      NotificationManager.success("Successfully Update", "Profile");
    } else {
      NotificationManager.error("Please check your Field", "Input Error");
    }
  };
  render() {
    let { user, profilePhoto } = this.state;
    return (
      <div className="wrapper">
        <div className="gambo-Breadcrumb">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="/">Home</a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      My Profile
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
        <div className="dashboard-group">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="user-dt">
                  <div className="user-img">
                    <img src={profilePhoto || profile} alt="profile" />
                    <div className="img-add">
                      <input
                        type="file"
                        id="file"
                        onChange={this.handleFileChange}
                      />
                      <label htmlFor="file" onChange={this.handleFileChange}>
                        <i className="uil uil-camera-plus" />
                      </label>
                    </div>
                  </div>
                  <h1>{user.firstName}</h1>
                  <p>+977 {user.phone}</p>
                  {/* <div className="earn-points"><img src="images/Dollar.svg" alt />Points : <span>20</span></div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className>
          <div className="container">
            <div className="info-site">
              <div className="row">
                <div className="col-lg-3 col-md-3 col-12">
                  <div className="left-side-tabs">
                    <div className="dashboard-left-links">
                      <a href="/account/view" className="user-item">
                        <i className="uil uil-apps" />
                        Overview
                      </a>
                      <a href="/account/profile" className="user-item active">
                        <i className="mdi mdi-account-outline" />
                        My Profile
                      </a>
                      <a href="/account/order/list" className="user-item">
                        <i className="uil uil-box" />
                        My Orders
                      </a>
                      {/* <a href="/account/rewards" className="user-item">
                      <i className="uil uil-gift" />
                      My Rewards
                    </a> */}
                      <a href="/account/wishlist" className="user-item">
                        <i className="uil uil-heart" />
                        Shopping Wishlist
                      </a>
                      <a href="/account/address" className="user-item">
                        <i className="uil uil-location-point" />
                        My Address
                      </a>
                      <a className="user-item" onClick={this.handleLogout}>
                        <i className="uil uil-exit" />
                        Logout
                      </a>
                    </div>
                  </div>
                </div>

                <div className="col-lg-9 col-md-9 col-12 user-div">
                  <div className="dashboard-right">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="main-title-tab">
                          <h4 className="mb-4 sec-title">
                            <i className="uil uil-box" />
                            My Profile
                          </h4>
                        </div>
                      </div>
                      <div className="col-lg-12 col-md-12">
                        <div className="pdpt-bg profile-div">
                          <form className="user-form">
                            <div className="row">
                              <div className="col-sm-6">
                                <div className="form-group">
                                  <label className="control-label">
                                    First Name{" "}
                                    <span className="required">*</span>
                                  </label>
                                  <input
                                    className="form-control border-form-control"
                                    type="text"
                                    name="firstName"
                                    value={user.firstName}
                                    onChange={(e) => this.handleChangeUser(e)}
                                  />
                                </div>
                              </div>
                              <div className="col-sm-6">
                                <div className="form-group">
                                  <label className="control-label">
                                    Last Name{" "}
                                    <span className="required">*</span>
                                  </label>
                                  <input
                                    className="form-control border-form-control"
                                    type="text"
                                    name="lastName"
                                    value={user.lastName}
                                    onChange={(e) => this.handleChangeUser(e)}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-sm-6">
                                <div className="form-group">
                                  <label className="control-label">
                                    Phone <span className="required">*</span>
                                  </label>
                                  <input
                                    className="form-control border-form-control"
                                    type="number"
                                    name="phone"
                                    value={user.phone}
                                    onChange={(e) => this.handleChangeUser(e)}
                                  />
                                </div>
                              </div>
                              <div className="col-sm-6">
                                <div className="form-group">
                                  <label className="control-label">
                                    Email Address{" "}
                                    <span className="required">*</span>
                                  </label>
                                  <input
                                    className="form-control border-form-control "
                                    type="email"
                                    value={user.email}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="gender">
                              <div className="form-group col-lg-6">
                                <label>Gender</label>
                                <div className="chek-form">
                                  <div className="custome-radio form-check-inline">
                                    {user.gender === "Male" ? (
                                      <input
                                        className="form-check-input"
                                        type="radio"
                                        name="gender"
                                        id="exampleRadios1"
                                        defaultValue="Male"
                                        onChange={(e) =>
                                          this.handleChangeUser(e)
                                        }
                                        checked
                                      />
                                    ) : (
                                      <input
                                        className="form-check-input"
                                        type="radio"
                                        name="gender"
                                        id="exampleRadios1"
                                        defaultValue="Male"
                                        onChange={(e) =>
                                          this.handleChangeUser(e)
                                        }
                                      />
                                    )}
                                    <label
                                      className="form-check-label"
                                      htmlFor="exampleRadios1"
                                    >
                                      Male
                                    </label>
                                  </div>
                                  <div className="custome-radio form-check-inline">
                                    {user.gender === "Female" ? (
                                      <input
                                        className="form-check-input"
                                        type="radio"
                                        name="gender"
                                        id="exampleRadios2"
                                        defaultValue="Female"
                                        onChange={(e) =>
                                          this.handleChangeUser(e)
                                        }
                                        checked
                                      />
                                    ) : (
                                      <input
                                        className="form-check-input"
                                        type="radio"
                                        name="gender"
                                        id="exampleRadios2"
                                        defaultValue="Female"
                                        onChange={(e) =>
                                          this.handleChangeUser(e)
                                        }
                                      />
                                    )}
                                    <label
                                      className="form-check-label"
                                      htmlFor="exampleRadios2"
                                    >
                                      Female
                                    </label>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="btn-profile">
                              <button className="fill-cart-btn">Cancel</button>
                              <button
                                className="fill-cart-btn"
                                onClick={this.handleSubmit}
                              >
                                Save
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
