import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import Modal from "react-modal";
import { Link } from "@material-ui/core";

export default function AffiliateRegister() {
  const formik = useFormik({
    initialValues: {
      recipientName: "",
      recipientEmail: "",
      yourName: "",
      yourEmail: "",
      giftCertificateTheme: "",
      message: "",
      amount: "",
      agreedToTerms: false,
    },
    validationSchema: Yup.object({
      recipientName: Yup.string().required("Recipient's name is required"),
      recipientEmail: Yup.string()
        .email("Recipient's email is invalid")
        .required("Recipient's email is required"),
      yourName: Yup.string().required("Your name is required"),
      yourEmail: Yup.string()
        .email("Your email is invalid")
        .required("Your email is required"),
      giftCertificateTheme: Yup.string().required(
        "Please select payment method"
      ),
      message: Yup.string().required("Cheque payee name is required"),
      amount: Yup.number()
        .typeError("password is required")
        .required("password is required"),
      agreedToTerms: Yup.boolean()
        .oneOf([true], "Please agree to the terms")
        .required("Please agree to the terms"),
    }),
    onSubmit: (values) => {
      // Handle form submission logic here
      console.log("Form submitted successfully:", values);
    },
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const onSubmit = (values) => {
    openModal();
  };

  return (
    <div className="gift-page">
      <div className="container">
        <div className="info-site">
          <h1 className="mb-4 mt-4 sec-title">AFFILIATE PROGRAM</h1>
          <div className="policy-text">
            <div className="gift-coupon">
              <h6>
                To create an affiliate account, fill in the form below ensuring
                you complete all the required fields:
              </h6>
              <form onSubmit={formik.handleSubmit}>
                <div className="form-group">
                  <label>* Recipient's Name:</label>
                  <input
                    type="text"
                    name="recipientName"
                    className="form-control"
                    value={formik.values.recipientName}
                    onChange={formik.handleChange}
                  />
                  {formik.touched.recipientName &&
                    formik.errors.recipientName && (
                      <p className="error-message">
                        {formik.errors.recipientName}
                      </p>
                    )}
                </div>

                <div className="form-group">
                  <label>* Recipient's Email:</label>
                  <input
                    type="email"
                    name="recipientEmail"
                    className="form-control"
                    value={formik.values.recipientEmail}
                    onChange={formik.handleChange}
                  />
                  {formik.touched.recipientEmail &&
                    formik.errors.recipientEmail && (
                      <p className="error-message">
                        {formik.errors.recipientEmail}
                      </p>
                    )}
                </div>

                <div className="form-group">
                  <label>* Your Name:</label>
                  <input
                    type="text"
                    name="yourName"
                    className="form-control"
                    value={formik.values.yourName}
                    onChange={formik.handleChange}
                  />
                  {formik.touched.yourName && formik.errors.yourName && (
                    <p className="error-message">{formik.errors.yourName}</p>
                  )}
                </div>

                <div className="form-group">
                  <label>* Your Email:</label>
                  <input
                    type="email"
                    name="yourEmail"
                    className="form-control"
                    value={formik.values.yourEmail}
                    onChange={formik.handleChange}
                  />
                  {formik.touched.yourEmail && formik.errors.yourEmail && (
                    <p className="error-message">{formik.errors.yourEmail}</p>
                  )}
                </div>

                <div className="form-group">
                  <label>PAYMENT INFORMATION</label>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="giftCertificateTheme"
                      id="cheque"
                      value="cheque"
                      checked={formik.values.giftCertificateTheme === "cheque"}
                      onChange={formik.handleChange}
                    />
                    <label className="form-check-label" htmlFor="cheque">
                      Cheque
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="giftCertificateTheme"
                      id="paypal"
                      value="paypal"
                      checked={formik.values.giftCertificateTheme === "paypal"}
                      onChange={formik.handleChange}
                    />
                    <label className="form-check-label" htmlFor="paypal">
                      PayPal
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="giftCertificateTheme"
                      id="bank_transfer"
                      value="bank transfer"
                      checked={
                        formik.values.giftCertificateTheme === "bank transfer"
                      }
                      onChange={formik.handleChange}
                    />
                    <label className="form-check-label" htmlFor="bank_transfer">
                      Bank Transfer
                    </label>
                  </div>
                  {formik.touched.giftCertificateTheme &&
                    formik.errors.giftCertificateTheme && (
                      <p className="error-message">
                        {formik.errors.giftCertificateTheme}
                      </p>
                    )}
                </div>

                <div className="form-group">
                  <label>Cheque Payee Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="message"
                    value={formik.values.message}
                    onChange={formik.handleChange}
                  />
                  {formik.touched.message && formik.errors.message && (
                    <p className="error-message">{formik.errors.message}</p>
                  )}
                </div>

                <div className="form-group">
                  <label>*Your Password:</label>
                  <input
                    type="password"
                    name="amount"
                    className="form-control"
                    value={formik.values.amount}
                    onChange={formik.handleChange}
                  />
                  {formik.touched.amount && formik.errors.amount && (
                    <p className="error-message">{formik.errors.amount}</p>
                  )}
                </div>
                <div className="form-group">
                  <label>*Confirm Password:</label>
                  <input
                    type="password"
                    name="confirm_password"
                    className="form-control"
                    value={formik.values.confirm_password}
                    onChange={formik.handleChange}
                  />
                  {formik.touched.confirm_password &&
                    formik.errors.confirm_password && (
                      <p className="error-message">
                        {formik.errors.confirm_password}
                      </p>
                    )}
                </div>

                <div className="check-me">
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="termsCheckbox"
                      name="agreedToTerms"
                      checked={formik.values.agreedToTerms}
                      onChange={formik.handleChange}
                    />
                    <label className="form-check-label" htmlFor="termsCheckbox">
                      I have read and agree to the{" "}
                      <Link to="/about">About Us</Link>
                    </label>
                  </div>
                  {formik.touched.agreedToTerms &&
                    formik.errors.agreedToTerms && (
                      <p className="error-message">
                        {formik.errors.agreedToTerms}
                      </p>
                    )}

                  <button
                    type="submit"
                    className="fill-cart-btn"
                    onClick={onSubmit}
                    disabled={!formik.isValid} // Disable the button if the form is not valid
                  >
                    Continue
                  </button>
                </div>
              </form>
            </div>

            <div className="gift-cop">
              {/* Existing code */}
              <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Modal"
              >
                <div className="modal-div">
                  <h2 className="mb-4 mt-4 sec-title">
                    YOUR AFFILIATE ACCOUNT HAS BEEN CREATED!
                  </h2>
                  <img
                    src="https://voluum.com/blog/wp-content/uploads/sites/12/2022/02/V-Blog-Affiliate-Marketing-Ecommerce-2022-02-03.jpg"
                    alt="gift"
                    style={{ position: "center" }}
                  />
                  <p>
                    Thank you for registering for an affiliate account with
                    Musicians Avenue! You will be notified by email once your
                    account has been activated by the store owner. If you have
                    ANY questions about the operation of this affiliate system,
                    please contact the store owner.
                  </p>

                  <button onClick={closeModal} className="cart-btn">
                    Close
                  </button>
                </div>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
