export type Split<S extends string,D extends string=",">=
	string extends S? string[]:
	S extends ''? []:
	S extends `${infer T}${D}${infer U}${D}`? [T,U,""]:
	S extends `${infer T}${D}${infer U}${D}${infer X}`? [T,U,...Split<X,D>]:
	S extends `${infer T}${D}`? [T,""]:
	S extends `${infer T}${D}${infer U}`? [T,...Split<U,D>]:
	[S];
type UseBool<_T>=_T extends boolean?{brand: string}:{brand: {}};
type Validate<T,U>=UseBool<T extends U?U extends T?true:never:never>['brand'];
type InvalidResult1=Split<"1,",",">;
type TypeValidTest=Validate<InvalidResult1,["1",""]>&Validate<InvalidResult2,["1","2",""]>;
// @ts-expect-error
type TypeError1={[x: Validate<InvalidResult1,["1"]>]:any};
// @ts-expect-error
type TypeError2={[x: Validate<InvalidResult2,["1,2",""]>]:any};
type InvalidResult2=Split<"1,2,",",">;

type UseTestTypes=TypeError1|TypeError2|{[x:TypeValidTest]:any};

export {type TypeValidTest,type UseTestTypes as UseInvalid};
