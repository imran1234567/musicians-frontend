import React, { useState } from "react";

const NewsletterPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Do something with the name and email (e.g., send them to a server)
    // You can add your logic here
    console.log("Name:", name);
    console.log("Email:", email);
    togglePopup();
  };

  return (
    <div className="container">
      <div className="info-site">
        <li>
          <a href="#" onClick={togglePopup}>
            <h1 className="mb-4 mt-4 sec-title">
              {" "}
              <u> CLICK HERE FOR NEWS LETTER</u>
            </h1>
          </a>
          {isOpen && (
            <div className="popup-overlay">
              <div className="popup">
                <h2>Subscribe to Our Newsletter</h2>
                <form onSubmit={handleSubmit}>
                  <label htmlFor="name">Name:</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <br></br>
                  <br></br>
                  <div className="btn-news">
                    <button type="submit" className="cart-btn">
                      Send
                    </button>
                    <button className="cart-btn" onClick={togglePopup}>
                      Close
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </li>
      </div>
    </div>
  );
};

export default NewsletterPopup;
