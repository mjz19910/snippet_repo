export class SourcePosition {
    /**
	 * @param {number} arg0
	 * @param {number} arg1
	 */
    static from(arg0,arg1) {
		return new this(arg0,arg1);
    }
	/**
	 * @param {number} column
	 * @param {number} line
	 */
	constructor(column,line){
		this.column=column;
		this.line=line;
	}
}
