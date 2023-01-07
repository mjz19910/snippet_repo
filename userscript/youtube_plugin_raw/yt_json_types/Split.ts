type Split<S extends string,D extends string=",">=
	string extends S? string[]:
	S extends ''? []:
	S extends `${infer T}${D}${infer U}${D}${infer X}`?
	string[] extends Split<X,D> ?[T,U,string]:
	[T,U,...Split<X,D>]:
	S extends `${infer T}${D}${infer U}`?
	[T,...Split<U,D>]:
	[S];