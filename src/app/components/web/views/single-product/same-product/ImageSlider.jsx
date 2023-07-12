import React from "react";

class ImageSlider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPhoto: 0,
    };
  }

  handlePrevious = () => {
    const { selectedPhoto } = this.state;
    const { product } = this.props;

    const newSelectedPhoto =
      (selectedPhoto - 1 + product.photos.length) % product.photos.length;

    this.setState({
      selectedPhoto: newSelectedPhoto,
    });
  };

  handleNext = () => {
    const { selectedPhoto } = this.state;
    const { product } = this.props;

    const newSelectedPhoto = (selectedPhoto + 1) % product.photos.length;

    this.setState({
      selectedPhoto: newSelectedPhoto,
    });
  };

  handlePhotoClick = (index) => {
    this.setState({
      selectedPhoto: index,
    });
  };

  render() {
    const { product } = this.props;
    const { selectedPhoto } = this.state;

    return (
      <div className="product-detail">
        <div className="photos">
          {product.photos.map((photo, index) => (
            <div
              className={`small-photo ${
                index === selectedPhoto ? "active" : ""
              }`}
              key={index}
              onClick={() => this.handlePhotoClick(index)}
            >
              <img src={photo} alt={`Product Photo ${index + 1}`} />
            </div>
          ))}
        </div>
        <div className="main-photo">
          <img
            src={product.photos[selectedPhoto]}
            alt={`Product Photo ${selectedPhoto + 1}`}
          />
        </div>
        <button onClick={this.handlePrevious}>Previous</button>
        <button onClick={this.handleNext}>Next</button>
      </div>
    );
  }
}
