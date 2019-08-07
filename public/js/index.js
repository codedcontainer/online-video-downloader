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

var VideoConvertApp =
/*#__PURE__*/
function (_React$Component) {
  _inherits(VideoConvertApp, _React$Component);

  function VideoConvertApp(props) {
    var _this;

    _classCallCheck(this, VideoConvertApp);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(VideoConvertApp).call(this, props));
    _this.handleUploadChange = _this.handleUploadChange.bind(_assertThisInitialized(_this));
    _this.state = {
      formats: ['mp4', 'avi', 'mov', 'wmv', 'webm', 'mkv'],
      videoPath: '',
      videoExt: ''
    };
    return _this;
  } // onSubmit(e){
  //     e.preventDefault(); 
  //     socket.emit('file-convert', JSON.stringify({
  //         vidPath: e.target.video.value.replace(/^C:\\fakepath\\/g, ""),
  //         vidExt: e.target.encodeFormat.value.match(/([.])\w+/g)[0].replace('.','')
  //     })); 
  // }


  _createClass(VideoConvertApp, [{
    key: "handleUploadChange",
    value: function handleUploadChange(e) {
      var filePathName = e.target.value;
      var fileBaseName = filePathName.replace(/^C:\\fakepath\\/g, "");
      var ext = fileBaseName.match(/([.])\w+/g)[0].replace('.', '');
      this.setState(function (prevState) {
        return {
          formats: prevState.formats.filter(function (format) {
            return format !== ext;
          })
        };
      });
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement("div", null, React.createElement(VideoFileUpload, {
        handleUploadChange: this.handleUploadChange,
        formats: this.state.formats,
        submit: this.onSubmit
      }));
    }
  }]);

  return VideoConvertApp;
}(React.Component);

var VideoEncoders =
/*#__PURE__*/
function (_React$Component2) {
  _inherits(VideoEncoders, _React$Component2);

  function VideoEncoders() {
    _classCallCheck(this, VideoEncoders);

    return _possibleConstructorReturn(this, _getPrototypeOf(VideoEncoders).apply(this, arguments));
  }

  _createClass(VideoEncoders, [{
    key: "render",
    value: function render() {
      return React.createElement("select", {
        name: "encodeFormat"
      }, this.props.formats.map(function (format) {
        return React.createElement("option", {
          key: format,
          value: format
        }, format);
      }));
    }
  }]);

  return VideoEncoders;
}(React.Component);

var VideoFileUpload =
/*#__PURE__*/
function (_React$Component3) {
  _inherits(VideoFileUpload, _React$Component3);

  function VideoFileUpload() {
    _classCallCheck(this, VideoFileUpload);

    return _possibleConstructorReturn(this, _getPrototypeOf(VideoFileUpload).apply(this, arguments));
  }

  _createClass(VideoFileUpload, [{
    key: "render",
    value: function render() {
      return React.createElement("form", {
        action: "/video/upload",
        encType: "multipart/form-data",
        method: "post"
      }, React.createElement("input", {
        type: "file",
        name: "video",
        accept: "video/mp4, video/ogg, video/avi, video/mov, video/wmv, video/webm, video/mkv, video/flv",
        onChange: this.props.handleUploadChange
      }), React.createElement(VideoEncoders, {
        formats: this.props.formats
      }), React.createElement("input", {
        type: "submit"
      }));
    }
  }]);

  return VideoFileUpload;
}(React.Component);

ReactDOM.render(React.createElement(VideoConvertApp, null), document.getElementById('app'));
