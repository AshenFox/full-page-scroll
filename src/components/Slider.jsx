import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import SliderControls from "./SliderControls";
import { connect } from "react-redux";
import {
  horMovablePress,
  horMovableRelease,
  setOffsetSlides,
  setSlide,
} from "../actions/mainActions";

const Slider = ({
  main,
  horMovablePress,
  horMovableRelease,
  setOffsetSlides,
  setSlide,
}) => {
  const { offsetX, sliderPosX, offsetAxis, isDown, isHorMovable } = main;

  const sliderItem = useRef(null);

  const start = (e) => {
    horMovablePress();
  };

  const move = (e) => {
    if (!isDown) return;
    if (offsetAxis === "verticle") return;
    setOffsetSlides(sliderItem.current);
  };

  const end = (e) => {
    horMovableRelease();
    setSlide(sliderItem.current);
  };

  const resizeHandler = (e) => {
    setSlide(sliderItem.current);
  };

  useEffect(() => {
    window.addEventListener("resize", resizeHandler);
    setSlide(sliderItem.current);

    return () => {
      window.addEventListener("resize", resizeHandler);
    };
  }, []);

  let style = {
    transform:
      offsetAxis === "verticle"
        ? `translate3D(${sliderPosX}px, 0px, 0px)`
        : `translate3D(${sliderPosX + offsetX}px, 0px, 0px)`,
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
    >
      <div
        className={`slider-track ${
          !isHorMovable || offsetAxis === "verticle" ? "transitioned" : ""
        }`}
        style={style}
      >
        <div className='slider-item slider-item__1' ref={sliderItem}></div>
        <div className='slider-item slider-item__2'></div>
        <div className='slider-item slider-item__3'></div>
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
  horMovableRelease,
  setOffsetSlides,
  setSlide,
})(Slider);
