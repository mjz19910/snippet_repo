export type Split<S extends string,D extends string=",">=
	string extends S? string[]:
	S extends ''? [1]:
	S extends `${infer T}${D}${infer U}${D}`?
	[T,U,""]:
	S extends `${infer T}${D}${infer U}${D}${infer X}`?
	[T,U,...Split<X,D>]:
	S extends `${infer T}${D}`?
	[T,""]:
	S extends `${infer T}${D}${infer U}`?
	[T,...Split<U,D>]:
	[S];
type InvalidResult1=Split<"1,",",">;
type Split_1<S extends string,D extends string=",">=
	string extends S? string[]:
	S extends ''? []:
	S extends `${infer T}${D}${infer U}${D}${infer X extends ""}`?
	[T,U,X]:
	S extends `${infer T}${D}${infer U}${D}${infer X}`?
	[T,U,...Split_1<X,D>]:
	S extends `${infer T}${D}${infer X extends ""}`?
	[T,X]:
	S extends `${infer T}${D}`? [T,""]:
	S extends `${infer T}${D}${infer U}`?
	[T,...Split_1<U,D>]:
	[S];


type InvalidResult_1_1=Split_1<"1,">;
type InvalidSplit_2=Split_1<"abcdef0123456789","">;
export {type InvalidResult1};
type Split_p1<S,D=",">=S extends `${infer T}${D}${infer U}`? [T,U]:never;
type InvalidResult_1_2=Split_p1<"1,2,3">;
