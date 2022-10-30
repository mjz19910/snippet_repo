export class ObjectBoxImpl {
	type: "object_box"
	extension: null
	inner_type: 'unit'
	value: {}
	as_type(_a: 'object'|'function') {
		return null
	}
	constructor(value: {}) {
		this.type='object_box'
		this.extension=null
		this.inner_type='unit'
		this.value=value
	}
}
