type TR_MultiPageMenu_Empty=TR_MultiPageMenu<{}>;
type T_NumArrStr<T extends string>=T extends `${infer U extends number},${infer A extends number},${infer X}`? [U,A,...T_NumArrStr<X>]:T extends `${infer U extends number},${infer X}`? [U,...T_NumArrStr<X>]:T extends `${infer U extends number}`? [U]:never;
type T_NumArrStrVerify<T extends string,C extends string="">=C extends ''?T extends `${number},${number},${infer X}`?T_NumArrStrVerify<T,X>:C extends ''? `${T}`:`${T},${C}`:C extends `${number},${number},${infer X}`?T_NumArrStrVerify<T,X>:T;
type T_NumRange<T,U>=NS_NumRange.NumRange<T,U>;
type TR_MultiPageMenu<T>={multiPageMenuRenderer: T;};