import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Section = React.forwardRef((props, ref) => {
  const { className } = props;

  return (
    <div ref={ref} className={className}>
      {props.children}
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
