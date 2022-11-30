export class RawBox<T> {
	readonly type="raw_box";
	value: T;
	type_symbol: symbol;
	constructor(value: T,symbol_: symbol) {
		this.value=value;
		this.type_symbol=symbol_;
	}
}
