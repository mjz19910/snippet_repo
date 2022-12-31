import {assert_is_equal_t} from "./assert_is_equal_t";

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
export type InvalidResult1=Split<"1,",",">;
export type InvalidResult_1_1=Split_1<"1,">;
export type InvalidSplit_2=Split_1<"abcdef0123456789","">;
export type Split_p1<S,D extends string=",">=S extends `${infer T}${D}${infer U}`? [T,U]:never;
export type InvalidResult_1_2=SplitRecL1<"1,2,3">;
export type SplitRecL1<S extends string,D extends string=",">=SplitRecL0<S,D>;

export type SplitRecL0<S extends string,D extends string=",">=S extends `${infer T}${D}${infer U}`? [T,...SplitRecL0<U,D>]:[S];

//#region Tests
const s1: SplitRecL1<"1,2,3">=["1","2","3"];
const s2: SplitRecL1<"1,2,3,">=["1","2","3",""];
assert_is_equal_t<SplitRecL0<"1,2,3">>(s1,["1","2","3"]);
assert_is_equal_t<SplitRecL0<"1,2,3,">>(s2,["1","2","3",""]);
//#endregion
