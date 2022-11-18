import { MyTextDecoder } from "./MyTextDecoder";
export class TextCodec {
    static decoder_for(encoding) {
        let decoder = new TextDecoder(encoding);
        return new MyTextDecoder(decoder);
    }
}
