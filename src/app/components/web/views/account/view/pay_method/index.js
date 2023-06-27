import React from "react";
import { Link } from "@material-ui/core";
import AccordionItem from "../AccordionItem";
import ziplogo from "./../../../../../../../images/ziplogo.svg";
import zippaylight from "./../../../../../../../images/zippaylight.svg";
import stopwatch from "./../../../../../../../images/stopwatch.svg";
import checkmark from "./../../../../../../../images/checkmark.svg";
import timecalendar from "./../../../../../../../images/timecalendar.svg";
import zipmoneylight from "./../../../../../../../images/zipmoneylight.svg";

export default function pay_method() {
  const handleSignUp = () => {
    window.location.href = "https://start.zip.co/region-select";
  };
  return (
    <>
      <div className="container">
        <div className="zip-main">
          <h1 className="sec-title">ZIP - OWN IT NOW,PAY LATER</h1>
          <div className="zip-text-logo">
            <img src={ziplogo} alt="zip1" />
            <h2>Buy Now,Pay Later</h2>
          </div>
          <div className="payment-details">
            <div className="container">
              <ul>
                <li>
                  <div className="stop-watch">
                    <img src={stopwatch} alt="stopwatch" />

                    <h5>APPLY IN MINUTES UP TO $600</h5>
                  </div>
                </li>

                <li>
                  <div className="stop-watch">
                    <img src={checkmark} alt="checkmark" />
                    <h5>PAY NOTHING TODAY</h5>
                  </div>
                </li>

                <li>
                  <div className="stop-watch">
                    <img src={timecalendar} alt="timecalendar" />
                    <h5>FLEXIBLE REPAYMENTS</h5>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="zip">
            <div className="container">
              <div className="zip-content">
                <div className="zip-pay">
                  <label>
                    <img src={zippaylight} alt="zippay" />
                  </label>
                  <br></br>
                  <br></br>
                  <h6>Up to $1,000</h6>
                  <h5>Interest free always</h5>
                  <button className="cart-btn" onClick={handleSignUp}>
                    Sign Up
                  </button>
                  <i class="fas fa-yen-sign"></i>
                  <i class="fa-solid fa-shield-halved"></i>
                  <ul className="check-list" type="arrow">
                    <li>$350–$1,000 credit limit</li>
                    <li>Interest free always</li>
                    <li>
                      $7.95 monthly account fee
                      <small>
                        {" "}
                        Waived if you pay your statement closing balance in full
                        by the due date.
                      </small>
                    </li>
                    <li>No establishment fee</li>
                    <li>Repay from $10/week</li>
                    <li>Use your account everywhere Visa is accepted^</li>
                    <li>
                      Earn exclusive cashback offers when you shop eligible
                      offers¹
                    </li>
                  </ul>
                  <div className="learn-more">
                    <Link to="/learn">Learn more</Link>
                  </div>
                </div>

                <div className="zip-pay">
                  <label>
                    <img src={zipmoneylight} alt="money" />
                  </label>
                  <br></br>
                  <br></br>
                  <h6>Up to $6,000</h6>
                  <h5>From 3 months interest free*</h5>
                  <button className="cart-btn" onClick={handleSignUp}>
                    Sign Up
                  </button>
                  <ul type="arrow" className="check-list">
                    <li>$1,000–$6,000 </li>
                    <li>credit limit</li>
                    <li>
                      3 - 12 months interest free* Up to 12 months interest free
                      terms available at select Zip partners
                    </li>
                    <li>$7.95 monthly account fee Waived if nothing owing</li>
                    <li>One-off establishment fee may apply</li>
                    <li>
                      Repay from $10/week or 3% of the outstanding balance
                      (whichever is greater)
                    </li>
                    <li>
                      We automatically split purchases over $300 into equal
                      instalments to help you avoid interest charges^
                    </li>
                  </ul>
                  <div className="learn-more">
                    <Link to="/learn">Learn more</Link>
                  </div>
                </div>
              </div>

              <div className="question">
                <div className="container">
                  <h4>Frequently Asked Question</h4>
                  <div className="accordion">
                    <AccordionItem
                      title=" Where can i shop with Zip?"
                      content=" See the full list where you can shop with Zip:
          https://zip.co/au/shop Shop everywhere online where Visa is
          accepted with Zip's single-use card feature on the Zip mobile
          app.^ Or shop anywhere instore you see Zip at checkout - we're
          partnered with 40,000+ retail stores. Additionally, you can
          use your Zip account to pay BPAY bills and buy gift cards for
          food, fuel and subscriptions."
                    />
                    <br></br>
                    <AccordionItem
                      title="How do repayments works?"
                      content="See the full list where you can shop with Zip:
          https://zip.co/au/shop Shop everywhere online where Visa is
          accepted with Zip's single-use card feature on the Zip mobile
          app.^ Or shop anywhere instore you see Zip at checkout - we're
          partnered with 40,000+ retail stores. Additionally, you can
          use your Zip account to pay BPAY bills and buy gift cards for
          food, fuel and subscriptions."
                    />
                    <br></br>
                    <AccordionItem
                      title="   What are the Fees?"
                      content="With Zip Pay a $7.95 monthly account fee
                applies, we will waive the fee if you pay your statement
                closing balance in full, by the due date. With Zip Money a
                $7.95 monthly account fee applies which is waived if you have
                nothing owing."
                    />
                    <br></br>
                    <AccordionItem
                      title="  How do refunds works?"
                      content="If you return goods to a retailer and
                they agree to a refund, your Zip account will be credited with
                the agreed refund amount. The funds will then be put towards
                your owing balance or depending on the refund amount your
                account may be placed in credit."
                    />
                    <br></br>
                    <AccordionItem
                      title=" Is Zip is a buy now,pay later like afterpay,klarna,humm and
                latitude?"
                      content="Yes! Zip allows you to shop just about everywhere,
                online and instore. We give you the flexibility to set your
                repayment schedule to suit your lifestyle - choose weekly,
                fortnightly, or monthly. You can also pay your bills, buy gift
                cards and earn rewards when you use the Zip app."
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
    </>
  );
}
