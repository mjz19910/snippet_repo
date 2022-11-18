import {StringView} from "./StringView.js";

export class MyTextDecoder {
    to_utf8(input: BufferSource): StringView {
        return new StringView(this.x.decode(input));
    }
    x: TextDecoder;
    constructor(x: TextDecoder) {
        this.x=x;
    }
}
