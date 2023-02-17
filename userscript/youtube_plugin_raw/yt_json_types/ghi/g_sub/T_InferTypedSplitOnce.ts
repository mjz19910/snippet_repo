// T_SplitOnce<T,D>
// @template {string} WA @template {string} S @template {string} D 
type T_InferTypedSplitOnce<WA extends string,S extends string,D extends string>=
	S extends `${infer Begin}${D}${infer Rest}`
	? Rest extends ""
	? T_InferTypedSplitOnceLast<WA,Begin>
	:Begin extends `${WA}`
	? [WA,Rest]
	:Begin extends ""
	? T_InferTypedSplitOnce_NoBegin<WA,S,D>
	:Rest extends `${WA}`
	? [Begin,WA]
	:never
	:[S]
	;
;
type T_InferTypedSplitOnce_NoBegin<WA extends string,S extends string,D extends string>=
	S extends `${D}${infer Rest}`
	? T_InferTypedSplitOnce_NB<WA,Rest>
	:[S]
	;
;
type T_InferTypedSplitOnce_NB_1<WA extends string,Begin extends string,Rest extends string>=
	Rest extends `${WA}`
	? [Begin,WA]
	:never;
type T_InferTypedSplitOnce_NB<WA extends string,Rest extends string>=Rest extends `${WA}${infer A}`? ["",`${WA}${A}`]:never;
type T_InferTypedSplitOnceLast<WA extends string,Begin extends string>=Begin extends WA? [WA,""]:never;
