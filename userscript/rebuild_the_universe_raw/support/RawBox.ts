export class RawBox<T> {
	readonly type="raw_box";
	value=null;
	raw_value: T;
	type_symbol: symbol;
	constructor(value: T,symbol_: symbol) {
		this.raw_value=value;
		this.type_symbol=symbol_;
	}
}
