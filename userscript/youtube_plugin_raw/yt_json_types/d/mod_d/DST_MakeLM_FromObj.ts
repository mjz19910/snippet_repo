type DST_MakeLM_FromObj<T extends TMK_SuccessorX3<V>&{k: string;},L="key",M extends Primitive=TZ_Successor<T> extends infer J extends {k: string;}? J["k"]:"unknown",V extends Primitive=Primitive>={
	key: `boxed_id:${T['k']}:${M}:${V}`;
	a: DST_KStr_ABLMZ;
	b: "boxed_id";
	l: L;
	m: M;
	z: [T];
	_info_arr?: [TZ_SuccessorX3<T>];
};