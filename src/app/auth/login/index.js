// import React, { Component } from "react";

// import { GetUserLogin } from "../../components/services";
// import "./login.css";
// import logo from "../../../assets/logo.png";
// import Register from "../register/register";
// import { NotificationManager } from "react-notifications";

// const emailRegex = RegExp(
//   /^[a-zA-Z0-9.!#$%&’+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/
// );

// const formValid = ({ formErrors, ...rest }) => {
//   let valid = true;

//   Object.values(formErrors).forEach((val) => {
//     val.length > 0 && (valid = false);
//   });

//   Object.values(rest).forEach((val) => {
//     val === null && (valid = false);
//   });

//   return valid;
// };

// export default class Login extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       email: null,
//       password: null,
//       formErrors: {
//         email: "",
//         password: "",
//       },
//     };
//   }

//   handleChange = (e) => {
//     e.preventDefault();
//     const { name, value } = e.target;
//     let formErrors = { ...this.state.formErrors };

//     switch (name) {
//       case "email":
//         formErrors.email = emailRegex.test(value)
//           ? ""
//           : "invalid email address";
//         break;
//       case "password":
//         formErrors.password = formErrors.password =
//           value.length < 6 ? "Invalid password" : "";
//         break;
//       default:
//         break;
//     }
//     this.setState({ formErrors, [name]: value });
//   };

//   handleSubmit = async (event) => {
//     event.preventDefault();
//     let { email, password } = this.state;
//     let data = { email: email, password: password };
//     if (formValid(this.state)) {
//       let user = await GetUserLogin.getUserLogin(data);
//       if (user) {
//         await GetUserLogin.authenticate(user.token, email);
//         NotificationManager.success("Successfully Logedin!");
//       } else {
//         console.log("Please check you login, Input Error");
//         NotificationManager.error("Please check you login, Input Error");
//       }
//     }
//   };

//   render() {
//     let { email, password, formErrors } = this.state;
//     return (
//       <div>
//         <div className="modal fade login-modal-main" id="bd-example-modal">
//           <div
//             className="modal-dialog modal-lg modal-dialog-centered"
//             role="document"
//           >
//             <div className="modal-content">
//               <div className="modal-body">
//                 <div className="login-modal">
//                   <div className="row">
//                     <div
//                       className="col-lg-6 pad-right-0"
//                       style={{
//                         backgroundColor: "#000",
//                         padding: "0px",
//                         margin: "0px",
//                       }}
//                     >
//                       <div className="login-modal-left center">
//                         <img src={logo} alt="logo" />
//                       </div>
//                     </div>
//                     <div
//                       className="col-lg-6 pad-left-0"
//                       style={{ marginTop: "15px", marginBottom: "15px" }}
//                     >
//                       <button
//                         type="button"
//                         className="close close-top-right"
//                         data-dismiss="modal"
//                         aria-label="Close"
//                       >
//                         <span aria-hidden="true">
//                           <i className="mdi mdi-close" />
//                         </span>
//                         <span className="sr-only">Close</span>
//                       </button>
//                       <form onSubmit={this.handleSubmit} noValidate>
//                         <div className="login-modal-right">
//                           {/* Tab panes */}
//                           <div className="tab-content">
//                             <div
//                               className="tab-pane active"
//                               id="login"
//                               role="tabpanel"
//                             >
//                               <h5 className="heading-design-h5">
//                                 Login to your account
//                               </h5>
//                               <fieldset className="form-group">
//                                 <label>Enter Email/Mobile number</label>
//                                 <input
//                                   type="email"
//                                   className="form-control"
//                                   name="email"
//                                   value={email}
//                                   onChange={this.handleChange}
//                                 />
//                                 {formErrors.email.length > 0 && (
//                                   <span className="errorMessage">
//                                     {formErrors.email}
//                                   </span>
//                                 )}
//                               </fieldset>
//                               <fieldset className="form-group">
//                                 <label>Enter Password</label>
//                                 <input
//                                   type="password"
//                                   className="form-control"
//                                   name="password"
//                                   value={password}
//                                   onChange={this.handleChange}
//                                 />
//                                 {formErrors.password.length > 0 && (
//                                   <span className="errorMessage">
//                                     {formErrors.password}
//                                   </span>
//                                 )}
//                               </fieldset>
//                               <fieldset className="form-group">
//                                 <button
//                                   type="submit"
//                                   className="btn btn-lg btn-secondary btn-block create-btn"
//                                   onClick={this.handleSubmit}
//                                 >
//                                   Enter to your account
//                                 </button>
//                               </fieldset>
//                               <div className="custom-control custom-checkbox">
//                                 <input
//                                   type="checkbox"
//                                   className="custom-control-input"
//                                   id="customCheck1"
//                                 />
//                                 <label
//                                   className="custom-control-label"
//                                   htmlFor="customCheck1"
//                                 >
//                                   Remember me
//                                 </label>
//                               </div>

//                               {/* updated register form in login form                     */}
//                               <div
//                                 style={{
//                                   display: "flex",
//                                   justifyContent: "center",
//                                   alignItems: "center",
//                                 }}
//                               >
//                                 <span style={{ marginRight: "5px" }}>
//                                   Don't have an account?
//                                 </span>
//                                 <a
//                                   data-toggle="tab"
//                                   href="#register"
//                                   role="tab"
//                                   style={{ marginLeft: "2px" }}
//                                 >
//                                   Sign up now
//                                 </a>
//                               </div>
//                             </div>
//                             <div
//                               className="tab-pane"
//                               id="register"
//                               role="tabpanel"
//                             >
//                               <Register />
//                             </div>
//                           </div>
//                         </div>
//                       </form>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

