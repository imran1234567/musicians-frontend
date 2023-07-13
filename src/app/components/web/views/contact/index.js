import React from "react";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

class ContactForm extends React.Component {
  handleFormSubmit = (values) => {
    const { firstName, lastName, phone, email, enquiry } = values;

    const subject = "Contact Form Submission";
    const body = `First Name: ${firstName}\nLast Name: ${lastName}\nPhone: ${phone}\nEmail: ${email}\nEnquiry: ${enquiry}`;

    const mailtoLink = `mailto:musiciansavenue@bigpond.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoLink;
  };
  render() {
    return (
      <div>
        <section class="breadcrumbs py-4">
          <div class="container-fluid">
            <div class="b-crumb pb-2">
              <ul class="breadcrumbs-list">
                <li>
                  <a href="/">Home</a>
                </li>
                <li>Contact Us</li>
              </ul>
            </div>
          </div>
        </section>
        <section className="contact-sec py-5">
          <div className="container">
            <h2 className="mb-4 sec-title">Contact us</h2>
            <div className="contact-content row">
              <div className="col-lg-6 col-md-6 col-12 contact-left">
                <h5>Reach Out To Us</h5>
                <ul>
                  <li>
                    <h4>Address</h4>
                    <p>Musicians Avenue 63 Ware st, Fairfield NSW 2165</p>
                  </li>
                  <li className="mail">
                    <h4>By Email</h4>
                    <p>
                      Please email us and we’ll get back to you within 24 hours
                    </p>
                    <a href="mailto:musiciansavenue@bigpond.com">
                      musiciansavenue@bigpond.com
                    </a>
                  </li>
                  <li className="phone">
                    <h4>By Phone</h4>
                    <a href="tel:(02) 9755 9999">(02) 9755 9999</a>
                  </li>
                </ul>
              </div>
              <div className="col-lg-6 col-md-6 col-12">
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
                    onSubmit={this.handleFormSubmit}
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
                          <button
                            type="submit"
                            className="btn btn-primary mb-3"
                          >
                            Send Message
                          </button>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
            </div>
            <div className="map-location">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3312.7171290848146!2d150.95224381144715!3d-33.871180219070865!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b12bd876b6f62ff%3A0x8447dfd173be741b!2sMusicians%20Avenue!5e0!3m2!1sen!2sin!4v1688022201111!5m2!1sen!2sin"></iframe>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default ContactForm;
