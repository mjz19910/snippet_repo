export class HTMLToken {
	static Type=class {
        /**@readonly*/ static Invalid=0
        /**@readonly*/ static DOCTYPE=1
        /**@readonly*/ static StartTag=2
        /**@readonly*/ static EndTag=3
        /**@readonly*/ static Comment=4
        /**@readonly*/ static Character=5
        /**@readonly*/ static EndOfFile=6
	}
	/** @type {Extract<typeof HTMLToken['Type'][keyof typeof HTMLToken['Type']],number>} */
	m_type;
	/**
	 * @param {number|string} code_num
	 */
	static make_character(code_num) {
		let obj=new this;
		obj.m_type=HTMLToken.Type.Character;
		obj.set_code_point(code_num)
		return obj
	}
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
