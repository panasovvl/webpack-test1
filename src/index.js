import _ from "lodash";
import "./style.css";
import "./style2.scss";
import Inputmask from "inputmask";
import SimpleBar from "simplebar";
import 'simplebar/dist/simplebar.css';
// window.SimpleBar = require('../plugins/simplebar/simplebar.min.js');
import ResizeObserver from 'resize-observer-polyfill';
window.ResizeObserver = ResizeObserver;

function component() {
  const element = document.createElement("div");
  const btn = document.createElement('button');

  element.innerHTML = _.join(["Hello4", "webpack"], " ");
  element.classList.add("hello");

  return element;
}

document.body.appendChild(component());

const simpleBar = new SimpleBar(document.querySelector('.lorem'));
const imask = Inputmask({
    alias: "integer",
    min: 0,
    max: 100,
    allowMinus: false,
    showMaskOnHover: true,
    rightAlign: false,
    numericInput: true,
  });
imask.mask(document.querySelector('.inp'));


const myfunc = (a, b) => a+ b;
console.log(myfunc(2, 5));
