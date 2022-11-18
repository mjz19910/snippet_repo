import { StringView } from "./StringView.js";
export class MyTextDecoder {
    to_utf8(input) {
        return new StringView(this.x.decode(input));
    }
    x;
    constructor(x) {
        this.x = x;
    }
}
