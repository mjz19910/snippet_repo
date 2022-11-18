import {StringView} from "./StringView.js";

export class MyTextDecoder {
    to_utf8(input: BufferSource): StringView {
        return StringView.from(this.m_text_decoder.decode(input));
    }
    m_text_decoder: TextDecoder;
    constructor(text_decoder: TextDecoder) {
        this.m_text_decoder=text_decoder;
    }
}
