export class KeepSome {
	/**@type {number[][]}*/
	m_2d_vec;
	constructor() {
		this.m_2d_vec = [];
	}
	/**@arg {number} value*/
	push(value) {
		let tmp_val = null;
		let set_index = 0;
		this.push_at(set_index, value);
		while(this.m_2d_vec[set_index].length > 50) {
			tmp_val = this.m_2d_vec[set_index].shift();
			if(tmp_val === void 0)
				break;
			if(Math.random() > 0.9) {
				set_index++;
				this.push_at(set_index, tmp_val);
				console.log('psp', 1);
				let off = 0;
				while(this.m_2d_vec[set_index - off].length < 25) {
					tmp_val = this.m_2d_vec[set_index - off - 1].shift();
					if(tmp_val === void 0)
						break;
					this.m_2d_vec[set_index - off].push(tmp_val);
				}
				off++;
				if(set_index - off < 0)
					continue;
				console.log('psp', 2);
				while(this.m_2d_vec[set_index - off].length < 40) {
					tmp_val = this.m_2d_vec[set_index - off - 1].shift();
					if(tmp_val === void 0)
						break;
					this.m_2d_vec[set_index - off].push(tmp_val);
				}
				off++;
				if(set_index - off < 0)
					continue;
				console.log('psp', 3);
				while(this.m_2d_vec[set_index - off].length < 40) {
					tmp_val = this.m_2d_vec[set_index - off - 1].shift();
					if(tmp_val === void 0)
						break;
					this.m_2d_vec[set_index - off].push(tmp_val);
				}
				off++;
				if(set_index - off < 0)
					continue;
				console.log('psp', 4);
				while(this.m_2d_vec[set_index - off].length < 40) {
					tmp_val = this.m_2d_vec[set_index - off - 1].shift();
					if(tmp_val === void 0)
						break;
					this.m_2d_vec[set_index - off].push(tmp_val);
				}
			}
			if(this.m_2d_vec[set_index].length <= 50 && set_index > 0) {
				set_index--;
			}
		}
	}
	/**
	 * @param {number} index
	 * @param {number} value
	 */
	push_at(index, value) {
		while(index >= this.m_2d_vec.length) {
			this.m_2d_vec.push([]);
		}
		this.m_2d_vec[index].push(value);
	}
	/**
	 * @param {number[]} a
	 */
	push_va(...a) {
		for(let x of a) {
			this.push(x);
		}
	}
}
