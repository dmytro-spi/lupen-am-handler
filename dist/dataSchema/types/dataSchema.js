"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComplexDataType = exports.ContentDataType = exports.FormatDataType = exports.SimpleDataType = void 0;
var SimpleDataType;
(function (SimpleDataType) {
    SimpleDataType["Text"] = "text";
    SimpleDataType["Number"] = "number";
    SimpleDataType["Date"] = "date";
    SimpleDataType["YesNo"] = "yesNo";
})(SimpleDataType || (exports.SimpleDataType = SimpleDataType = {}));
var FormatDataType;
(function (FormatDataType) {
    FormatDataType["Money"] = "money";
    FormatDataType["PhoneNumber"] = "phoneNumber";
    FormatDataType["Email"] = "email";
    FormatDataType["Url"] = "url";
})(FormatDataType || (exports.FormatDataType = FormatDataType = {}));
var ContentDataType;
(function (ContentDataType) {
    ContentDataType["Image"] = "image";
    ContentDataType["Video"] = "video";
    ContentDataType["Audio"] = "audio";
    ContentDataType["File"] = "file";
})(ContentDataType || (exports.ContentDataType = ContentDataType = {}));
var ComplexDataType;
(function (ComplexDataType) {
    ComplexDataType["Object"] = "object";
    ComplexDataType["Array"] = "array";
})(ComplexDataType || (exports.ComplexDataType = ComplexDataType = {}));
