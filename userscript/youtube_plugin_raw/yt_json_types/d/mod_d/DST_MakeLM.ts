type DST_MakeLM<L extends string,M extends string,ZV extends Primitive,T extends DI_T_KV_Z<L,ZAT2<ZV>>=DI_T_KV_Z<L,ZAT2<ZV>>>={
	key: `boxed_id:${L}:${M}:${ZV}`;
	a: "/db/key/a/b/l/m/z";
	b: "boxed_id";
	l: L;
	m: M;
	z: [T];
};
