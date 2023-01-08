class Tmp {
	/** @arg {{}} x @arg {string|null} r_name */
	generate_typedef(x,r_name=null) {
		x; r_name;
	}
	/** @arg {{}} x @arg {string|null} r_name */
	generate_renderer(x,r_name=null) {
		x; r_name;
	}
	/** @arg {{}} x */
	log_new_typedef(x) {
		let td,rn;
		td=this.generate_typedef(x,"InfoRowData");
		console.log(td);
		td=this.generate_typedef(x,"CLA");
		rn=this.generate_renderer(x,"VideoDescriptionMusicSectionData");
		console.log(rn);
	}
}