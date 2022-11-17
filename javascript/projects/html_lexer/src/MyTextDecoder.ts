export class MyTextDecoder {
    to_utf8(input: BufferSource): string {
        return this.x.decode(input);
    }
    x: TextDecoder;
    constructor(x: TextDecoder) {
        this.x=x;
    }
}
