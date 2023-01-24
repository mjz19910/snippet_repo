var HD;
(function (HD) {
    var _this = this;
    var _a;
    function as(e, x) {
        if (x === void 0) { x = e; }
        return x;
    }
    var TestClass = /** @class */ (function () {
        function TestClass() {
        }
        return TestClass;
    }());
    _a = TestClass;
    (function () {
        var u = as(_a);
        u.name = "BAD";
    })();
    HD.TestClass = TestClass;
})(HD || (HD = {}));
new HD.TestClass;
console.log(HD.TestClass.name);
