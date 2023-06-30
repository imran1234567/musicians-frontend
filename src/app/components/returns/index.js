import React from "react";
import * as Yup from "yup";
import "./ReturnForm.css";

class returns extends React.Component {
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
      .positive("Quantity must be positive")
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
    this.setState({ [name]: value });
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { formErrors, ...data } = this.state;

    this.validationSchema
      .validate(data, { abortEarly: false })
      .then(() => {
        console.log("Form submitted");
        console.log("Form data:", data);

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
        });
      })
      .catch((validationErrors) => {
        const errors = {};
        validationErrors.inner.forEach((error) => {
          errors[error.path] = error.message;
        });
        this.setState({ formErrors: errors });
      });
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

    this.setState({ captchaCode: captcha });
  };

  render() {
    const { formErrors, captchaCode, verificationCode, submittedData } =
      this.state;
    const isFormValid =
      Object.values(formErrors).every((error) => !error) &&
      verificationCode === captchaCode;
    const showTryAgainMessage =
      verificationCode && verificationCode !== captchaCode;

    return (
      <div className="container">
        <div className="info-site">
          <h1 className="mb-4 mt-4 sec-title">PRODUCT RETURNS</h1>
          <h5>please complete the form below to request an RMA number</h5>
          <form onSubmit={this.handleFormSubmit}>
            <h2>ORDER INFORMATION</h2>
            <div className="table-responsive">
              <table className="form-table">
                <tbody>
                  <tr>
                    <td>
                      <div className="form-group">
                        <label>First Name</label>
                        <input
                          type="text"
                          name="firstName"
                          value={this.state.firstName}
                          onChange={this.handleInputChange}
                          className={formErrors.firstName ? "error" : ""}
                        />
                        {formErrors.firstName && (
                          <span className="error-message">
                            {formErrors.firstName}
                          </span>
                        )}
                      </div>
                    </td>
                    <td>
                      <div className="form-group">
                        <label>Last Name</label>
                        <input
                          type="text"
                          name="lastName"
                          value={this.state.lastName}
                          onChange={this.handleInputChange}
                          className={formErrors.lastName ? "error" : ""}
                        />
                        {formErrors.lastName && (
                          <span className="error-message">
                            {formErrors.lastName}
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="form-group">
                        <label>Email</label>
                        <input
                          type="email"
                          name="email"
                          value={this.state.email}
                          onChange={this.handleInputChange}
                          className={formErrors.email ? "error" : ""}
                        />
                        {formErrors.email && (
                          <span className="error-message">
                            {formErrors.email}
                          </span>
                        )}
                      </div>
                    </td>
                    <td>
                      <div className="form-group">
                        <label>Telephone</label>
                        <input
                          type="tel"
                          name="telephone"
                          value={this.state.telephone}
                          onChange={this.handleInputChange}
                          className={formErrors.telephone ? "error" : ""}
                        />
                        {formErrors.telephone && (
                          <span className="error-message">
                            {formErrors.telephone}
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="form-group">
                        <label>Order ID</label>
                        <input
                          type="text"
                          name="orderId"
                          value={this.state.orderId}
                          onChange={this.handleInputChange}
                          className={formErrors.orderId ? "error" : ""}
                        />
                        {formErrors.orderId && (
                          <span className="error-message">
                            {formErrors.orderId}
                          </span>
                        )}
                      </div>
                    </td>
                    <td>
                      <div className="form-group">
                        <label>Order Date</label>
                        <input
                          type="date"
                          name="orderDate"
                          value={this.state.orderDate}
                          onChange={this.handleInputChange}
                          className={formErrors.orderDate ? "error" : ""}
                        />
                        {formErrors.orderDate && (
                          <span className="error-message">
                            {formErrors.orderDate}
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2>PRODUCT INFORMATION & REASON FOR RETURN</h2>
            <div className="table-responsive">
              <table className="form-table">
                <tbody>
                  <tr>
                    <td>
                      <div className="form-group">
                        <label>Product Name</label>
                        <input
                          type="text"
                          name="productName"
                          value={this.state.productName}
                          onChange={this.handleInputChange}
                          className={formErrors.productName ? "error" : ""}
                        />
                        {formErrors.productName && (
                          <span className="error-message">
                            {formErrors.productName}
                          </span>
                        )}
                      </div>
                    </td>
                    <td>
                      <div className="form-group">
                        <label>Product Code</label>
                        <input
                          type="text"
                          name="productCode"
                          value={this.state.productCode}
                          onChange={this.handleInputChange}
                          className={formErrors.productCode ? "error" : ""}
                        />
                        {formErrors.productCode && (
                          <span className="error-message">
                            {formErrors.productCode}
                          </span>
                        )}
                      </div>
                    </td>
                    <td>
                      <div className="form-group">
                        <label>Quantity</label>
                        <input
                          type="number"
                          name="quantity"
                          value={this.state.quantity}
                          onChange={this.handleInputChange}
                          className={formErrors.quantity ? "error" : ""}
                        />
                        {formErrors.quantity && (
                          <span className="error-message">
                            {formErrors.quantity}
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="form-group">
                        <label>Reason for Return</label>
                        <select
                          name="reasonForReturn"
                          value={this.state.reasonForReturn}
                          onChange={this.handleInputChange}
                          className={formErrors.reasonForReturn ? "error" : ""}
                        >
                          <option value="">Select a reason</option>
                          <option value="Dead On Arrival">
                            Dead On Arrival
                          </option>
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
                    </td>
                    <td>
                      <div className="form-group">
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
                    </td>
                    <td>
                      <div className="form-group">
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
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="2" style={{ width: "300px", height: "50px" }}>
                      <div className="captcha">
                        <div className="captcha-text">
                          <span className="captcha-code">{captchaCode}</span>
                          <button
                            type="button"
                            className="captcha-refresh"
                            onClick={this.generateRandomCaptcha}
                          >
                            Refresh
                          </button>
                        </div>
                        <div className="captcha-input">
                          <label>Enter the code shown above</label>
                          <input
                            type="text"
                            name="verificationCode"
                            onChange={this.handleInputChange}
                            className={
                              formErrors.verificationCode ? "error" : ""
                            }
                          />
                          {formErrors.verificationCode && (
                            <span className="error-message">
                              {formErrors.verificationCode}
                            </span>
                          )}
                          {!formErrors.verificationCode &&
                          this.state.verificationCode &&
                          this.state.verificationCode === captchaCode ? (
                            <span className="success-message">success!</span>
                          ) : (
                            <span className="error-message">Try again!</span>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <button type="submit" className="cart-btn">
              Back
            </button>
            <button type="submit" className="cart-btn">
              Continue
            </button>
          </form>
          {submittedData && (
            <div>
              <h2>Success!</h2>
              <p>Form submitted successfully. Here are the details:</p>
              <pre>{JSON.stringify(submittedData, null, 2)}</pre>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default returns;
