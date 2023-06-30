import React from "react";

export default function Gift() {
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
              <form>
                <div className="form-group">
                  <label>* Recipient's Name:</label>
                  <input type="text" name="rn" className="form-control" />
                </div>

                <div className="form-group">
                  <label>* Recipient's Email:</label>
                  <input type="email" name="re" className="form-control" />
                </div>

                <div className="form-group">
                  <label>* Your Name:</label>
                  <input type="text" name="name" className="form-control" />
                </div>

                <div className="form-group">
                  <label>* Your Email:</label>
                  <input type="email" name="email" className="form-control" />
                </div>

                <div className="form-group">
                  <label>* Gift Certificate Theme:</label>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="exampleRadios"
                      id="exampleRadios1"
                      value="option1"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="exampleRadios1"
                    >
                      Birthday
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="exampleRadios"
                      id="exampleRadios2"
                      value="option2"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="exampleRadios2"
                    >
                      Christmas
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="exampleRadios"
                      id="exampleRadios3"
                      value="option3"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="exampleRadios3"
                    >
                      General
                    </label>
                  </div>
                </div>

                <div className="form-group">
                  <label>* Message:</label>
                  <textarea
                    className="form-control"
                    name="message"
                    rows="3"
                  ></textarea>
                </div>

                <div className="form-group">
                  <label>* Amount:</label>
                  <input type="number" name="amount" className="form-control" />
                </div>
                <div className="check-me">
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="exampleCheck1"
                    />
                    <label className="form-check-label" htmlFor="exampleCheck1">
                      I understand that gift certificates are non-refundable.
                    </label>
                  </div>

                  <button type="submit" className="cart-btn">
                    Continue
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
