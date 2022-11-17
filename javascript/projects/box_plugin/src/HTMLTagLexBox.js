export class HTMLTagLexBox {
	/** @readonly */ type="tag";
	m_start_tag;
	/**
	 * @arg {string} value
	 * @param {string} start_value
	 * @param {string} end_value
	 */
	constructor(start_value,end_value,value) {
		if(start_value==='<') {
			this.m_start_tag??=0;
			this.m_start_tag++;
		} else if(start_value==='</') {
			this.m_end_tag=true;
			this.value=value;
		} else if(start_value==='<!') {
		}
		else {
			console.log('unk_start_tag',start_value);
		}
		if(end_value==='>') {
			if(!this.m_end_tag) {
				this.m_start_tag??=0;
				this.m_start_tag++;
			} else {
				delete this.m_start_tag;
			}
		} else if(end_value==='/>') {
			this.m_end_tag=true;
			delete this.m_start_tag;
		} else {
			console.log('wrong_tag_end',end_value);
		}
		if(this.m_start_tag===0) {
			delete this.m_start_tag;
		}
	}
}
