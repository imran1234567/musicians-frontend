import React, { Component } from "react";

class Contact extends Component {
  render() {
    return (
      <div>
        <section class="contact-sec py-5">
          <div class="container-fluid">
            <h2 class="mb-4 sec-title">Contact us</h2>
            <div class="contact-content row">
              <div class="col-lg-6 col-md-6 col-12 contact-left">
                <h5>Reach Out To Us</h5>

                <ul>
                  <li>
                    <h4>Address</h4>
                    <p>Musicians Avenue 63 Ware st, Fairfield NSW 2165</p>
                  </li>
                  <li class="mail">
                    <h4>By Email</h4>
                    <p>
                      Please email us and we’ll get back to you within 24 hours
                    </p>
                    <a href="mailto:musiciansavenue@bigpond.com">
                      musiciansavenue@bigpond.com
                    </a>
                  </li>
                  <li class="phone">
                    <h4>By Phone</h4>
                    <a href="tel:(02) 9755 9999">(02) 9755 9999</a>
                  </li>
                </ul>
              </div>
              <div class="col-lg-6 col-md-6 col-12">
                <div class="contact-form">
                  <h5>Leave A Message</h5>
                  <form class="row g-3">
                    <div class="col-6">
                      <input
                        type="text"
                        class="form-control"
                        placeholder="First Name"
                      />
                    </div>
                    <div class="col-6">
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Last Name"
                      />
                    </div>
                    <div class="col-6">
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Phone"
                      />
                    </div>
                    <div class="col-6">
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Email"
                      />
                    </div>
                    <div class="col-12">
                      <textarea
                        class="form-control"
                        rows="6"
                        placeholder="Enquiry"
                      ></textarea>
                    </div>
                    <div class="submit-btn">
                      <button type="submit" class="btn btn-primary mb-3">
                        send Message
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <div className="map-location">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117839.97005470317!2d88.32219847714263!3d22.635174102036043!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a02750f0aaaf931%3A0xd393c016b906515d!2s6A%20Music%20School%20(6%20Avenue)!5e0!3m2!1sen!2sin!4v1684490136143!5m2!1sen!2sin"></iframe>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Contact;
