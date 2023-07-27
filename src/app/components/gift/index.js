import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import Modal from "react-modal";

export default function Gift() {
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
        "Please select a gift certificate theme"
      ),
      message: Yup.string().required("Message is required"),
      amount: Yup.number()
        .typeError("Amount must be a number")
        .required("Amount is required"),
      agreedToTerms: Yup.boolean()
        .oneOf([true], "Please agree to the terms")
        .required("Please agree to the terms"),
    }),
    onSubmit: (values) => {
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
          <h1 className="mb-4 mt-4 sec-title">PURCHASE A GIFT CERTIFICATE</h1>
          <div className="policy-text">
            <div className="gift-coupon">
              <h6>
                This gift certificate will be emailed to the recipient after
                your order has been paid for.
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
                  <label>* Gift Certificate Theme:</label>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="giftCertificateTheme"
                      id="birthdayTheme"
                      value="Birthday"
                      checked={
                        formik.values.giftCertificateTheme === "Birthday"
                      }
                      onChange={formik.handleChange}
                    />
                    <label className="form-check-label" htmlFor="birthdayTheme">
                      Birthday
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="giftCertificateTheme"
                      id="christmasTheme"
                      value="Christmas"
                      checked={
                        formik.values.giftCertificateTheme === "Christmas"
                      }
                      onChange={formik.handleChange}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="christmasTheme"
                    >
                      Christmas
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="giftCertificateTheme"
                      id="generalTheme"
                      value="General"
                      checked={formik.values.giftCertificateTheme === "General"}
                      onChange={formik.handleChange}
                    />
                    <label className="form-check-label" htmlFor="generalTheme">
                      General
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
                  <label>* Message:</label>
                  <textarea
                    className="form-control"
                    name="message"
                    rows="3"
                    value={formik.values.message}
                    onChange={formik.handleChange}
                  ></textarea>
                  {formik.touched.message && formik.errors.message && (
                    <p className="error-message">{formik.errors.message}</p>
                  )}
                </div>

                <div className="form-group">
                  <label>* Amount:</label>
                  <input
                    type="number"
                    name="amount"
                    className="form-control"
                    value={formik.values.amount}
                    onChange={formik.handleChange}
                  />
                  {formik.touched.amount && formik.errors.amount && (
                    <p className="error-message">{formik.errors.amount}</p>
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
                      I understand that gift certificates are non-refundable.
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
                  <h3 className="mb-4 mt-4">PURCHASE A GIFT CERTIFICATE</h3>
                  <img
                    src="https://t4.ftcdn.net/jpg/02/36/36/53/360_F_236365398_fE3DURoo5iWYfUEkhnXNnPwltpi6LY9q.jpg"
                    alt="gift"
                    style={{ position: "center" }}
                  />
                  <p>
                    Thank you for purchasing a gift certificate! Once you have
                    completed your order your gift voucher recipient will be
                    sent an email with details how to redeem their gift voucher.
                  </p>

                  <button onClick={closeModal} className="fill-cart-btn">
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
