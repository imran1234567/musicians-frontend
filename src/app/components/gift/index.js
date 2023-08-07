import React from "react";
import * as Yup from "yup";
import axios from "axios";

export default class Gift extends React.Component {
  state = {
    recipients_name: "",
    recipients_email: "",
    your_name: "",
    your_email: "",
    gift_certificate_theme: "",
    message: "",
    amount: "",
    formErrors: {},
    submittedData: null, // To store the submitted data
  };

  validationSchema = Yup.object().shape({
    recipients_name: Yup.string().required("Recipient's Name is required"),
    recipients_email: Yup.string()
      .email("Invalid Email Address")
      .required("Email is required"),
    your_name: Yup.string().required("Name is required"),
    your_email: Yup.string().required("Email is required"),
    gift_certificate_theme: Yup.string().required("Gift theme is required"),
    message: Yup.string().required("Message is required"),
    amount: Yup.string().required("Amount is required"),
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
        "http://13.233.106.34:4000/api/gift/add",
        data
      );

      this.setState({
        submittedData: data,
        recipients_name: "",
        recipients_email: "",
        your_name: "",
        your_email: "",
        gift_certificate_theme: "",
        message: "",
        amount: "",
        formErrors: {},
      });
    } catch (validationErrors) {
      const errors = {};
      validationErrors.inner.forEach((error) => {
        errors[error.path] = error.message;
      });
      this.setState({ formErrors: errors });
    }
  };

  render() {
    const { formErrors, submittedData } = this.state;
    const isFormValid = Object.values(formErrors).every((error) => !error);

    return (
      <div className="info-site">
        <div className="container">
          <h1 className="mb-4 mt-4 sec-title">PURCHASE A GIFT CERTIFICATE</h1>
          <div className="policy-text">
            <div className="gift-coupon">
              <h5>
                This gift certificate will be emailed to the recipient after
                your order has been paid for.
              </h5>

              <form onSubmit={this.handleFormSubmit}>
                <div class="form-row">
                  <div class="form-group col-md-12">
                    <label>Recipients Name</label>
                    <input
                      type="textarea"
                      name="recipients_name"
                      value={this.state.recipients_name}
                      onChange={this.handleInputChange}
                      className={formErrors.recipients_name ? "error" : ""}
                      class="form-control"
                    />
                    {formErrors.recipients_name && (
                      <span className="error-message">
                        {formErrors.recipients_name}
                      </span>
                    )}
                  </div>

                  <div class="form-group col-md-12">
                    <label>Recipients_email</label>
                    <input
                      type="email"
                      name="recipients_email"
                      value={this.state.recipients_email}
                      onChange={this.handleInputChange}
                      className={formErrors.recipients_email ? "error" : ""}
                      class="form-control"
                    />
                    {formErrors.recipients_email && (
                      <span className="error-message">
                        {formErrors.recipients_email}
                      </span>
                    )}
                  </div>

                  <div class="form-group col-md-12">
                    <label>Your Name</label>
                    <input
                      type="text"
                      name="your_name"
                      value={this.state.your_name}
                      onChange={this.handleInputChange}
                      className={formErrors.your_name ? "error" : ""}
                      class="form-control"
                    />
                    {formErrors.your_name && (
                      <span className="error-message">
                        {formErrors.your_name}
                      </span>
                    )}
                  </div>

                  <div class="form-group col-md-12">
                    <label>Your Email</label>
                    <input
                      type="email"
                      name="your_email"
                      value={this.state.your_email}
                      onChange={this.handleInputChange}
                      className={formErrors.your_email ? "error" : ""}
                      class="form-control"
                    />
                    {formErrors.your_email && (
                      <span className="error-message">
                        {formErrors.your_email}
                      </span>
                    )}
                  </div>

                  <div className="form-group col-md-12">
                    <label>Gift Certificate Theme</label>

                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="gift_certificate_theme"
                        value="birthday"
                        checked={
                          this.state.gift_certificate_theme === "birthday"
                        }
                        onChange={this.handleInputChange}
                      />
                      <label>Birthday</label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="gift_certificate_theme"
                        value="christmas"
                        checked={
                          this.state.gift_certificate_theme === "christmas"
                        }
                        onChange={this.handleInputChange}
                      />
                      <label>Christmas</label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="gift_certificate_theme"
                        value="general"
                        checked={
                          this.state.gift_certificate_theme === "general"
                        }
                        onChange={this.handleInputChange}
                      />
                      <label>General</label>
                    </div>

                    {formErrors.gift_certificate_theme && (
                      <span className="error-message">
                        {formErrors.gift_certificate_theme}
                      </span>
                    )}
                  </div>

                  <div class="form-group col-md-12">
                    <label>Message</label>
                    <textarea
                      name="message"
                      value={this.state.message}
                      onChange={this.handleInputChange}
                      className={`textarea-input ${
                        formErrors.message ? "error" : ""
                      }`}
                    />
                    {formErrors.message && (
                      <span className="error-message">
                        {formErrors.message}
                      </span>
                    )}
                  </div>

                  <div class="form-group col-md-12">
                    <label>Amount</label>
                    <input
                      type="number"
                      name="amount"
                      value={this.state.amount}
                      onChange={this.handleInputChange}
                      className={formErrors.amount ? "error" : ""}
                      class="form-control"
                    />
                    {formErrors.amount && (
                      <span className="error-message">{formErrors.amount}</span>
                    )}
                  </div>

                  <div className="col-md-12 text-right">
                    <button
                      type="submit"
                      className="fill-cart-btn"
                      disabled={!isFormValid}
                    >
                      Continue
                    </button>
                  </div>
                </div>

                {submittedData && (
                  <div>
                    <br></br>

                    <h2 style={{ color: "#750000" }}>
                      Thank you for purchasing Gift Voucher.
                    </h2>
                    <div className="return-class">
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
