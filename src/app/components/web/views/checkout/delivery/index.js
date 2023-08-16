import React, { Component } from "react";
import { GetLocationDetails } from "../../../../services";
import { NotificationManager } from "react-notifications";

export default class Deliverydetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locationList: [],
      name: "",
      phone: "",
      district: "",
      city: "",
      area: "",
      states: "",
      address: "",
      errors: {},
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  async componentDidMount() {
    let location = await GetLocationDetails.getLocationListDetails();
    if (location) {
      this.setState({ locationList: location.data });
    } else {
      NotificationManager.error("Data is empty", "Data");
    }
  }

  validateForm = () => {
    const { name, phone, district, city, area, states, address } = this.state;
    const errors = {};

    if (!name) {
      errors.name = "Full name is required";
    }
    if (!phone) {
      errors.phone = "Phone number is required";
    }
    if (!states) {
      errors.states = "State is required";
    }
    if (!district) {
      errors.district = "District is required";
    }
    if (!city) {
      errors.city = "City is required";
    }
    if (!area) {
      errors.area = "Area is required";
    }
    if (!address) {
      errors.address = "Shipping address is required";
    }

    this.setState({ errors });
    return Object.keys(errors).length === 0;
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.validateForm()) {
      const { name, phone, district, city, area, states, address } = this.state;
      let delivery = {
        name: name,
        phone: phone,
        district: district,
        city: city,
        area: area,
        states: states,
        address: address,
      };
      this.props.onSelectDeliveryAddress(delivery);
    }
  };

  render() {
    const {
      name,
      phone,
      district,
      city,
      area,
      states,
      address,
      locationList,
      errors,
    } = this.state;

    let option = locationList.map((data, i) => (
      <option value={data.id} key={data.id}>
        {data.name}
      </option>
    ));
    return (
      <div className="card-body">
        <form>
          <div className="row">
            <div className="col-sm-6">
              <div className="form-group">
                <label className="control-label">
                  Full Name <span className="required">*</span>
                </label>
                <input
                  className="form-control border-form-control"
                  type="text"
                  name="name"
                  value={name}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="col-sm-6">
              <div className="form-group">
                <label className="control-label">
                  Phone <span className="required">*</span>
                </label>
                <input
                  type="number"
                  className="form-control border-form-control"
                  name="phone"
                  value={phone}
                  onChange={this.handleChange}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-6">
              <div className="form-group">
                <label className="control-label">
                  State <span className="required">*</span>
                </label>
                <input
                  type="text"
                  className="form-control border-form-control"
                  name="states"
                  value={states}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="col-sm-6">
              <div className="form-group">
                <label className="control-label">
                  District <span className="required">*</span>
                </label>
                <input
                  type="text"
                  className="form-control border-form-control"
                  name="district"
                  value={district}
                  onChange={this.handleChange}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-6">
              <div className="form-group">
                <label className="control-label">
                  City <span className="required">*</span>
                </label>
                <input
                  type="text"
                  className="form-control border-form-control"
                  name="city"
                  value={city}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="col-sm-6">
              <div className="form-group">
                <label className="control-label">
                  Area <span className="required">*</span>
                </label>
                <input
                  className="form-control border-form-control"
                  type="text"
                  name="area"
                  value={area}
                  onChange={this.handleChange}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <div className="form-group">
                <label className="control-label">
                  Shipping Address <span className="required">*</span>
                </label>
                <textarea
                  className={`form-control border-form-control ${
                    errors.address ? "is-invalid" : ""
                  }`}
                  name="address"
                  value={address}
                  onChange={this.handleChange}
                />
                {errors.address && (
                  <div className="invalid-feedback">{errors.address}</div>
                )}
              </div>
            </div>
            <div className="col-sm-12">
              <button
                type="button"
                data-toggle="collapse"
                data-target="#collapseThree"
                aria-expanded="false"
                aria-controls="collapseThree"
                className="btn btn-secondary mb-2 btn-lg"
                onClick={this.handleSubmit}
                disabled={Object.keys(errors).length > 0}
              >
                NEXT
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
