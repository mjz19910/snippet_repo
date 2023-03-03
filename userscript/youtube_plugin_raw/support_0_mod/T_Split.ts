type T_Split_Helper<S extends string,D extends string=",">=
	string extends S? string[]:
	S extends ''? []:
	S extends `${infer T}${D}${infer U}${D}${infer X}`?
	X extends ''? [T,U]:
	[T,U,...T_Split_Helper<X,D>]:
	S extends `${infer T}${D}${infer U}`?
	[T,...T_Split_Helper<U,D>]:
	[S]
	;
;
type T_Split_Helper_t<S extends string,D extends string=",">=
	string extends S
	? string[]
	:S extends ''
	? []
	:S extends `${infer T}${D}${infer U}${D}${infer X}`
	? X extends ''
	? [1,T,U,""]
	:[2,T,U,...T_Split_Helper<X,D>]
	:S extends `${infer T}${D}${infer U}`
	? [3,T,...T_Split_Helper<U,D>]
	:[4,S]
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