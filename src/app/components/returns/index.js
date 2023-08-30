import React from "react";
import * as Yup from "yup";
import "./ReturnForm.css";
import axios from "axios";
import order from "../../../images/order.png";

export default class returns extends React.Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    telephone: "",
    orderId: "",
    orderDate: "",
    productName: "",
    productCode: "",
    quantity: "",
    reasonForReturn: "",
    productOpened: "",
    faultyDetails: "",
    verificationCode: "",
    formErrors: {},
    captchaCode: "",
    submittedData: null, // To store the submitted data
    captchaVerificationSuccess: false,
    hasTriedVerification: false,
  };

  validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string()
      .email("Invalid Email Address")
      .required("Email is required"),
    telephone: Yup.string().required("Telephone is required"),
    orderId: Yup.string().required("Order ID is required"),
    orderDate: Yup.string().required("Order Date is required"),
    productName: Yup.string().required("Product Name is required"),
    productCode: Yup.string().required("Product Code is required"),
    quantity: Yup.number()
      .typeError("Quantity must be a number")
      .min(0, "Quantity must be a non-negative value")
      .integer("Quantity must be an integer")
      .required("Quantity is required"),

    reasonForReturn: Yup.string().required("Reason for Return is required"),
    productOpened: Yup.string().required("Product Opened is required"),
    faultyDetails: Yup.string().required("Faulty or Other Details is required"),
    verificationCode: Yup.string()
      .test(
        "code-match",
        "Invalid verification code",
        (value) => value === this.state.captchaCode
      )
      .required("Verification code is required"),
  });

  componentDidMount() {
    this.generateRandomCaptcha();
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    let sanitizedValue = value; // Initialize sanitized value

    // Check if the input field is "quantity" and value is numeric and greater than 0
    if (name === "quantity") {
      const parsedValue = parseInt(value);
      if (!isNaN(parsedValue) && parsedValue >= 1) {
        sanitizedValue = parsedValue.toString();
      } else {
        sanitizedValue = ""; // Reset the value if it's invalid
      }
    }

    this.setState({ [name]: sanitizedValue, hasTriedVerification: false });
  };

  handleFormSubmit = async (event) => {
    event.preventDefault();
    const { formErrors, captchaVerificationSuccess, ...data } = this.state;

    try {
      await this.validationSchema.validate(data, { abortEarly: false });
      // Send the form data to the API
      const response = await axios.post(
        "http://3.25.175.163:4000/api/return/add",
        data
      );
      // Reset the form fields and display success message
      this.setState({
        submittedData: data,
        firstName: "",
        lastName: "",
        email: "",
        telephone: "",
        orderId: "",
        orderDate: "",
        productName: "",
        productCode: "",
        quantity: "",
        reasonForReturn: "",
        productOpened: "",
        faultyDetails: "",
        verificationCode: "",
        formErrors: {},
        captchaCode: "",
        captchaVerificationSuccess: false,
      });
    } catch (validationErrors) {
      const errors = {};
      validationErrors.inner.forEach((error) => {
        errors[error.path] = error.message;
      });
      this.setState({ formErrors: errors });
    }
  };

  generateRandomCaptcha = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let captcha = "";
    const length = 6; // Set the desired length of the CAPTCHA code

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      captcha += characters[randomIndex];
    }

    this.setState({ captchaCode: captcha, captchaVerificationSuccess: false });
  };

  render() {
    const {
      formErrors,
      captchaCode,
      verificationCode,
      submittedData,
      captchaVerificationSuccess,
      hasTriedVerification,
    } = this.state;
    const isFormValid =
      Object.values(formErrors).every((error) => !error) &&
      verificationCode === captchaCode;
    const hasEnteredCaptchaCode =
      verificationCode && verificationCode !== captchaCode;

    return (
      <div className="info-site">
        <div className="container">
          <h1 className="mb-4 mt-4 sec-title">PRODUCT RETURNS</h1>
          <div className="return-page">
            <div className="gift-coupon">
              <h5>please complete the form below to request an RMA number</h5>

              <form onSubmit={this.handleFormSubmit}>
                <h2>ORDER INFORMATION</h2>
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label>First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={this.state.firstName}
                      onChange={this.handleInputChange}
                      className={formErrors.firstName ? "error" : ""}
                      class="form-control"
                    />
                    {formErrors.firstName && (
                      <span className="error-message">
                        {formErrors.firstName}
                      </span>
                    )}
                  </div>

                  <div class="form-group col-md-6">
                    <label>Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={this.state.lastName}
                      onChange={this.handleInputChange}
                      className={formErrors.lastName ? "error" : ""}
                      class="form-control"
                    />
                    {formErrors.lastName && (
                      <span className="error-message">
                        {formErrors.lastName}
                      </span>
                    )}
                  </div>

                  <div class="form-group col-md-6">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      value={this.state.email}
                      onChange={this.handleInputChange}
                      className={formErrors.email ? "error" : ""}
                      class="form-control"
                    />
                    {formErrors.email && (
                      <span className="error-message">{formErrors.email}</span>
                    )}
                  </div>

                  <div class="form-group col-md-6">
                    <label>Telephone</label>
                    <input
                      type="tel"
                      name="telephone"
                      value={this.state.telephone}
                      onChange={this.handleInputChange}
                      className={formErrors.telephone ? "error" : ""}
                      class="form-control"
                    />
                    {formErrors.telephone && (
                      <span className="error-message">
                        {formErrors.telephone}
                      </span>
                    )}
                  </div>

                  <div class="form-group col-md-6">
                    <label>Order ID</label>
                    <input
                      type="text"
                      name="orderId"
                      value={this.state.orderId}
                      onChange={this.handleInputChange}
                      className={formErrors.orderId ? "error" : ""}
                      class="form-control"
                    />
                    {formErrors.orderId && (
                      <span className="error-message">
                        {formErrors.orderId}
                      </span>
                    )}
                  </div>

                  <div class="form-group col-md-6">
                    <label>Order Date</label>
                    <input
                      type="date"
                      name="orderDate"
                      value={this.state.orderDate}
                      onChange={this.handleInputChange}
                      className={formErrors.orderDate ? "error" : ""}
                      class="form-control"
                    />
                    {formErrors.orderDate && (
                      <span className="error-message">
                        {formErrors.orderDate}
                      </span>
                    )}
                  </div>
                </div>

                <h2>PRODUCT INFORMATION & REASON FOR RETURN</h2>

                <div class="form-row">
                  <div class="form-group col-md-4">
                    <label>Product Name</label>
                    <input
                      type="text"
                      name="productName"
                      value={this.state.productName}
                      onChange={this.handleInputChange}
                      className={formErrors.productName ? "error" : ""}
                      class="form-control"
                    />
                    {formErrors.productName && (
                      <span className="error-message">
                        {formErrors.productName}
                      </span>
                    )}
                  </div>

                  <div class="form-group col-md-4">
                    <label>Product Code</label>
                    <input
                      type="text"
                      name="productCode"
                      value={this.state.productCode}
                      onChange={this.handleInputChange}
                      className={formErrors.productCode ? "error" : ""}
                      class="form-control"
                    />
                    {formErrors.productCode && (
                      <span className="error-message">
                        {formErrors.productCode}
                      </span>
                    )}
                  </div>

                  <div class="form-group col-md-4">
                    <label>Quantity</label>
                    <input
                      type="number"
                      name="quantity"
                      value={this.state.quantity}
                      onChange={this.handleInputChange}
                      className={formErrors.quantity ? "error" : ""}
                      class="form-control"
                    />
                    {formErrors.quantity && (
                      <span className="error-message">
                        {formErrors.quantity}
                      </span>
                    )}
                  </div>

                  <div class="form-group col-md-6">
                    <label>Reason for Return</label>
                    <select
                      name="reasonForReturn"
                      value={this.state.reasonForReturn}
                      onChange={this.handleInputChange}
                      className={formErrors.reasonForReturn ? "error" : ""}
                    >
                      <option value="">Select a reason</option>
                      <option value="Dead On Arrival">Dead On Arrival</option>
                      <option value="Faulty">Faulty</option>
                      <option value="Please supply details">
                        Please supply details
                      </option>
                      <option value="Order Error">Order Error</option>
                      <option value="Received Wrong Item">
                        Received Wrong Item
                      </option>
                      <option value="Other">Other</option>
                    </select>
                    {formErrors.reasonForReturn && (
                      <span className="error-message">
                        {formErrors.reasonForReturn}
                      </span>
                    )}
                  </div>

                  <div class="form-group col-md-6">
                    <label>Product is opened</label>
                    <div className="radio-container">
                      <div>
                        <input
                          type="radio"
                          name="productOpened"
                          value="yes"
                          checked={this.state.productOpened === "yes"}
                          onChange={this.handleInputChange}
                        />
                      </div>
                      <div>
                        <label>Yes</label>
                      </div>
                      <div>
                        <input
                          type="radio"
                          name="productOpened"
                          value="no"
                          checked={this.state.productOpened === "no"}
                          onChange={this.handleInputChange}
                        />
                      </div>
                      <div>
                        <label>No</label>
                      </div>
                    </div>
                    {formErrors.productOpened && (
                      <span className="error-message">
                        {formErrors.productOpened}
                      </span>
                    )}
                  </div>

                  <div class="form-group col-md-12">
                    <label>Faulty or Other Details</label>
                    <textarea
                      name="faultyDetails"
                      value={this.state.faultyDetails}
                      onChange={this.handleInputChange}
                      className={`textarea-input ${
                        formErrors.faultyDetails ? "error" : ""
                      }`}
                    />
                    {formErrors.faultyDetails && (
                      <span className="error-message">
                        {formErrors.faultyDetails}
                      </span>
                    )}
                  </div>

                  <div className="form-group col-lg-6 col-md-12">
                    <label>Enter the code shown above</label>
                    <div className="capcha-section">
                      <div className="captcha-input">
                        <input
                          type="text"
                          name="verificationCode"
                          onChange={this.handleInputChange}
                          value={this.state.verificationCode}
                          className={`form-control ${
                            formErrors.verificationCode ||
                            (hasTriedVerification &&
                              !captchaVerificationSuccess)
                              ? "error"
                              : ""
                          }`}
                          onKeyPress={(event) => {
                            if (event.key === "Enter") {
                              event.preventDefault();
                              // Check if the verification code matches the captcha code
                              const isSuccess =
                                this.state.verificationCode === captchaCode;
                              this.setState({
                                captchaVerificationSuccess: isSuccess,
                                hasTriedVerification: true,
                              });
                            }
                          }}
                          onBlur={() => {
                            // Mark that user has tried verification when the input field loses focus
                            this.setState({ hasTriedVerification: true });
                          }}
                        />

                        {formErrors.verificationCode && (
                          <span className="error-message">
                            {formErrors.verificationCode}
                          </span>
                        )}
                        {hasTriedVerification &&
                          !captchaVerificationSuccess && (
                            <span className="error-message">Try again!</span>
                          )}
                        {captchaVerificationSuccess && (
                          <span className="success-message">Success!</span>
                        )}
                      </div>
                      <div className="captcha">
                        <span className="captcha-code">{captchaCode}</span>
                        <button
                          type="button"
                          className="captcha-refresh"
                          onClick={this.generateRandomCaptcha}
                        >
                          Refresh
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="return-btn">
                  <a className="fill-cart-btn" href="/">
                    Back
                  </a>
                  <button type="submit" className="fill-cart-btn">
                    Continue
                  </button>
                </div>

                {submittedData && (
                  <div>
                    <br></br>
                    {/* <h2>Success!</h2> */}
                    <h2 style={{ color: "#750000" }}>
                      Thank you for submitting your return request.
                    </h2>
                    <div className="return-class">
                      <img
                        src={order}
                        alt="orderReturn"
                        style={{ width: "100px", height: "100px" }}
                      />
                      {/* <pre>{JSON.stringify(submittedData, null, 2)}</pre> */}
                      <h5 style={{ color: "#750000", marginLeft: "15px" }}>
                        Your request has been sent to the relevant department
                        for processing.
                        <br></br> You will be notified via e-mail as to the
                        status of your request.
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
