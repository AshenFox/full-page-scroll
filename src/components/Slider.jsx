import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import SliderControls from "./SliderControls";
import { connect } from "react-redux";
import {
  horMovablePress,
  setOffsetSlides,
  setSlide,
} from "../actions/mainActions";

const Slider = ({ main, horMovablePress, setOffsetSlides, setSlide }) => {
  const {
    offsetX,
    offsetAxis,
    isDown,
    isHorMovable,
    screenWidth,
    screenHeight,
    slidesNumber,
    isControlEl,
    currentSlide,
  } = main;

  const posX = useRef(0);

  posX.current = screenWidth * (currentSlide - 1) * -1;

  const start = (e) => {
    horMovablePress();
  };

  const move = (e) => {
    if (!isDown) return;
    if (offsetAxis === "verticle") return;
    if (isControlEl) return;

    setOffsetSlides();
  };

  const end = (e) => {
    setSlide();
  };

  const resizeHandler = (e) => {
    setSlide();
  };

  useEffect(() => {
    window.addEventListener("resize", resizeHandler);

    return () => {
      window.addEventListener("resize", resizeHandler);
    };
  }, []);

  let dimensions = {
    width: `${screenWidth * slidesNumber}px`,
    height: `${screenHeight}px`,
  };

  let style = {
    ...dimensions,
    transform:
      offsetAxis === "verticle" || isControlEl
        ? `translate3D(${posX.current}px, 0px, 0px)`
        : `translate3D(${posX.current + offsetX}px, 0px, 0px)`,
  };

  return (
    <div
      className='slider-container'
      onMouseDown={start}
      onMouseMove={move}
      onMouseUp={end}
      onTouchStart={start}
      onTouchMove={move}
      onTouchEnd={end}
      onMouseLeave={end}
    >
      <div
        className={`slider-track ${
          !isHorMovable || offsetAxis === "verticle" || isControlEl
            ? "transitioned"
            : ""
        }`}
        style={style}
      >
        <div className='slider-item slider-item__1' style={dimensions}></div>
        <div className='slider-item slider-item__2' style={dimensions}></div>
        <div className='slider-item slider-item__3' style={dimensions}></div>
        <div className='slider-item slider-item__4' style={dimensions}></div>
      </div>
      <SliderControls />
    </div>
  );
};

Slider.propTypes = {
  main: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  main: state.main,
});

export default connect(mapStateToProps, {
  horMovablePress,
  setOffsetSlides,
  setSlide,
})(Slider);
