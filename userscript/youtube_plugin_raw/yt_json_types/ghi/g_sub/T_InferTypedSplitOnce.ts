// T_SplitOnce<T,D>
// @template {string} WA @template {string} S @template {string} D 
type T_InferTypedSplitOnce<WA extends string,S extends string,D extends string>=
	S extends `${infer Begin}${D}${infer Rest}`
	? Begin extends `${WA}`
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
	S extends `${D}${infer U}`
	? U extends `${WA}${infer A}`
	? ["",`${WA}${A}`]
	:never
	:[S]
	;
;
type T_InferTypedSplitOnceLast<WA extends string,S extends string,D extends string>=
	S extends `${infer U}${D}`
	? U extends WA? [WA,""]
	:never
	:T_InferTypedSplitOnce_NoBegin<WA,S,D>;
