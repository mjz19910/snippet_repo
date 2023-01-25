type T_Split_Helper<S extends string,D extends string=",">=
	string extends S? string[]:
	S extends ''? []:
	S extends `${infer T}${D}${infer U}${D}${infer X}`?
	[T,U,...T_Split<X,D>]:
	S extends `${infer T}${D}${infer U}`?
	[T,...T_Split<U,D>]:
	[S];
type T_Split<S extends string,D extends string=",">=
	string extends S? string[]:
	S extends ''? []:
	S extends `${infer T}${D}${infer U}`?U extends ""? [T,""]:
	T_Split_Helper<S,D>:T_Split_Helper<S,D>;