import React from "react";

export default class privacy_policy extends React.Component {
  render() {
    return (
      <section className="info-term">
        <div className="container">
          <div className="info-site">
            <h2>PRIVACY POLICY</h2>
            <br></br>
            <h5 style={{ color: "black" }}>
              This following document sets forth the Privacy Policy for the
              Company Name website, www.company-name.com.<br></br>
              <br></br>
              Company Name is committed to providing you with the best possible
              customer service experience. <br></br>
              Company Name is bound by the Privacy Act 1988 (Crh).<br></br>{" "}
              which sets out a number of principles concerning the privacy of
              individuals.
            </h5>
            <hr
              style={{
                background: "black",

                border: "line",
              }}
            />
            <br></br>
            <br></br>
            <div className="info-here">
              <h3>Collection of your personal information</h3>
              <br></br>
              <h6 style={{ color: "black" }}>
                {" "}
                There are many aspects of the site which can be viewed without
                providing personal information, however, for access to future
                Company Name customer support features you are required to
                submit personally identifiable information. This may include but
                not limited to a unique username and password, or provide
                sensitive information in the recovery of your lost password.
              </h6>
              <br></br>
              <h3>Sharing of your personal information</h3>
              <br></br>
              <h6 style={{ color: "black" }}>
                {" "}
                We may occasionally hire other companies to provide services on
                our behalf, including but not limited to handling customer
                support enquiries, processing transactions or customer freight
                shipping. Those companies will be permitted to obtain only the
                personal information they need to deliver the service. Company
                Name takes reasonable steps to ensure that these organisations
                are bound by confidentiality and privacy obligations in relation
                to the protection of your personal information.
              </h6>
              <br></br>
              <h3>Use of your personal information</h3>
              <br></br>
              <h6 style={{ color: "black" }}>
                For each visitor to reach the site, we expressively collect the
                following non-personally identifiable information, including but
                not limited to browser type, version and language, operating
                system, pages viewed while browsing the Site, page access times
                and referring website address. This collected information is
                used solely internally for the purpose of gauging visitor
                traffic, trends and delivering personalized content to you while
                you are at this Site. From time to time, we may use customer
                information for new, unanticipated uses not previously disclosed
                in our privacy notice. If our information practices change at
                some time in the future we will use for these new purposes only,
                data collected from the time of the policy change forward will
                adhere to our updated practices.
              </h6>
              <br></br>
              <h3>Changes to this Privacy Policy</h3>
              <br></br>
              <h6 style={{ color: "black" }}>
                Company Name reserves the right to make amendments to this
                Privacy Policy at any time. If you have objections to the
                Privacy Policy, you should not access or use the Site.
              </h6>
              <br></br>
              <h3>Accessing Your Personal Information</h3>
              <br></br>
              <h6 style={{ color: "black" }}>
                You have a right to access your personal information, subject to
                exceptions allowed by law. If you would like to do so, please
                let us know. You may be required to put your request in writing
                for security reasons. Company Name reserves the right to charge
                a fee for searching for, and providing access to, your
                information on a per request basis.
              </h6>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
