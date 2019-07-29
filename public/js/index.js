"use strict";

var videoFormats = [];

var onSubmit = function onSubmit(e) {
  e.preventDefault();
};

var formSubmit = function formSubmit(e) {
  e.preventDefault(); //console.log(e.target.vidUrl.value);

  fetch('/video/formats', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      vidUrl: e.target.vidUrl.value
    })
  }).then(function (res) {
    return res.json();
  }).then(function (json) {
    return console.log(json);
  });
};

var template = React.createElement("div", null, React.createElement("form", {
  onSubmit: formSubmit
}, React.createElement("fieldset", null, React.createElement("label", {
  htmlFor: "vidUrl"
}, "Video URL:"), React.createElement("input", {
  type: "text",
  name: "vidUrl",
  id: "vidUrl"
})), React.createElement("fieldset", null, React.createElement("label", {
  htmlFor: "subUrl"
}, "Subtitle URL:"), React.createElement("input", {
  type: "text",
  name: "subUrl",
  id: "subUrl"
})), React.createElement("fieldset", null, React.createElement("label", {
  htmlFor: "vidFormat"
}, "Video Format: ")), React.createElement("fieldset", null, React.createElement("label", {
  htmlFor: "subBrun"
}, "Burn Subtitles?"), React.createElement("input", {
  type: "checkbox",
  name: "subBurn",
  id: "subBurn"
})), React.createElement("input", {
  type: "submit",
  value: "Submit",
  id: "submit"
})));
ReactDOM.render(template, document.getElementById('app'));
