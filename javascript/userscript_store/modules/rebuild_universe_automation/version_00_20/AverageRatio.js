export class AverageRatio {
	// @AverageRatio
	/**
	 * @param {string} type
	 * @param {number} time_diff_max
	 * @param {number} size
	 * @param {number} history_size
	 * @param {any} time_start
	 */
	constructor(type, time_diff_max, size, history_size, time_start) {
		this.type = type;
		/**
		 * @type {number[]}
		 */
		this.history = [];
		this.count = 0;
		this.value = 0;
		this.size = size;
		this.time_diff_max = time_diff_max;
		this.time_start = time_start;
		this.time_cur_start = 0;
		this.time_cur = 0;
		this.gen_count = 0;
		this.history_size = history_size;
	}
	/**
	 * @param {AverageRatioRoot} avg
	 * @param {number} time_now
	 */
	do_history_update(avg, time_now) {
		if(this.value === null)
			return;
		this.count++;
		this.time_cur = time_now - this.time_start - this.time_cur_start;
		if(this.time_cur > this.time_diff_max) {
			this.time_cur_start += this.time_diff_max;
			this.time_cur -= this.time_diff_max;
			this.count = 0;
			this.gen_count++;
			this.history.unshift(this.value);
			if(this.history.length > this.history_size)
				this.history.pop();
			let next = avg.next(this);
			if(next)
				next.do_history_update(avg, time_now);
		}
	}
	/**
	 * @param {number} value
	 */
	add_to_ratio(value, avg_window = this.size) {
		if(this.value === null) {
			this.value = value;
			return;
		}
		this.value = (this.value * (avg_window - 1) + value) / avg_window;
	}
	/**
	 * @param {number} size
	 */
	set_history_size(size) {
		this.history_size = size;
	}
	get_average() {
		if(this.value === null)
			return 0;
		return this.value;
	}
}
