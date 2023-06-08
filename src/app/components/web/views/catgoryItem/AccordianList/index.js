import React from "react";

class AccordionList extends React.Component {
  render() {
    return (
      <div
        className={`accordion-list ${this.props.isExpanded(
          this.props.id
        )} ${this.props.addTransition()}`}
      >
        <div
          className={`accordion-label`}
          onClick={() => {
            this.props.handleClick(this.props.id);
          }}
        >
          {this.props.headTitle} <span className="acd-arrow"></span>
        </div>
        <div className={`accordion-content`}>
          <div className="accordion-inner">{this.props.children}</div>
        </div>
      </div>
    );
  }
}
export default AccordionList;
