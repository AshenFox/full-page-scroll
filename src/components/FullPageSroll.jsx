import React, { useRef, useEffect } from "react";
import Section from "./Section";
import Slider from "./Slider";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  setScreenDimensions,
  press,
  setPositions,
  setOffsets,
  reset,
  setOffsetSections,
  setSection,
  setSlide,
  releaseAll,
} from "../actions/mainActions";

const FullPageSroll = ({
  main,
  press,
  setPositions,
  setOffsets,
  reset,
  setOffsetSections,
  setSection,
  setScreenDimensions,
  setSlide,
  releaseAll,
}) => {
  const {
    isDown,
    offsetY,
    offsetAxis,
    isHorMovable,
    screenHeight,
    screenWidth,
    sectionsNumber,
    currentSection,
    isControlEl,
  } = main;

  const optionsArr = [];

  const posY = useRef(0);

  posY.current = screenHeight * (currentSection - 1) * -1;

  const on = (e) => {
    let optionNum = parseInt(e.target.dataset.optionNum);
    setOffsetSections(optionNum - currentSection);
    setSection();
    reset();
  };

  for (let i = 1; i <= sectionsNumber; i++) {
    optionsArr.push(
      <div
        key={i}
        onClick={on}
        className={`sections-controls__option ${
          currentSection === i ? "active" : ""
        }`}
        data-option-num={i}
      ></div>
    );
  }

  const isHorStatic =
    (offsetAxis === "horizontal" && isHorMovable) || isControlEl;

  const start = (x, y) => {
    press();
    setPositions(x, y);
  };

  const move = (x, y) => {
    if (!isDown) return;
    setOffsets(x, y);
    if (!isHorStatic) setOffsetSections();
  };

  const end = (e) => {
    releaseAll();
    setSection();
    reset();
  };

  const prevent = (e) => {
    e.preventDefault();
  };

  const mouseWheelHandler = (e) => {
    let direction = e.deltaY * 0.01;
    setOffsetSections(direction);
    setSection();
    reset();
  };

  const resizeHandler = (e) => {
    setScreenDimensions();
    setSection();
  };

  useEffect(() => {
    setScreenDimensions();
    setSection();
    setSlide();

    window.addEventListener("mousewheel", mouseWheelHandler);
    window.addEventListener("resize", resizeHandler);

    document.body.addEventListener("mouseleave", end);

    document.addEventListener("dragstart", prevent);
    document.addEventListener("drag", prevent);

    return () => {
      window.removeEventListener("mousewheel", mouseWheelHandler);
      window.addEventListener("resize", resizeHandler);

      document.removeEventListener("dragstart", prevent);
      document.removeEventListener("drag", prevent);
    };
  }, []);

  let style = {
    transform: isHorStatic
      ? `translate3D(0px, ${posY.current}px, 0px)`
      : `translate3D(0px, ${posY.current + offsetY}px, 0px)`,
  };

  return (
    <div
      className='container'
      onMouseDown={(e) => {
        start(e.screenX, e.screenY);
      }}
      onMouseMove={(e) => {
        move(e.screenX, e.screenY);
      }}
      onMouseUp={end}
      onTouchStart={(e) => {
        start(e.changedTouches[0].screenX, e.changedTouches[0].screenY);
      }}
      onTouchMove={(e) => {
        move(e.changedTouches[0].screenX, e.changedTouches[0].screenY);
      }}
      onTouchEnd={end}
    >
      <main
        className={`content ${!isDown || isHorStatic ? "transitioned" : ""}`}
        style={style}
      >
        <Section number={1} />
        <Section number={2} />
        <Section number={3}>
          <Slider />
        </Section>
      </main>
      <div className='sections-controls'>{optionsArr}</div>
    </div>
  );
};

FullPageSroll.propTypes = {
  main: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  main: state.main,
});

export default connect(mapStateToProps, {
  press,
  setPositions,
  setOffsets,
  reset,
  setOffsetSections,
  setSection,
  setScreenDimensions,
  setSlide,
  releaseAll,
})(FullPageSroll);
