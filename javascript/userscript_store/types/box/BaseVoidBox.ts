export class BaseVoidBox {
	readonly type="void"
	as_type(_x: 'function'|'object') {
		return null
	}
}
