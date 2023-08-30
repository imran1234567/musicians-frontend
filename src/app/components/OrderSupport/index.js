import React from "react";
import * as Yup from "yup";
import axios from "axios";

export default class OrderSupport extends React.Component {
  state = {
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    enquiry: "",
    formErrors: {},
    submittedData: null, // To store the submitted data
  };

  validationSchema = Yup.object().shape({
    firstname: Yup.string().required("First Name is required"),
    lastname: Yup.string().required("Last Name is required"),
    email: Yup.string()
      .email("Invalid Email Address")
      .required("Email is required"),
    phone: Yup.string().required("Telephone is required"),
    enquiry: Yup.string().required("Enquiry is required"),
  });

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value }); // Update the state for the corresponding input field
  };

  handleFormSubmit = async (event) => {
    event.preventDefault();
    const { formErrors, ...data } = this.state;

    try {
      await this.validationSchema.validate(data, { abortEarly: false });
      // Send the form data to the API
      const response = await axios.post(
        "http://3.25.175.163:4000/api/support/add",
        data
      );
      // Reset the form fields and display success message
      this.setState({
        submittedData: data,
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        enquiry: "",
        formErrors: {},
      });
    } catch (validationErrors) {
      if (validationErrors.inner && validationErrors.inner.forEach) {
        const errors = {};
        validationErrors.inner.forEach((error) => {
          errors[error.path] = error.message;
        });
        this.setState({ formErrors: errors });
      }
    }
  };

  render() {
    const { formErrors, submittedData } = this.state;
    const isFormValid = Object.values(formErrors).every((error) => !error);

    return (
      <div className="info-site">
        <div className="container">
          <h1 className="mb-4 mt-4 sec-title">ORDER SUPPORT</h1>
          <div className="policy-text">
            <div className="gift-coupon">
              <form onSubmit={this.handleFormSubmit}>
                <h5>Leave a Message</h5>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label>First Name</label>
                    <input
                      type="text"
                      name="firstname"
                      value={this.state.firstname}
                      onChange={this.handleInputChange}
                      className={
                        formErrors.firstname ? "error" : "form-control"
                      }
                    />
                    {formErrors.firstname && (
                      <span className="error-message">
                        {formErrors.firstname}
                      </span>
                    )}
                  </div>
                  <div className="form-group col-md-6">
                    <label>Last Name</label>
                    <input
                      type="text"
                      name="lastname"
                      value={this.state.lastname}
                      onChange={this.handleInputChange}
                      className={
                        formErrors.last_name ? "error" : "form-control"
                      }
                    />
                    {formErrors.lastname && (
                      <span className="error-message">
                        {formErrors.lastname}
                      </span>
                    )}
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      value={this.state.email}
                      onChange={this.handleInputChange}
                      className={formErrors.email ? "error" : "form-control"}
                    />
                    {formErrors.email && (
                      <span className="error-message">{formErrors.email}</span>
                    )}
                  </div>
                  <div className="form-group col-md-6">
                    <label>Telephone</label>
                    <input
                      type="number"
                      name="phone"
                      value={this.state.phone}
                      onChange={this.handleInputChange}
                      className={formErrors.phone ? "error" : "form-control"}
                    />
                    {formErrors.phone && (
                      <span className="error-message">{formErrors.phone}</span>
                    )}
                  </div>
                </div>
                <div className="form-group">
                  <label>Enquiry</label>
                  <textarea
                    name="enquiry"
                    value={this.state.enquiry}
                    onChange={this.handleInputChange}
                    className={formErrors.enquiry ? "error" : "form-control"}
                  />
                  {formErrors.enquiry && (
                    <span className="error-message">{formErrors.enquiry}</span>
                  )}
                </div>
                <div className="return-btn justify-content-center">
                  <button
                    type="submit"
                    className="fill-cart-btn"
                    disabled={!isFormValid}
                  >
                    Send Message
                  </button>
                </div>
                {submittedData && (
                  <div className="form-submit">
                    <h2 style={{ color: "#750000" }}>
                      Thank you for submitting.
                    </h2>
                    <div className="return-class">
                      <h5 style={{ color: "#750000", marginLeft: "15px" }}>
                        Your request has been sent to the relevant department
                        for processing.
                        <br /> You will be notified via e-mail .
                      </h5>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
