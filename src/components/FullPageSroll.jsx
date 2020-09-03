import React, { useRef, useEffect } from "react";
import Section from "./Section";
import Slider from "./Slider";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  setScreenDimensions,
  press,
  release,
  setPositions,
  setContentPositions,
  setOffsets,
  reset,
  setOffsetSections,
  setSection,
  setSlide,
} from "../actions/mainActions";

const FullPageSroll = ({
  main,
  press,
  release,
  setPositions,
  setContentPositions,
  setOffsets,
  reset,
  setOffsetSections,
  setSection,
  setScreenDimensions,
  setSlide,
}) => {
  const {
    isDown,
    contPosY,
    offsetY,
    offsetAxis,
    isHorMovable,
    screenHeight,
    screenWidth,
    sectionsNumber,
    currentSection,
  } = main;

  const optionsArr = [];

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

  const content = useRef(null);

  const isHorInteraction = offsetAxis === "horizontal" && isHorMovable;

  const start = (x, y) => {
    press();
    setContentPositions(content.current);
    setPositions(x, y);
  };

  const move = (x, y) => {
    if (!isDown) return;
    setOffsets(x, y);
    if (!isHorInteraction) setOffsetSections();
  };

  const end = (e) => {
    release();
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
    transform: isHorInteraction
      ? `translate3D(0px, ${contPosY}px, 0px)`
      : `translate3D(0px, ${contPosY + offsetY}px, 0px)`,
  };

  let obj = {
    documentHeight: document.documentElement.clientHeight,
    documentWidth: document.documentElement.clientWidth,
  };

  //e.preventDefault(); end()

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
      onMouseOut={end}
    >
      <main
        className={`content ${
          !isDown || isHorInteraction ? "transitioned" : ""
        }`}
        ref={content}
        style={style}
      >
        <Section className='section section__1'>
          <p>documentHeight: {obj.documentHeight}</p>
          <p>documentWidth: {obj.documentWidth}</p>
          <p>screenHeight {screenHeight}</p>
          <p>screenWidth {screenWidth}</p>
        </Section>
        <Section className='section section__2'>
          <p>documentHeight: {obj.documentHeight}</p>
          <p>documentWidth: {obj.documentWidth}</p>
          <p>screenHeight {screenHeight}</p>
          <p>screenWidth {screenWidth}</p>
        </Section>
        <Section className='section section__3'>
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
  release,
  setPositions,
  setContentPositions,
  setOffsets,
  reset,
  setOffsetSections,
  setSection,
  setScreenDimensions,
  setSlide,
})(FullPageSroll);
