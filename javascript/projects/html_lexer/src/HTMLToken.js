export class HTMLToken {
	static Type=class {
        /**@readonly*/ static Invalid=1
        /**@readonly*/ static DOCTYPE=2
        /**@readonly*/ static StartTag=3
        /**@readonly*/ static EndTag=4
        /**@readonly*/ static Comment=5
        /**@readonly*/ static Character=6
        /**@readonly*/ static EndOfFile=7
	}
	/**
	 * @param {number|string} code_num
	 */
	static make_character(code_num) {
		let obj=new this;
		obj.m_type=HTMLToken.Type.Character;
		obj.set_code_point(code_num)
		return obj
	}
	/**@arg {Extract<typeof HTMLToken['Type'][keyof typeof HTMLToken['Type']], number>} type*/
	constructor() {
		this.m_type=HTMLToken.Type.Invalid;
		this.m_data=null;
	}
	/**
	 * @param {number|string} code_point
	 */
	set_code_point(code_point) {
		this.m_data=code_point
	}
	/**
	 * @param {never} data
	 * @param {never} _pos
	 */
	set_start_position(data,_pos) {
		this.m_data=data
	}
}
