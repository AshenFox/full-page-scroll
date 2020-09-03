import {
  PRESS,
  RELEASE,
  HOR_MOVABLE_PRESS,
  HOR_MOVABLE_RELEASE,
  CONTROL_EL_PRESS,
  CONTROL_EL_RELEASE,
  SET_POS,
  SET_CONT_POS,
  SET_OFFSETS,
  RESET,
  RESET_X,
  RESET_Y,
  SET_SECTION,
  SET_OFFSET_SECTIONS,
  SET_SLIDE,
  SET_OFFSET_SLIDES,
  SET_OFFSET_AXIS,
  SET_SCREEN_DIMENSIONS,
} from "./types";
import initialState from "../reducers/mainInitState";

// set Screen dimensions

export const setScreenDimensions = () => ({
  type: SET_SCREEN_DIMENSIONS,
  payload: {
    screenHeight: document.documentElement.clientHeight,
    screenWidth: document.documentElement.clientWidth,
  },
});

// press
export const press = () => ({
  type: PRESS,
});

// release

export const release = () => ({
  type: RELEASE,
});

// hor press
export const horMovablePress = () => ({
  type: HOR_MOVABLE_PRESS,
});

// hor release

export const horMovableRelease = () => ({
  type: HOR_MOVABLE_RELEASE,
});

// contr press
export const controlElPress = () => ({
  type: CONTROL_EL_PRESS,
});

// contr release

export const controlElRelease = () => ({
  type: CONTROL_EL_RELEASE,
});

// set positions of click/touch

export const setPositions = (posX, posY) => ({
  type: SET_POS,
  payload: {
    posX,
    posY,
  },
});

// set positions of content

export const setContentPositions = (el) => {
  const { x, y } = getTransformedPosition(el);

  return {
    type: SET_CONT_POS,
    payload: {
      contPosX: x,
      contPosY: y,
    },
  };
};

// set offsets

export const setOffsets = (currentPosX, currentPosY) => (
  dispatch,
  getState
) => {
  const {
    main: { offsetX, offsetY, posX, posY, offsetAxis },
  } = getState();

  if (!offsetAxis) dispatch(setOffsetAxis(offsetX, offsetY));

  dispatch({
    type: SET_OFFSETS,
    payload: {
      posX: currentPosX,
      posY: currentPosY,
      offsetX: offsetX + currentPosX - posX,
      offsetY: offsetY + currentPosY - posY,
    },
  });
};

// set offset axis

export const setOffsetAxis = (offsetX, offsetY) => {
  let offsetAxis;

  let absOffsetX = Math.abs(offsetX);
  let absOffsetY = Math.abs(offsetY);

  let limit = 10;

  if (absOffsetX > limit || absOffsetY > limit) {
    Math.abs(offsetX) / Math.abs(offsetY) > 1
      ? (offsetAxis = "horizontal")
      : (offsetAxis = "verticle");
  } else {
    offsetAxis = false;
  }

  return {
    type: SET_OFFSET_AXIS,
    payload: {
      offsetAxis,
    },
  };
};

// set offset section

export const setOffsetSections = (value) => (dispatch, getState) => {
  let offsetSections;

  if (value !== undefined) {
    offsetSections = value;
  } else {
    offsetSections = 0;

    let {
      main: { offsetY, offsetX, screenWidth, screenHeight },
    } = getState();

    const { offsetIntY } = getOffsetInteger(
      offsetX,
      offsetY,
      screenWidth,
      screenHeight
    );

    // console.log(offsetIntY);
    offsetSections = offsetIntY;
  }

  dispatch({
    type: SET_OFFSET_SECTIONS,
    payload: {
      offsetSections,
    },
  });
};

// set offset slides

export const setOffsetSlides = (value) => (dispatch, getState) => {
  let offsetSlides;

  if (value !== undefined) {
    offsetSlides = value;
  } else {
    offsetSlides = 0;

    let {
      main: { offsetX, offsetY, screenWidth, screenHeight },
    } = getState();

    const { offsetIntX } = getOffsetInteger(
      offsetX,
      offsetY,
      screenWidth,
      screenHeight
    );
    offsetSlides = offsetIntX;
  }

  dispatch({
    type: SET_OFFSET_SLIDES,
    payload: {
      offsetSlides,
    },
  });
};

// set section

export const setSection = () => (dispatch, getState) => {
  let {
    main: { sectionsNumber, currentSection, offsetSections, screenHeight },
  } = getState();

  let newCurrentSection = currentSection + offsetSections;

  if (newCurrentSection < 1) newCurrentSection = 1;
  if (newCurrentSection > sectionsNumber) newCurrentSection = sectionsNumber;

  dispatch({
    type: SET_SECTION,
    payload: {
      currentSection: newCurrentSection,
      contPosY: screenHeight * (newCurrentSection - 1) * -1,
    },
  });
};

// set slide

export const setSlide = () => (dispatch, getState) => {
  let {
    main: { slidesNumber, currentSlide, offsetSlides, screenWidth },
  } = getState();

  let newCurrentSlide = currentSlide + offsetSlides;

  if (newCurrentSlide < 1) newCurrentSlide = 1;
  if (newCurrentSlide > slidesNumber) newCurrentSlide = slidesNumber;

  dispatch({
    type: SET_SLIDE,
    payload: {
      currentSlide: newCurrentSlide,
      sliderPosX: screenWidth * (newCurrentSlide - 1) * -1,
    },
  });
};

// reset positions and offsets

export const reset = () => ({
  type: RESET,
});

// reset positions and offsets x
export const resetX = () => ({
  type: RESET_X,
});

// reset positions and offsets y
export const resetY = () => ({
  type: RESET_Y,
});

// Suplemental functions

// Get an element's transformed position

const getTransformedPosition = (el) => {
  let matrixData = new WebKitCSSMatrix(
    window.getComputedStyle(el).webkitTransform
  );

  return {
    x: matrixData.m41,
    y: matrixData.m42,
  };
};

// get an element's transformed position
/* 
const getElementDimensions = (el) => {
  let styles = window.getComputedStyle(el);

  return {
    width: parseInt(styles.getPropertyValue("width").replace(/px/, "")),
    height: parseInt(styles.getPropertyValue("height").replace(/px/, "")),
  };
}; */

// get offset integer

const getOffsetInteger = (offsetX, offsetY, width, height) => {
  let ratioX = Math.abs(offsetX) / width;
  let ratioY = Math.abs(offsetY) / height;

  let limit = 0.15;

  let offsetIntX = 0;
  let offsetIntY = 0;

  if (ratioX > limit) offsetIntX = Math.ceil(ratioX / (1 + limit));
  if (ratioY > limit) offsetIntY = Math.ceil(ratioY / (1 + limit));

  if (offsetX > 0) offsetIntX *= -1;
  if (offsetY > 0) offsetIntY *= -1;

  return {
    offsetIntX,
    offsetIntY,
  };
};

//------------------------------------------
//------------------------------------------
//------------------------------------------
