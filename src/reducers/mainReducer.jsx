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

    case RELEASE:
      return {
        ...state,
        isDown: false,
      };

    case HOR_MOVABLE_PRESS:
      return {
        ...state,
        isHorMovable: true,
      };

    case HOR_MOVABLE_RELEASE:
      return {
        ...state,
        isHorMovable: false,
      };

    case CONTROL_EL_PRESS:
      return {
        ...state,
        isControlEl: true,
      };

    case CONTROL_EL_RELEASE:
      return {
        ...state,
        isControlEl: false,
      };

    case SET_POS:
      return {
        ...state,
        posX: payload.posX,
        posY: payload.posY,
      };

    case SET_CONT_POS:
      return {
        ...state,
        contPosX: payload.contPosX,
        contPosY: payload.contPosY,
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

    case RESET_X:
      return {
        ...state,
        posX: 0,
        offsetX: 0,
      };

    case RESET_Y:
      return {
        ...state,
        posY: 0,
        offsetY: 0,
      };

    case SET_SECTION:
      return {
        ...state,
        currentSection: payload.currentSection,
        contPosY: payload.contPosY,
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
        sliderPosX: payload.sliderPosX,
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
