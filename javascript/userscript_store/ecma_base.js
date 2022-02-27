export class ecma_base {
	/**@arg {{export(...d:[ecma_base, string, string[]]):void}} root */
	static _attach(root) {
		let eXports = Object.getOwnPropertyNames(this.prototype);
		let ecma_section_name = this.name.slice(5).replaceAll('_', '.');
		root.export(this, ecma_section_name, eXports);
	}
}
