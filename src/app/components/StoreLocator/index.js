import React from "react";

export default function StoreLocator() {
  return (
    <>
      <div className="store-location">
        <h1 className="mb-4 mt-4 sec-title">OUR STORE LOCATION</h1>

        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3312.7171290848146!2d150.95224381144715!3d-33.871180219070865!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b12bd876b6f62ff%3A0x8447dfd173be741b!2sMusicians%20Avenue!5e0!3m2!1sen!2sin!4v1688022201111!5m2!1sen!2sin"
          className="map-store"
        ></iframe>
      </div>
    </>
  );
}
