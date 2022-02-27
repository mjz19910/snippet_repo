var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Box } from "./box/mod";
var NewableFunctionBox = /** @class */ (function (_super) {
    __extends(NewableFunctionBox, _super);
    function NewableFunctionBox() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = "constructor_box";
        _this.from = "typescript";
        _this.instance_type = null;
        _this.constructor_type = "NewableFunction";
        return _this;
    }
    return NewableFunctionBox;
}(Box));
export { NewableFunctionBox };
