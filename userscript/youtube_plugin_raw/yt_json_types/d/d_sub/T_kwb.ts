type T_kwb<T extends {c: string;}&ZAT3<any>,J,K>={
	key: `boxed_id:key:${T["c"]}:${ZA3<T>}`;
	a: "ST:D";
	b: "boxed_id";
	j: J;
	k: K;
	w: "/db/key/a/b/j/k/w/z";
	z: [T];
};
type Primitive=string|number|bigint|boolean|null|undefined;
type T_kwb_2<T extends {c: string; z: [ZAT2<Primitive>];},J,K>={
	key: `boxed_id:key:${T["c"]}:${ZA3<T>}`;
	a: "ST:D";
	b: "boxed_id";
	j: J;
	k: K;
	w: "/db/key/a/b/j/k/w/z";
	z: [T];
};
type TT_kwb=DST_Key_StartRadio;
