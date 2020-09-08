import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Section = ({ number, main, children }) => {
  const { screenHeight, screenWidth } = main;

  let style = {
    width: `${screenWidth}px`,
    height: `${screenHeight}px`,
  };

  return (
    <div className={`section section__${number}`} style={style}>
      {children}
    </div>
  );
};

Section.propTypes = {
  main: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  main: state.main,
});

export default connect(mapStateToProps)(Section);
