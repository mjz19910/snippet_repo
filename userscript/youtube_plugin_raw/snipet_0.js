class Tmp {
	/** @arg {{}} x @arg {string|null} r_name */
	generate_typedef(x,r_name=null) {
		x; r_name;
	}
	/** @arg {{}} x */
	log_new_typedef(x) {
		let td=this.generate_typedef(x,"InfoRowData");
		console.log(td);
	}
}