import React, { useState, useEffect } from "react";

export default function SiteMap() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch(
          "http://13.233.106.34:4000/api/category/sub-list"
        );
        const data = await response.json();
        setCategories(data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }

    fetchCategories();
  }, []);

  const groupSubNamesByCategory = () => {
    const groupedCategories = {};

    categories.forEach((category) => {
      if (!groupedCategories[category.category.name]) {
        groupedCategories[category.category.name] = [];
      }
      groupedCategories[category.category.name].push(category);
    });

    return groupedCategories;
  };

  const groupedSubNames = groupSubNamesByCategory();

  return (
    <div className="container">
      <div className="info-site">
        <div className="site-map">
          <h1 className="mb-4 mt-4 sec-title">SITE MAP</h1>
          <div className="row">
            <div className="col-lg-6 col-md-6 col-12">
              {Object.keys(groupedSubNames).map((categoryName) => (
                <div key={categoryName} className="site-class">
                  <h2>{categoryName}</h2>
                  <ul>
                    {groupedSubNames[categoryName].map((category) => (
                      <li key={category.id}>
                        <a href={`/cat/${category.categoryId}/${category.id}`}>
                          {category.sub_name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="col-lg-6 col-md-6 col-12">
              <h2>Others</h2>
              <ul>
                <li>
                  <a href="/special">Special Offers</a>
                </li>
                <li>
                  <a href="/account/view">My Account</a>
                </li>
                <li>
                  <a href="/account/profile">Account Information</a>
                </li>
                <li>
                  <a href="/account/address">Address Book</a>
                </li>
                <li>
                  <a href="/account/order/list">Order History</a>
                </li>
                <li>
                  <a href="/cart">Shopping Cart</a>
                </li>

                <li>
                  <a href="/about">About Us</a>
                </li>
                <li>
                  <a href="/delivery">Delivery Information</a>
                </li>
                <li>
                  <a href="/policy">Privacy Policy</a>
                </li>
                <li>
                  <a href="/terms">Terms & Conditions</a>
                </li>
                <li>
                  <a href="/contact">Contact Us</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
