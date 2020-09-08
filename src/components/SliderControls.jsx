import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { controlElPress, setSlide } from "../actions/mainActions";

const SliderControls = ({ main, controlElPress, setSlide }) => {
  const { slidesNumber, currentSlide, isControlEl, offsetX, isDown } = main;

  const track = useRef(false);
  const width = useRef(0);
  const option = useRef(currentSlide);

  const calcPos = (option) => {
    return (width.current / (slidesNumber - 1)) * (option - 1);
  };

  const start = (e) => {
    option.current = currentSlide;
    controlElPress();
  };

  useEffect(() => {
    let styles = window.getComputedStyle(track.current);
    width.current = parseInt(
      styles.getPropertyValue("width").replace(/px/, "")
    );
  }, []);

  let left;

  if (isControlEl) {
    let value = calcPos(option.current) + offsetX;
    if (value < 0) value = 0;
    if (value > width.current) value = width.current;

    let fraction = width.current / (slidesNumber * 2 - 2);

    let integer = Math.ceil((value + fraction) / (fraction * 2));

    if (currentSlide !== integer) setTimeout(() => setSlide(integer), 0);

    left = `${value}px`;
  } else {
    left = `${calcPos(currentSlide)}px`;
  }
  let style = {
    left,
  };

  return (
    <div className='slider-controls' ref={track}>
      <div
        onMouseDown={start}
        onTouchStart={start}
        className={`slider-controls__knob ${
          !isControlEl || !isDown ? "transitioned" : ""
        }`}
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

export default connect(mapStateToProps, {
  controlElPress,
  setSlide,
})(SliderControls);
