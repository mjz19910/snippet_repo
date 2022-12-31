export type Split<S extends string,D extends string>=
	string extends S? string[]:
	S extends ''? []:
	S extends `${infer T}${D}`?[T,""]:
	S extends `${infer T}${D}${infer U}${D}${infer X}`? [T,U,...Split<X,D>]:
	S extends `${infer T}${D}${infer U}`? [T,...Split<U,D>]:
	[S];
type UseBool<_T>=_T extends boolean?{brand: string}:{brand: {}};
type Validate<T,U>={[C in UseBool<T extends U?U extends T?true:never:never>['brand']]:any};
type InvalidResult1=Split<"1,",",">;
type TypeValidTest=Validate<InvalidResult1,["1",""]>;
// @ts-expect-error
type TypeError={[x: Validate<InvalidResult1,["1"]>]:any};

export {type TypeValidTest};
