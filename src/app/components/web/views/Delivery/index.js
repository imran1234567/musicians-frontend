import React from "react";

export default function Delivery() {
  return (
    <>
      <div className="deliver">
        <h3 style={{ color: "firebrick" }}>DELIVERY INFORMATION</h3>
        <br></br>
        <h5 style={{ color: "black" }}>
          We deliver australia wide only we do not not ship overseas. Remote
          areas will incur a remote area fee depending on location and weight
          and size of the item.<br></br>
          <br></br>
          Please provide postage address (cannot send to PO Box) that will have
          someone to accept and sign for the goods during the hours of 9am-5pm,
          Monday-Friday. (If you will not be home to accept goods please provide
          alternate (work) address)<br></br>
          If the item is delivered and nobody is home, it can be collected at
          your nearest TOLL IPEC depot or an additional $24.00 surcharge can be
          paid to have the item re-delivered. Although we offer free delivery,
          remote areas will incur a nominal surcharge.<br></br>
          If you have any further questions please do not hesitate to contact us
          on (02)97559999
        </h5>
        <br></br>
        <div className="boxer">
          <h5>
            Estimated delivery dates- opens in a new window or tab include
            seller's handling time, origin postcode, destination postcode and
            time of acceptance and will depend on postage service selected and
            receipt of cleared payment- opens in a new window or tab. Delivery
            times may vary, especially during peak periods.
          </h5>
        </div>
        <h5 style={{ color: "firebrick" }}>
          For Delivery to Pickup station, postage options may vary.
        </h5>
        <br></br>
        <div className=" boxer-one">
          <br></br>
          <button className="btn-continue">
            <h5>Continue</h5>
          </button>
        </div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
      </div>
    </>
  );
}