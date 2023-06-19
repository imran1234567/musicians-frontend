import { Component } from "react";
import React from "react";
import { Link } from "@material-ui/core";
import "./affiliate.css";
export default class Affiliate extends Component {
  render() {
    return (
      <div className="affiliate-program">
        <br></br>
        <h3 style={{ color: "firebrick" }}>AFFILIATE PROGRAM</h3>
        <h5>
          Musicians Avenue affiliate program is free and enables members to earn
          revenue by placing a link or links on their web site which advertises
          Musicians Avenue or specific products on it. Any sales made to
          customers who have clicked on those links will earn the affiliate
          commission. The standard commission rate is currently 5%. For more
          information, visit our FAQ page or see our Affiliate terms &
          conditions.
        </h5>
        <br></br>
        <div className="affiliate-div">
          <div className="affiliate-one">
            <label>
              <b>NEW AFFILIATE</b>
            </label>
            <div className="person-label">
              <h5>I am not currently an affiliate.</h5>
              <h4>
                Click Continue below to create a new affiliate account. Please
                note that this is not connected in any way to your customer
                account.
              </h4>
              <button className="btn-log">
                <Link to="/login">Continue</Link>
              </button>
              <br></br>
              <br></br>
            </div>
          </div>
          <div className="affiliate-two">
            <label>
              <b>AFFILIATE LOGIN </b>
            </label>
            <div className="person-label">
              <h5>I am a returning affiliate</h5>
              E-Mail Address:
              <input type="email" name="email" /> <br></br>
              Password:
              <input type="password" name="password" /> <br></br>
              <br></br>
              <button className="btn-log">
                <Link to="/login">LOGIN</Link>
              </button>
              <br></br>
              <br></br>
            </div>
          </div>
        </div>
        <br></br>
        <br></br>
        <br></br>
      </div>
    );
  }
}
