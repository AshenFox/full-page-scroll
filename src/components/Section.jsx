import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Section = React.forwardRef(({ className, main, children }, ref) => {
  const { screenHeight, screenWidth } = main;

  let style = {
    width: `${screenWidth}px`,
    height: `${screenHeight}px`,
  };

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
});

Section.propTypes = {
  main: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  main: state.main,
});

export default connect(mapStateToProps, null, null, { forwardRef: true })(
  Section
);
