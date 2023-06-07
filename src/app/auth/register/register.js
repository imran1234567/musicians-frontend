import React, { Component } from "react";
import { NotificationManager } from "react-notifications";
import { GetUserLogin } from "../../components/services";

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/
);

const passwordRegex = RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
);

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  // validate form errors being empty
  Object.values(formErrors).forEach((val) => {
    val.length > 0 && (valid = false);
  });

  // validate the form was filled out
  Object.values(rest).forEach((val) => {
    val === null && (valid = false);
  });

  return valid;
};

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: null,
      email: null,
      password: null,
      formErrors: {
        firstName: "",
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
      case "firstName":
        formErrors.firstName =
          value.length < 3 ? "Minimum 3 characters required" : "";
        break;
      case "email":
        formErrors.email = emailRegex.test(value)
          ? ""
          : "Invalid email address";
        break;
      case "password":
        formErrors.password = !passwordRegex.test(value)
          ? "Password must has at least 8 characters that include at least 1 lowercase character, 1 uppercase characters, 1 number, and 1 special character in (!@#$%^&*)"
          : "";
        break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { firstName, email, password } = this.state;

    // Check if all required fields are filled
    if (!firstName || !email || !password) {
      NotificationManager.error(
        "Please fill in all the required fields",
        "Input Error"
      );
      return;
    }

    const data = { firstName, email, password };
    if (formValid(this.state)) {
      const list = await GetUserLogin.getUserRegister(data);
      if (list) {
        NotificationManager.success("Successfully Added New User");
        window.location.href = "/";
      }
    } else {
      NotificationManager.error(
        "Please check your registration details",
        "Input Error"
      );
    }
  };

  //   render() {
  //     const { firstName, email, password, formErrors } = this.state;
  //     return (
  //       <div>
  //         <h5 className="heading-design-h5">Register Now!</h5>
  //         <form onSubmit={this.handleSubmit}>
  //           <fieldset className="form-group">
  //             <label>First Name</label>
  //             <input
  //               type="text"
  //               className={`form-control ${formErrors.firstName.length > 0 ? 'error' : ''}`}
  //               name="firstName"
  //               placeholder="John Doe"
  //               value={firstName || ''}
  //               onChange={this.handleChange}
  //             />
  //             {formErrors.firstName.length > 0 && (
  //               <span className="errorMessage">{formErrors.firstName}</span>
  //             )}
  //           </fieldset>
  //           <fieldset className="form-group">
  //             <label>Enter Email/Mobile number</label>
  //             <input
  //               type="text"
  //               className={`form-control ${formErrors.email.length > 0 ? 'error' : ''}`}
  //               name="email"
  //               placeholder="John@Doe.com"
  //               value={email || ''}
  //               onChange={this.handleChange}
  //             />
  //             {formErrors.email.length > 0 && (
  //               <span className="errorMessage">{formErrors.email}</span>
  //             )}
  //           </fieldset>
  //           <fieldset className="form-group">
  //             <label>Enter Password</label>
  //             <input
  //               type="password"
  //               className={`form-control ${formErrors.password.length > 0 ? 'error' : ''}`}
  //               name="password"
  //               value={password || ''}
  //               onChange={this.handleChange}
  //             />
  //             {formErrors.password.length > 0 && (
  //               <span className="errorMessage">{formErrors.password}</span>
  //             )}
  //           </fieldset>
  //           <fieldset className="form-group">
  //             <button
  //               type="submit"
  //               className="btn btn-lg btn-secondary btn-block create-btn"
  //               disabled={!formValid(this.state)}
  //             >
  //               Create Your Account
  //             </button>
  //           </fieldset>
  //           <div className="custom-control custom-checkbox">
  //             <input
  //               type="checkbox"
  //               className="custom-control-input"
  //               id="customCheck2"
  //               required
  //             />
  //             <label className="custom-control-label" htmlFor="customCheck2">
  //               I Agree with <a href="#">Terms and Conditions</a>
  //             </label>
  //           </div>
  //         </form>
  //       </div>
  //     );
  //   }
  // }

  render() {
    const { firstName, email, password, formErrors } = this.state;
    return (
      <div>
        <h5 className="heading-design-h5">Register Now!</h5>
        <form onSubmit={this.handleSubmit}>
          <fieldset className="form-group">
            <label>First Name</label>
            <input
              type="text"
              className={`form-control ${
                formErrors.firstName.length > 0
                  ? "error"
                  : firstName
                  ? "success"
                  : ""
              }`}
              name="firstName"
              placeholder="John Doe"
              value={firstName || ""}
              onChange={this.handleChange}
              style={{
                borderColor:
                  formErrors.firstName.length > 0
                    ? "red"
                    : firstName
                    ? "green"
                    : "",
              }}
            />
            {formErrors.firstName.length > 0 && (
              <span className="errorMessage" style={{ color: "red" }}>
                {formErrors.firstName}
              </span>
            )}
          </fieldset>
          <fieldset className="form-group">
            <label>Enter Email/Mobile number</label>
            <input
              type="text"
              className={`form-control ${
                formErrors.email.length > 0 ? "error" : email ? "success" : ""
              }`}
              name="email"
              placeholder="John@Doe.com"
              value={email || ""}
              onChange={this.handleChange}
              style={{
                borderColor:
                  formErrors.email.length > 0 ? "red" : email ? "green" : "",
              }}
            />
            {formErrors.email.length > 0 && (
              <span className="errorMessage" style={{ color: "red" }}>
                {formErrors.email}
              </span>
            )}
          </fieldset>
          <fieldset className="form-group">
            <label>Enter Password</label>
            <input
              type="password"
              className={`form-control ${
                formErrors.password.length > 0
                  ? "error"
                  : password
                  ? "success"
                  : ""
              }`}
              name="password"
              value={password || ""}
              onChange={this.handleChange}
              style={{
                borderColor:
                  formErrors.password.length > 0
                    ? "red"
                    : password
                    ? "green"
                    : "",
              }}
            />
            {formErrors.password.length > 0 && (
              <span className="errorMessage" style={{ color: "red" }}>
                {formErrors.password}
              </span>
            )}
          </fieldset>
          <fieldset className="form-group">
            <button
              type="submit"
              className="btn btn-lg btn-secondary btn-block create-btn"
              disabled={!formValid(this.state)}
            >
              Create Your Account
            </button>
          </fieldset>
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customCheck2"
              required
            />
            <label className="custom-control-label" htmlFor="customCheck2">
              I Agree with <a href="#">Terms and Conditions</a>
            </label>
          </div>
        </form>
      </div>
    );
  }
}
