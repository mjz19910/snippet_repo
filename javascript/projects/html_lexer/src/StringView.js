export class StringView extends String {
    substring_view(byte_offset, arg1) {
        return new StringView(this.slice(byte_offset, arg1));
    }
    //@ts-ignore
    length() {
        return super.length;
    }
}