import React, { Component } from "react";
import { GetUserLogin } from "../../components/services";
import "./login.css";
import logo from "../../../assets/logo.png";
import Register from "../register/register";
import { NotificationManager } from "react-notifications";

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/
);

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  Object.values(formErrors).forEach((val) => {
    val.length > 0 && (valid = false);
  });

  Object.values(rest).forEach((val) => {
    val === null && (valid = false);
  });

  return valid;
};

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null,
      formErrors: {
        email: "",
        password: "",
      },
    };
  }

  handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    switch (name) {
      case "email":
        formErrors.email = emailRegex.test(value)
          ? ""
          : "invalid email address";
        break;
      case "password":
        formErrors.password = value.length < 6 ? "Invalid password" : "";
        // if (formErrors.password) {
        //   // Show notification for wrong password
        //   NotificationManager.error("Wrong password. Please try again.");
        // }
        break;
      default:
        break;
    }
    this.setState({ formErrors, [name]: value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    let { email, password } = this.state;
    let data = { email: email, password: password };
    if (formValid(this.state)) {
      let user = await GetUserLogin.getUserLogin(data);
      if (user) {
        await GetUserLogin.authenticate(user.token, email);
        NotificationManager.success("Successfully Logedin!");
      } else {
        NotificationManager.error("Please check your login Credential");
      }
    }
  };

  handleForgotPassword = (e) => {
    e.preventDefault();
    // Show a modal for password reset or redirect to a password reset page
    // Implement your desired logic here
    // For example:

    // Show a modal
    this.setState({ showForgotPasswordModal: true });

    // or

    // Redirect to a password reset page
    // You can use a router library like React Router for this
    // Example:
    // this.props.history.push('/reset-password');
  };

  render() {
    let { email, password, formErrors } = this.state;
    return (
      <div>
        <div className="modal fade login-modal-main" id="bd-example-modal">
          <div
            className="modal-dialog modal-lg modal-dialog-centered"
            role="document"
          >
            <div className="modal-content">
              <div className="modal-body">
                <div className="login-modal">
                  <div className="row login-content">
                    <div
                      className="col-lg-6 pad-right-0"
                      style={{
                        backgroundColor: "#000",
                        padding: "0px",
                        margin: "0px",
                      }}
                    >
                      <div className="login-modal-left center">
                        <img src={logo} alt="logo" />
                      </div>
                    </div>
                    <div
                      className="col-lg-6 pad-left-0"
                      style={{ marginTop: "15px", marginBottom: "15px" }}
                    >
                      <button
                        type="button"
                        className="close close-top-right"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">
                          <i className="mdi mdi-close" />
                        </span>
                        <span className="sr-only">Close</span>
                      </button>
                      <form onSubmit={this.handleSubmit} noValidate>
                        <div className="login-modal-right">
                          {/* Tab panes */}
                          <div className="tab-content">
                            <div
                              className="tab-pane active"
                              id="login"
                              role="tabpanel"
                            >
                              <h5 className="heading-design-h5">
                                Login to your account
                              </h5>
                              <fieldset className="form-group">
                                <label>Enter Email/Mobile number</label>
                                <input
                                  type="email"
                                  className="form-control"
                                  name="email"
                                  value={email}
                                  onChange={this.handleChange}
                                />
                                {formErrors.email.length > 0 && (
                                  <span className="errorMessage">
                                    {formErrors.email}
                                  </span>
                                )}
                              </fieldset>
                              <fieldset className="form-group">
                                <label>Enter Password</label>
                                <input
                                  type="password"
                                  className="form-control"
                                  name="password"
                                  value={password}
                                  onChange={this.handleChange}
                                />
                                {formErrors.password.length > 0 && (
                                  <span className="errorMessage">
                                    {formErrors.password}
                                  </span>
                                )}
                              </fieldset>
                              <fieldset className="form-group">
                                <button
                                  type="submit"
                                  className="btn btn-lg btn-secondary btn-block create-btn"
                                  onClick={this.handleSubmit}
                                >
                                  Enter to your account
                                </button>
                              </fieldset>
                              <div className="custom-control custom-checkbox">
                                <input
                                  type="checkbox"
                                  className="custom-control-input"
                                  id="customCheck1"
                                />
                                <label
                                  className="custom-control-label"
                                  htmlFor="customCheck1"
                                >
                                  Remember me
                                </label>
                              </div>

                              {/* updated register form in login form                     */}
                              <div
                                className="login-div"
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                <span style={{ marginRight: "5px" }}>
                                  Don't have an account?
                                </span>
                                <a
                                  data-toggle="tab"
                                  href="#register"
                                  role="tab"
                                  style={{
                                    marginLeft: "2px",
                                    color: "var(--primary-color)",
                                  }}
                                >
                                  Sign up now
                                </a>
                              </div>

                              <div
                                className="forgot-pass"
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                <a
                                  href="/"
                                  onClick={this.handleForgotPassword}
                                  style={{ color: "var(--primary-color)" }}
                                >
                                  Forgot Password?
                                </a>
                              </div>
                            </div>
                            <div
                              className="tab-pane"
                              id="register"
                              role="tabpanel"
                            >
                              <Register />
                            </div>
                          </div>
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
    );
  }
}
