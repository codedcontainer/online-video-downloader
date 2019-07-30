"use strict";

var videoFormats = [];
var progress;
var progressAmnt = 0;

var onSubmit = function onSubmit(e) {
  e.preventDefault();
};

var getFormats = function getFormats(e) {
  e.preventDefault();
  var vidUrl = document.getElementById('vidUrl').value;
  socket.emit('video-format', JSON.stringify({
    vidUrl: vidUrl
  }));
  fetch('/video/formats', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      vidUrl: vidUrl
    })
  }).then(function (res) {
    return res.json();
  }).then(function (json) {
    videoFormats = json;
    render();
  }, function (err) {
    console.log(err);
  });
};

var formSubmit = function formSubmit(e) {
  e.preventDefault();
  socket.emit('video-download', JSON.stringify({
    vidUrl: e.target.vidUrl.value,
    formatCode: e.target.vidFormat.value
  }));
  socket.on('video-progress', function (msg) {
    progress = {
      width: "".concat(msg, "%")
    };
    progressAmnt = msg;
    render();
  });
  socket.on('video-done', function (msg) {
    progress = {
      width: "100%"
    };
    progressAmnt = 100;
    alert(msg);
  });
};

var videoFormatFieldset = function videoFormatFieldset() {
  if (videoFormats.length > 0) {
    return React.createElement("fieldset", null, React.createElement("label", {
      htmlFor: "vidFormat"
    }, "Video Format: "), React.createElement("select", {
      name: "vidFormat"
    }, videoFormats.map(function (format, index) {
      return React.createElement("option", {
        key: index,
        value: format.formatId
      }, format.format, " - ", format.filesize);
    })));
  }
};

var render = function render() {
  var template = React.createElement("div", null, React.createElement("form", {
    onSubmit: formSubmit
  }, React.createElement("fieldset", null, React.createElement("label", {
    htmlFor: "vidUrl"
  }, "Video URL:"), React.createElement("input", {
    type: "text",
    name: "vidUrl",
    id: "vidUrl"
  }), React.createElement("button", {
    onClick: getFormats
  }, "Get Available Formats")), videoFormatFieldset(), React.createElement("input", {
    type: "submit",
    value: "Submit",
    id: "submit"
  })), React.createElement("div", {
    className: "w3-light-grey"
  }, React.createElement("div", {
    className: "w3-container w3-blue",
    style: progress
  }, progressAmnt, "%")));
  ReactDOM.render(template, document.getElementById('app'));
};

render();
