type DI_R_Key_StartRadio={
	a: "DI:R";
	// ^ a = is
	b: "raw";
	// ^ b = type
	c: "key:start_radio";
	// ^ c = tag
	w: "/item/a/b/c/w/z";
	z: [DI_Key_StartRadio];
};
type T_DI_Raw<k1 extends string,k2 extends string,T>={a: "DI:R",b: "raw",c: `${k1}:${k2}`,w: "/item/a/b/c/w/z",z: [T];};
type T_DI_Raw_2<C extends string,T>={a: "DI:R",b: "raw",c: C,w: "/item/a/b/c/w/z",z: [T];};
