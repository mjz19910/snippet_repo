// type D<T>={c: T;};
export type NumArrStr<T extends string>=T extends `${infer U extends number},${infer A extends number},${infer X}`? [U,A,...NumArrStr<X>]:T extends `${infer U extends number},${infer X}`? [U,...NumArrStr<X>]:T extends `${infer U extends number}`? [U]:never;
