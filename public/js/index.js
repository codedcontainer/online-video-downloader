"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var VideoFormats =
/*#__PURE__*/
function (_React$Component) {
  _inherits(VideoFormats, _React$Component);

  function VideoFormats(props) {
    var _this;

    _classCallCheck(this, VideoFormats);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(VideoFormats).call(this, props));
    _this.getformats = _this.getformats.bind(_assertThisInitialized(_this));
    _this.state = {
      videoFormats: []
    };
    return _this;
  }

  _createClass(VideoFormats, [{
    key: "getformats",
    value: function getformats(e) {
      var _this2 = this;

      e.preventDefault();
      console.log('get formats button clicked');
      fetch('/video/formats', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          vidUrl: this.props.vidUrl
        })
      }).then(function (res) {
        return res.json();
      }).then(function (json) {
        _this2.setState(function () {
          return {
            videoFormats: json
          };
        });

        render();
      }, function (err) {
        console.log(err);
      });
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement("div", null, React.createElement("button", {
        type: "button",
        className: "ui button",
        onClick: this.getFormats
      }, "Get Available Formats"), React.createElement("div", {
        className: "field"
      }, React.createElement("div", {
        "class": "ui label"
      }, React.createElement("label", {
        htmlFor: "vidFormat"
      }, "Video Format:")), React.createElement("select", {
        name: "vidFormat",
        className: "ui fluid dropdown"
      }, this.state.videoFormats.map(function (format, index) {
        return React.createElement("option", {
          key: index,
          value: format.formatId
        }, format.format, " - ", format.filesize);
      }))));
    }
  }]);

  return VideoFormats;
}(React.Component);

var VideoDownload =
/*#__PURE__*/
function (_React$Component2) {
  _inherits(VideoDownload, _React$Component2);

  function VideoDownload(props) {
    var _this3;

    _classCallCheck(this, VideoDownload);

    _this3 = _possibleConstructorReturn(this, _getPrototypeOf(VideoDownload).call(this, props));
    _this3.handleVidUrlChange = _this3.handleVidUrlChange.bind(_assertThisInitialized(_this3));
    _this3.state = {
      vidUrl: 'https://www.youtube.com/watch?v=V-LvNk8g6vA',
      progress: {
        width: "0%"
      },
      progressAmnt: 0
    };
    return _this3;
  }

  _createClass(VideoDownload, [{
    key: "handleVidUrlChange",
    value: function handleVidUrlChange(event) {
      var _this4 = this;

      event.persist();
      this.setState(function () {
        return {
          vidUrl: _this4.state.vidUrl
        };
      });
    }
  }, {
    key: "formSubmit",
    value: function formSubmit(e) {
      e.preventDefault();
      socket.emit('video-download', JSON.stringify({
        vidUrl: this.state.vidUrl,
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
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement("div", null, React.createElement("form", {
        onSubmit: this.formSubmit,
        className: "ui form"
      }, React.createElement("div", {
        className: "field"
      }, React.createElement("div", {
        className: "ui label"
      }, React.createElement("label", {
        htmlFor: "vidUrl"
      }, "Video URL:")), React.createElement("div", {
        className: "ui input"
      }, React.createElement("input", {
        type: "text",
        name: "vidUrl",
        id: "vidUrl",
        defaultValue: this.state.vidUrl,
        onChange: this.handleVidUrlChange
      }))), React.createElement(VideoFormats, {
        vidUrl: this.state.vidUrl
      }), React.createElement("input", {
        type: "submit",
        className: "ui button",
        value: "Submit",
        id: "submit"
      })), React.createElement("div", {
        className: "w3-light-grey"
      }, React.createElement("div", {
        className: "w3-container w3-blue",
        style: this.state.progress
      }, this.state.progressAmnt, "%")));
    }
  }]);

  return VideoDownload;
}(React.Component);

function App() {
  return React.createElement("div", null, React.createElement(VideoDownload, null));
}

ReactDOM.render(React.createElement(App, null), document.getElementById('app'));
