type T_Split_Helper<S extends string,D extends string=",">=
	string extends S? string[]:
	S extends ''? []:
	S extends `${infer T}${D}${infer U}${D}${infer X}`?
	D extends ''? [T,U]:X extends ''? [T,U,""]:
	[T,U,...T_Split_Helper<X,D>]:
	S extends `${infer T}${D}${infer U}`?
	[T,...T_Split_Helper<U,D>]:
	[S]
	;
;
type T_Split_Helper_t<S extends string,D extends string=",">=
	string extends S
	? string[]:S extends ''
	? [0.1]:S extends `${infer T}${D}${infer U}${D}${infer X}`
	? X extends ''
	? [1.1,T,U,""]:[1.2,T,U,...T_Split_Helper<X,D>]:S extends `${infer T}${D}${infer U}`
	? [2.1,T,...T_Split_Helper<U,D>]:[2.2,S]
	;
;
type TS_Test2=T_Split_Helper<`
g
`,"\n">;
type T_Split<S extends string,D extends string=",">=
	string extends S? string[]:
	S extends ''? []:
	S extends `${infer T}${D}${infer U}`? U extends ""? [T,""]:
	T_Split_Helper<S,D>:T_Split_Helper<S,D>
	;
;