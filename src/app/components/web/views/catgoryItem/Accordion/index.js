import React from "react";

class Accordion extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activedIndex: this.getID(),
      acdTransition: false,
    };
  }

  getID() {
    let expandedIndex = [];
    let children = this.props.children;

    React.Children.map(children, (items, i) => {
      if (items.props.expanded) {
        expandedIndex.push(items.props.id);
      }
    });

    return expandedIndex;
  }

  addTransition() {
    if (this.state.acdTransition === true) {
      return "acd-transition";
    } else {
      return "";
    }
  }

  handleClick(acdID) {
    let muitipleOpen = this.props.muitipleOpen;
    let activedList = [...this.state.activedIndex];
    let activedItem = this.state.activedIndex.indexOf(acdID);

    if (muitipleOpen) {
      if (activedItem !== -1) {
        activedList.splice(activedItem, 1);
        this.setState({ activedIndex: activedList });
      } else {
        this.setState({ activedIndex: [...activedList, acdID] });
      }
    } else {
      if (activedItem !== -1) {
        activedList.splice(activedItem, 1);
        this.setState({ activedIndex: activedList });
      } else {
        this.setState({ activedIndex: [acdID] });
      }
    }

    if (this.state.acdTransition === false) {
      this.setState({ acdTransition: true });
    }
  }

  isExpanded(acdID) {
    if (this.state.activedIndex.includes(acdID)) {
      return "actived";
    } else {
      return "";
    }
  }

  render() {
    let childArr = this.props.children;

    if (childArr.length === undefined) {
      childArr = [this.props.children];
    }

    const items = childArr.map((child, i) => {
      //let newIndex = i + 1;
      return React.cloneElement(child, {
        isExpanded: this.isExpanded.bind(this),
        handleClick: this.handleClick.bind(this),
        addTransition: this.addTransition.bind(this),
      });
    });

    return <div className={`accordion-box`}>{items}</div>;
  }
}
export default Accordion;
