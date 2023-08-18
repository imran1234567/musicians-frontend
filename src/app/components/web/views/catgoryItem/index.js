import React, { Component } from "react";
import { Link } from "react-router-dom";
import Accordion from "./Accordion";
import AccordionList from "./AccordianList";
import { GetCategoryDetails, GetUserLogin } from "../../../services";

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      headerData: [],
      headerItems: [],
    };
  }

  async componentDidMount() {
    let navCatgory = await GetCategoryDetails.getCategoryList();
    this.setState({ headerData: navCatgory.data }, () => {
      this.setState({
        headerItems: Object.values(
          this.state.headerData.reduce((result, item) => {
            const existingCategory = result[item.categoryId];
            if (existingCategory) {
              existingCategory.subCategory.push({
                id: item.id,
                sub_name: item.sub_name,
              });
            } else {
              result[item.categoryId] = {
                name: item.category.name,
                categoryId: item.categoryId,
                subCategory: [
                  {
                    id: item.id,
                    sub_name: item.sub_name,
                  },
                ],
              };
            }
            return result;
          }, {})
        ),
      });
    });
  }

  handleCategoryClick = () => {
    window.location.reload(); // Reload the page after clicking a category or subcategory
  };

  render() {
    return (
      <div className="col-20">
        <div className="product-listing">
          <Accordion muitipleOpen={false}>
            {this.state.headerItems.map((item, index) => {
              return (
                <AccordionList
                  expanded={true}
                  id={index}
                  key={index}
                  headTitle={item.name}
                >
                  {item.subCategory.map((data) => {
                    return (
                      <React.Fragment key={data.id}>
                        <a href={"/cat/" + item.categoryId + "/" + data.id}>
                          {data.sub_name}
                        </a>
                        <hr></hr>
                      </React.Fragment>
                    );
                  })}
                </AccordionList>
              );
            })}
          </Accordion>
        </div>
      </div>
    );
  }
}

export default List;
