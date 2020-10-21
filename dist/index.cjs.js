!(function (o) {
  "function" == typeof define && define.amd ? define(o) : o();
})(function () {
  "use strict";
  [
    function (o) {
      console.log(o, "Console");
    },
    function (o) {
      console.log(o, "Error");
    },
    function (o) {
      console.log(o, "event");
    },
    function (o) {
      console.log(o, "Promise");
    },
    function (o) {
      console.log(o, "Request");
    },
    function (o) {
      console.log(o, "Route");
    },
  ].forEach(function (o) {
    o("Context");
  });
});
