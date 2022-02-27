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
import { Box } from "./mod";
var CSSStyleSheetInitBox = /** @class */ (function (_super) {
    __extends(CSSStyleSheetInitBox, _super);
    function CSSStyleSheetInitBox() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = "shape_box";
        _this.shape = "CSSStyleSheetInit";
        return _this;
    }
    CSSStyleSheetInitBox.prototype.set_property = function (key, value) {
        if (key === 'baseURL') {
            if (typeof value == 'string') {
                this.value[key] = value;
            }
            else if (typeof value === 'undefined') {
                this.value[key] = value;
            }
            else {
                throw new Error("Invalid value for key " + key);
            }
        }
        else if (key === 'disabled') {
            if (typeof value === 'boolean') {
                this.value[key] = value;
            }
            else if (typeof value === 'undefined') {
                this.value[key] = value;
            }
            else {
                throw new Error("Invalid value for key " + key);
            }
        }
        else if (key === 'media') {
            if (typeof value === 'object' && value.instance_type === 'MediaList') {
                this.value[key] = value.value;
            }
            else if (typeof value === 'string') {
                this.value[key] = value;
            }
            else if (typeof value === 'undefined') {
                this.value[key] = value;
            }
            else {
                throw new Error("Invalid value for key " + key);
            }
        }
        else {
            throw new Error("Type shenanigans afoot (You passed a value that should be impossible at runtime)");
        }
    };
    return CSSStyleSheetInitBox;
}(Box));
export { CSSStyleSheetInitBox };
