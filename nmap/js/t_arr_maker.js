/**@type {<T>(src:T[])=>import("./t_arr_maker_impl.js").t_arr_maker_impl<T>} */
export function t_arr_maker(src) {
	class maker {
		/**@arg {typeof src} values */
		constructor(values) {
			this.values = values;
		}
		/**@arg {src[0]} value */
		set add(value) {
			this.values.push(value);
		}
		/** @arg {readonly (src[0])[]} template
		 * @arg {string[]} _sep_arr */
		add_template(template, ..._sep_arr) {
			this.values.push(...template);
			return template;
		}
	}
	return new maker(src);
}
