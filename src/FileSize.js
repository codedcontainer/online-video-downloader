"use strict";
exports.__esModule = true;
var FileSize = /** @class */ (function () {
    function FileSize() {
    }
    FileSize.convertFileSize = function (fileSize) {
        //convert the number to a stirng and determine the number of characters
        //take the number of characters and subtract by 1 get number of 0's
        var fileSizeStr = fileSize.toString();
        var numZeros = fileSizeStr.length - 1;
        if (numZeros % 3 == 0) {
            var byteDef = this.byteDefArray[(numZeros / 3) - 1];
            var newValue = fileSize * byteDef[2];
            return newValue;
        }
    };
    FileSize.byteDefArray = [
        [3, "KB", 1e3],
        [6, "MB", 1e6],
        [9, "GB", 1e9]
    ];
    return FileSize;
}());
exports.FileSize = FileSize;
