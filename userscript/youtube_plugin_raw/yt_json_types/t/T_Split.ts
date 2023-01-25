type T_Split<S extends string,D extends string=",">=
	string extends S? string[]:
	S extends ''? []:
	S extends `${infer T}${D}${infer U}${D}${infer X}`?
	string[] extends T_Split<X,D> ?[T,U,string]:
	[T,U,...T_Split<X,D>]:
	S extends `${infer T}${D}${infer U}`?
	[T,...T_Split<U,D>]:
	[S];