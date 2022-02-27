var Box = /** @class */ (function () {
    function Box(value) {
        this.value = value;
    }
    Box.prototype.get_matching_typeof = function (to_match) {
        if (typeof this.value === to_match)
            return this;
        return null;
    };
    return Box;
}());
export { Box };
