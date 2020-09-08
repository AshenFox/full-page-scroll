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
} from "../actions/types";
import initialState from "./mainInitState";

export default (state = initialState, action) => {
  const { payload, type } = action;

  switch (type) {
    case SET_SCREEN_DIMENSIONS:
      return {
        ...state,
        screenHeight: payload.screenHeight,
        screenWidth: payload.screenWidth,
      };

    case PRESS:
      return {
        ...state,
        isDown: true,
      };

    case HOR_MOVABLE_PRESS:
      return {
        ...state,
        isHorMovable: true,
      };

    case CONTROL_EL_PRESS:
      return {
        ...state,
        isControlEl: true,
      };

    case RELEASE_ALL:
      return {
        ...state,
        isDown: false,
        isHorMovable: false,
        isControlEl: false,
      };

    case SET_POS:
      return {
        ...state,
        posX: payload.posX,
        posY: payload.posY,
      };

    case SET_OFFSETS:
      return {
        ...state,
        posX: payload.posX,
        posY: payload.posY,
        offsetX: payload.offsetX,
        offsetY: payload.offsetY,
      };

    case RESET:
      return {
        ...state,
        posX: 0,
        posY: 0,
        offsetX: 0,
        offsetY: 0,
        offsetSections: 0,
        offsetSlides: 0,
        offsetAxis: false,
      };

    case SET_SECTION:
      return {
        ...state,
        currentSection: payload.currentSection,
      };

    case SET_OFFSET_SECTIONS:
      return {
        ...state,
        offsetSections: payload.offsetSections,
      };

    case SET_SLIDE:
      return {
        ...state,
        currentSlide: payload.currentSlide,
      };

    case SET_OFFSET_SLIDES:
      return {
        ...state,
        offsetSlides: payload.offsetSlides,
      };

    case SET_OFFSET_AXIS:
      return {
        ...state,
        offsetAxis: payload.offsetAxis,
      };

    default:
      return state;
  }
};
