import React, { Component } from "react";
import axios from 'axios';

class SearchItem extends Component {
  state = {
    searchResults: null
  };

  async componentDidMount() {
    const { value } = this.props.location.state; // Access the state value passed from the Link

    try {
      // Perform the search action here
      // You can define your search logic or call an API to fetch the search results
      const response = await axios.get(`http://13.233.106.34:4000/api/product/gcatalogsearch/result?search=${value}`);

      // Process the response and update the state or take any other necessary actions
      const searchResults = response.data.data[0].products[0];
      console.log(searchResults); // Example: Log the search results

      this.setState({ searchResults });
    } catch (error) {
      console.error('Error occurred during search:', error);
      // Handle the error condition
    }
  }

  render() {
    const { searchResults } = this.state;

    return (
      <div>
        {searchResults ? (
          <h1>Received Value: {searchResults}</h1>
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
    );
  }
}

export default SearchItem;