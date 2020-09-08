import {
  PRESS,
  HOR_MOVABLE_PRESS,
  CONTROL_EL_PRESS,
  RELEASE_ALL,
  SET_POS,
  SET_OFFSETS,
  RESET,
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

// hor press
export const horMovablePress = () => ({
  type: HOR_MOVABLE_PRESS,
});

// contr press
export const controlElPress = () => ({
  type: CONTROL_EL_PRESS,
});

// release all

export const releaseAll = () => ({
  type: RELEASE_ALL,
});

// set positions of click/touch

export const setPositions = (posX, posY) => ({
  type: SET_POS,
  payload: {
    posX,
    posY,
  },
});

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

  let limit = 1;

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
    main: { sectionsNumber, currentSection, offsetSections },
  } = getState();

  let newCurrentSection = currentSection + offsetSections;

  if (newCurrentSection < 1) newCurrentSection = 1;
  if (newCurrentSection > sectionsNumber) newCurrentSection = sectionsNumber;

  dispatch({
    type: SET_SECTION,
    payload: {
      currentSection: newCurrentSection,
    },
  });
};

// set slide

export const setSlide = (value) => (dispatch, getState) => {
  let newCurrentSlide;

  if (value) {
    newCurrentSlide = value;
  } else {
    let {
      main: { slidesNumber, currentSlide, offsetSlides },
    } = getState();

    newCurrentSlide = currentSlide + offsetSlides;

    if (newCurrentSlide < 1) newCurrentSlide = 1;
    if (newCurrentSlide > slidesNumber) newCurrentSlide = slidesNumber;
  }

  dispatch({
    type: SET_SLIDE,
    payload: {
      currentSlide: newCurrentSlide,
    },
  });
};

// reset positions and offsets

export const reset = () => ({
  type: RESET,
});

// Suplemental functions

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
