import "./style.css";
import "bootstrap/js/dist/modal.js";
import init from './init.js'
 
const state = {
    form: {
      isValid: false,
      value: "",
      errorType: ""
    },
    feeds: [],
  };

init(state)
