import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { colors } from "@material-ui/core";

export default function OrderSupport() {
  return (
    <>
      <div className="support-class">
        <div className="container">
          <div className="info-site">
            <h1 className="mb-4 mt-4 sec-title">Order Support </h1>
            <div className="policy-text">
              <div className="gift-coupon">
                <div className="contact-form">
                  <h5>Leave A Message</h5>
                  <Formik
                    initialValues={{
                      firstName: "",
                      lastName: "",
                      phone: "",
                      email: "",
                      enquiry: "",
                    }}
                    validationSchema={Yup.object({
                      firstName: Yup.string().required(
                        "First Name is required"
                      ),
                      lastName: Yup.string().required("Last Name is required"),
                      phone: Yup.string()
                        .required("Phone Number is required")
                        .matches(/^[0-9]{10}$/, "Invalid Phone Number"),
                      email: Yup.string()
                        .email("Invalid Email Address")
                        .required("Email is required"),
                      enquiry: Yup.string().required("Enquiry is required"),
                    })}
                    onSubmit={(values) => {
                      alert(JSON.stringify(values, null, 2));
                    }}
                  >
                    {({ handleChange, handleBlur, errors, touched }) => (
                      <Form className="row g-3">
                        <div className="col-6">
                          <Field
                            type="text"
                            className={`form-control ${
                              errors.firstName && touched.firstName
                                ? "is-invalid"
                                : ""
                            }`}
                            placeholder="First Name"
                            name="firstName"
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          <ErrorMessage
                            name="firstName"
                            component="div"
                            className="invalid-feedback"
                          />
                        </div>
                        <div className="col-6">
                          <Field
                            type="text"
                            className={`form-control ${
                              errors.lastName && touched.lastName
                                ? "is-invalid"
                                : ""
                            }`}
                            placeholder="Last Name"
                            name="lastName"
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          <ErrorMessage
                            name="lastName"
                            component="div"
                            className="invalid-feedback"
                          />
                        </div>
                        <div className="col-6">
                          <Field
                            type="text"
                            className={`form-control ${
                              errors.phone && touched.phone ? "is-invalid" : ""
                            }`}
                            placeholder="Phone"
                            name="phone"
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          <ErrorMessage
                            name="phone"
                            component="div"
                            className="invalid-feedback"
                          />
                        </div>
                        <div className="col-6">
                          <Field
                            type="text"
                            className={`form-control ${
                              errors.email && touched.email ? "is-invalid" : ""
                            }`}
                            placeholder="Email"
                            name="email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          <ErrorMessage
                            name="email"
                            component="div"
                            className="invalid-feedback"
                          />
                        </div>
                        <div className="col-12">
                          <Field
                            as="textarea"
                            className={`form-control ${
                              errors.enquiry && touched.enquiry
                                ? "is-invalid"
                                : ""
                            }`}
                            rows="6"
                            placeholder="Enquiry"
                            name="enquiry"
                            onChange={handleChange}
                            onBlur={handleBlur}
                          ></Field>
                          <ErrorMessage
                            name="enquiry"
                            component="div"
                            className="invalid-feedback"
                          />
                        </div>
                        <div className="submit-btn">
                          <button type="submit" className="fill-cart-btn">
                            Send Message
                          </button>
                        </div>
                      </Form>
                    )}
                  </Formik>
                  <br></br>
                  <small>we will Contact you soon....</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
