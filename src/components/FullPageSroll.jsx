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
  resetY,
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
  resetY,
  setScreenDimensions,
}) => {
  const { isDown, contPosY, offsetY, offsetAxis, isHorMovable } = main;

  const content = useRef(null);
  const section = useRef(null);

  const isHorInteraction = offsetAxis === "horizontal" && isHorMovable;

  const start = (x, y) => {
    press();
    setContentPositions(content.current);
    setPositions(x, y);
  };

  const move = (x, y) => {
    if (!isDown) return;
    setOffsets(x, y);
    if (!isHorInteraction) setOffsetSections(section.current);
  };

  const end = (e) => {
    release();
    setSection(section.current);
    reset();
  };

  const mouseWheelHandler = (e) => {
    let direction = e.deltaY * 0.01;
    setOffsetSections(null, direction);
    setSection(section.current);
    reset();
  };

  const resizeHandler = (e) => {
    console.log("resize!");
    setScreenDimensions();
    setSection(section.current);
  };

  useEffect(() => {
    window.addEventListener("mousewheel", mouseWheelHandler);
    window.addEventListener("resize", resizeHandler);
    setScreenDimensions();
    setSection(section.current);

    return () => {
      window.removeEventListener("mousewheel", mouseWheelHandler);
      window.addEventListener("resize", resizeHandler);
    };
  }, []);

  let style = {
    transform: isHorInteraction
      ? `translate3D(0px, ${contPosY}px, 0px)`
      : `translate3D(0px, ${contPosY + offsetY}px, 0px)`,
  };

  /* let obj = {
    documentHeight: document.documentElement.clientHeight,
    documentWidth: document.documentElement.clientWidth,
  };
  if (section.current) {
    obj = {
      ...obj,
      ...getElementDimensions(section.current),
    };
  } */

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
        className={`content ${
          !isDown || isHorInteraction ? "transitioned" : ""
        }`}
        ref={content}
        style={style}
      >
        <Section className='section section__1' ref={section}></Section>
        <Section className='section section__2'></Section>
        <Section className='section section__3'>
          <Slider />
        </Section>
      </main>
      <div className='sections-controls'>
        <div className='sections-controls__option'></div>
        <div className='sections-controls__option'></div>
        <div className='sections-controls__option'></div>
      </div>
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
  resetY,
  setScreenDimensions,
})(FullPageSroll);

const getElementDimensions = (el) => {
  let styles = window.getComputedStyle(el);

  return {
    width: parseInt(styles.getPropertyValue("width").replace(/px/, "")),
    height: parseInt(styles.getPropertyValue("height").replace(/px/, "")),
  };
};

/* 

<p>documentHeight: {obj.documentHeight}</p>
          <p>documentWidth: {obj.documentWidth}</p>
          <p>height: {obj.height}</p>
          <p>width: {obj.width}</p>*/
