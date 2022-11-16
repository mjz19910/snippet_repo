export class SourcePosition {
	/**
	 * @param {number} a
	 * @param {number} b
	 */
	constructor(a,b){
		this.a=a;
		this.b=b;
        this.column=0;
        this.line=0;
	}
}
