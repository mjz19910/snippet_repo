export class StringView extends String {
    substring_view(byte_offset: number,arg1: number) {
		return new StringView(this.slice(byte_offset,arg1));
    }
	//@ts-ignore
	length() {
		return super.length;
	}
}
