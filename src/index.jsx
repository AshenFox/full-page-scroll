import "@/styles/scss.scss";
import React from "react";
import { render } from "react-dom";

const App = () => <></>;

render(<App />, document.getElementById("app"));

let sectionsNumber = 3;

let currentSection = 1;
let scrollSections = 0;

let animationTime = 500;
let can_scroll = true;

const content = document.querySelector(".content");

let touchOffsetX = 0;
let touchOffsetY = 0;

let touchPosX = null;
let touchPosY = null;

let initPosY = 0;

const sections = document.querySelectorAll(".section");

const calculatePos = () => {
  let width = document.documentElement.clientWidth;
  let height = document.documentElement.clientHeight;

  for (let section of sections) {
    let width_i = window.getComputedStyle(section).getPropertyValue("width");
    let height_i = window.getComputedStyle(section).getPropertyValue("height");

    section.innerHTML = `clientWidth: ${width} / clientHeight: ${height} <br/> width: ${width_i} / height: ${height_i}`;
  }

  return {
    heightOffset: height * (currentSection - 1),
    widthOffset: width * 0,
    width,
    height,
  };
};

const setSectionsOffset = (position) => {
  let { heightOffset, height } = calculatePos();

  let offset = position + heightOffset;

  let offsetPercent = Math.abs(offset) / height;

  let quotient = 0.15;
  let times = 0;
  if (offsetPercent > quotient && offsetPercent < 1 + quotient) {
    times = 1;
  } else if (offsetPercent > 1 + quotient) {
    times = Math.ceil(offsetPercent / (1 + quotient));
  }

  if (offset > 0) scrollSections = -times;
  if (offset < 0) scrollSections = times;
};

let isDown = false;

// Mouse controll
// ---------------------------------------------------
// ---------------------------------------------------
// ---------------------------------------------------

window.addEventListener("mousedown", (e) => {
  isDown = true;

  touchPosX = e.screenX;
  touchPosY = e.screenY;

  initPosY = new WebKitCSSMatrix(
    window.getComputedStyle(content).webkitTransform
  ).m42;

  content.classList.remove("transitioned");
});

window.addEventListener("mousemove", (e) => {
  if (!isDown) return;

  let currentToucPosX = e.screenX;
  let currentToucPosY = e.screenY;

  touchOffsetX += currentToucPosX - touchPosX;
  touchOffsetY += currentToucPosY - touchPosY;

  touchPosX = currentToucPosX;
  touchPosY = currentToucPosY;

  let newPosition = initPosY + touchOffsetY;

  content.style.transform = `translate3D(0px, ${
    initPosY + touchOffsetY
  }px, 0px)`;

  // set sections offset

  setSectionsOffset(newPosition);
});

window.addEventListener("mouseup", (e) => {
  isDown = false;

  if (
    currentSection + scrollSections >= 1 &&
    currentSection + scrollSections <= sectionsNumber
  ) {
    currentSection += scrollSections;
  }

  scrollSections = 0;

  touchPosX = null;
  touchPosY = null;
  touchOffsetX = 0;
  touchOffsetY = 0;

  // --------------

  let { heightOffset } = calculatePos();

  content.style.transform = `translate3D(0px, ${-heightOffset}px, 0px)`;

  content.classList.add("transitioned");
});

// Mousewheel controll
// ---------------------------------------------------
// ---------------------------------------------------
// ---------------------------------------------------

window.addEventListener("mousewheel", (e) => {
  let direction = e.deltaY * 0.01;

  if (
    can_scroll &&
    currentSection + direction <= sectionsNumber &&
    currentSection + direction >= 1
  ) {
    can_scroll = false;

    currentSection += direction;
    console.log("currentSection", currentSection);

    let { heightOffset } = calculatePos();

    content.style.transform = `translate3D(0px, ${-heightOffset}px, 0px)`;

    setTimeout(() => {
      can_scroll = true;
    }, animationTime);
  }
});

// Touch controll
// ---------------------------------------------------
// ---------------------------------------------------
// ---------------------------------------------------

window.addEventListener("touchstart", (e) => {
  touchPosX = e.changedTouches[0].screenX;
  touchPosY = e.changedTouches[0].screenY;

  initPosY = new WebKitCSSMatrix(
    window.getComputedStyle(content).webkitTransform
  ).m42;

  content.classList.remove("transitioned");
});

window.addEventListener("touchmove", (e) => {
  let currentToucPosX = e.changedTouches[0].screenX;
  let currentToucPosY = e.changedTouches[0].screenY;

  touchOffsetX += currentToucPosX - touchPosX;
  touchOffsetY += currentToucPosY - touchPosY;

  touchPosX = currentToucPosX;
  touchPosY = currentToucPosY;

  let newPosition = initPosY + touchOffsetY;

  content.style.transform = `translate3D(0px, ${
    initPosY + touchOffsetY
  }px, 0px)`;

  // set sections offset

  setSectionsOffset(newPosition);
});

// console.log(calculatePos());

window.addEventListener("touchend", (e) => {
  if (
    currentSection + scrollSections >= 1 &&
    currentSection + scrollSections <= sectionsNumber
  ) {
    currentSection += scrollSections;
  }

  scrollSections = 0;

  touchPosX = null;
  touchPosY = null;
  touchOffsetX = 0;
  touchOffsetY = 0;

  content.classList.add("transitioned");

  // --------------

  let { heightOffset } = calculatePos();

  content.style.transform = `translate3D(0px, -${heightOffset}px, 0px)`;

  content.classList.add("transitioned");
});
