export class StringView {
	m_empty=true;
	X="";
    substring_view(byte_offset: number,arg1: number) {
		return new StringView(this.X.slice(byte_offset,arg1));
    }
	length() {
		return this.X.length;
	}
	constructor(x?: string) {
		if(typeof x == "string") {
			this.m_empty=false;
			this.X=x;
		}
	}
}
