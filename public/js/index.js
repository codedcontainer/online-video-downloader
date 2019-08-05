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

var VideoDownload =
/*#__PURE__*/
function (_React$Component) {
  _inherits(VideoDownload, _React$Component);

  function VideoDownload(props) {
    var _this;

    _classCallCheck(this, VideoDownload);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(VideoDownload).call(this, props));
    _this.handleFormats = _this.handleFormats.bind(_assertThisInitialized(_this));
    _this.handleVidUrlChange = _this.handleVidUrlChange.bind(_assertThisInitialized(_this));
    _this.formSubmit = _this.formSubmit.bind(_assertThisInitialized(_this));
    _this.state = {
      vidUrl: 'https://www.youtube.com/watch?v=OMOGaugKpzs',
      formats: [{
        format: 'Select Get Availabe Formats'
      }]
    };
    return _this;
  }

  _createClass(VideoDownload, [{
    key: "handleVidUrlChange",
    value: function handleVidUrlChange(event) {
      var _this2 = this;

      this.setState(function () {
        return {
          vidUrl: _this2.state.vidUrl
        };
      });
    }
  }, {
    key: "handleFormats",
    value: function handleFormats(e) {
      var _this3 = this;

      e.preventDefault();
      fetch('/video/formats', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          vidUrl: this.state.vidUrl
        })
      }).then(function (res) {
        return res.json();
      }).then(function (json) {
        console.log(json);

        _this3.setState(function () {
          return {
            formats: json
          };
        });
      }, function (err) {
        console.log(err);
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
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement("div", null, React.createElement("h1", null, "Download Video By URL"), React.createElement("form", {
        onSubmit: this.formSubmit,
        className: "ui form"
      }, React.createElement("div", {
        className: "field"
      }, React.createElement("label", {
        htmlFor: "vidUrl"
      }, "Video URL:"), React.createElement("input", {
        type: "text",
        name: "vidUrl",
        id: "vidUrl",
        defaultValue: this.state.vidUrl,
        onChange: this.handleVidUrlChange
      })), React.createElement(VideoFormats, {
        vidUrl: this.state.vidUrl,
        handleFormats: this.handleFormats,
        formats: this.state.formats
      }), React.createElement("p", null, React.createElement("input", {
        type: "submit",
        value: "Submit",
        id: "submit",
        className: "ui button"
      }))), React.createElement(ProgressBar, null));
    }
  }]);

  return VideoDownload;
}(React.Component);

var VideoFormats =
/*#__PURE__*/
function (_React$Component2) {
  _inherits(VideoFormats, _React$Component2);

  function VideoFormats(props) {
    _classCallCheck(this, VideoFormats);

    return _possibleConstructorReturn(this, _getPrototypeOf(VideoFormats).call(this, props));
  }

  _createClass(VideoFormats, [{
    key: "render",
    value: function render() {
      return React.createElement("div", null, React.createElement("p", null, " ", React.createElement("button", {
        type: "button",
        className: "ui button",
        onClick: this.props.handleFormats
      }, "Get Available Formats")), React.createElement("label", {
        htmlFor: "vidFormat"
      }, "Video Format:"), React.createElement("select", {
        name: "vidFormat",
        className: "fluid dropdown"
      }, this.props.formats.map(function (format, index) {
        return React.createElement("option", {
          key: index,
          value: format.formatId
        }, format.format, " - ", format.filesize);
      })));
    }
  }]);

  return VideoFormats;
}(React.Component);

var ProgressBar =
/*#__PURE__*/
function (_React$Component3) {
  _inherits(ProgressBar, _React$Component3);

  function ProgressBar(props) {
    var _this4;

    _classCallCheck(this, ProgressBar);

    _this4 = _possibleConstructorReturn(this, _getPrototypeOf(ProgressBar).call(this, props));
    _this4.state = {
      progress: 0,
      active: ''
    };
    socket.on('video-progress', function (msg) {
      _this4.setState(function () {
        return {
          progress: msg,
          active: 'active'
        };
      });
    });
    socket.on('video-done', function (msg) {
      return {
        progress: 100,
        active: 'success'
      };
    });
    return _this4;
  }

  _createClass(ProgressBar, [{
    key: "render",
    value: function render() {
      return React.createElement("div", null, React.createElement("div", {
        className: "ui indicating progress ".concat(this.state.active),
        "data-percent": this.state.progress
      }, React.createElement("div", {
        className: "bar",
        style: {
          "transitionDuration": 300 + 'ms',
          width: this.state.progress + '%'
        }
      }), React.createElement("div", {
        className: "label"
      }, this.state.progress, "% Complete")));
    }
  }]);

  return ProgressBar;
}(React.Component);

function App() {
  return React.createElement("div", null, React.createElement(VideoDownload, null));
}

ReactDOM.render(React.createElement(App, null), document.getElementById('app'));
