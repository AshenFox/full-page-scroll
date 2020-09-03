import React, { useRef } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { controlElPress, controlElRelease } from "../actions/mainActions";

const SliderControls = ({ main, controlElPress, controlElRelease }) => {
  const { slidesNumber, currentSlide, isControlEl, offsetX } = main;

  const track = useRef(false);

  let width;

  if (track.current) {
    let styles = window.getComputedStyle(track.current);
    width = parseInt(styles.getPropertyValue("width").replace(/px/, ""));
  }

  const start = (e) => {
    // console.log("start");
    controlElPress();
  };
  const move = (e) => {
    // console.log("move");
  };
  const end = (e) => {
    // console.log("end");
    controlElRelease();
  };

  let style = {
    left: isControlEl
      ? ""
      : `${(width / (slidesNumber - 1)) * (currentSlide - 1)}px`,
  };

  return (
    <div className='slider-controls' ref={track}>
      <div
        onMouseDown={start}
        onMouseMove={move}
        onMouseUp={end}
        onMouseOut={end}
        className='slider-controls__knob transitioned'
        style={style}
      ></div>
    </div>
  );
};

SliderControls.propTypes = {
  main: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  main: state.main,
});

export default connect(mapStateToProps, { controlElPress, controlElRelease })(
  SliderControls
);
