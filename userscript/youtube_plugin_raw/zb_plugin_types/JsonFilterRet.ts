type JsonFilterRet<K,T>={
	type: "obj"; of: string; value: any;
}|
{
	type: "function";
	value: null;
	id: number;
}|
{
	type: "normal"; value: T;
}|
	GType_PrototypeDescription_OfTextDecoder<K,"TextDecoder",TextDecoder>|
{
	type: "symbol"; for: "box_symbol";
}|
{type: "symbol";}|
{
	type: "normal:copy"; copy: true; value: {
		[k: string]: unknown;
	};
}|
	string|
	boolean|
	null;
