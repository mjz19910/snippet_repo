enum Type {
	Invalid=1,
	DOCTYPE=2,
	StartTag=3,
	EndTag=4,
	Comment=5,
	Character=6,
	EndOfFile=7,
}
export class HTMLToken {
	static Type=Type;
	m_type
	m_data!: number|string|{}
	/**
	 * @param {number|string} code_num
	 */
	static make_character(code_num: string|number) {
		let obj=new this(HTMLToken.Type.Character,code_num)
		obj.set_code_point(code_num)
		return obj
	}
	constructor(type: Type,code_point: string|number) {
		this.m_type=type
		this.set_code_point(code_point)
	}
	set_code_point(code_point: number|string) {
		this.m_data=code_point
	}
	set_start_position(data: {},_pos: {}) {
		this.m_data=data
	}
}
