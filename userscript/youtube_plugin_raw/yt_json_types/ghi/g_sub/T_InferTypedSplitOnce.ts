// TI_SplitOnce<T,D>
// @template {string} WA @template {string} S @template {string} D 
type TI_SplitOnce<WA extends string,S extends string,D extends string>=
	S extends `${infer Begin}${D}${infer Rest}`? TI_SplitOnce_1<WA,S,D,Begin,Rest>:[S];
;
type TI_SplitOnce_1<WA extends string,S extends string,D extends string,Begin extends string,Rest extends string>=
	Rest extends ""
	? TI_SplitOnce_NB_1<WA,Begin>
	:Begin extends WA
	? [WA,Rest]
	:Begin extends ""
	? TI_SplitOnce_NB_2<WA,S,D>
	:TI_SplitOnce_2<WA,Begin,Rest>;
;
type TI_SplitOnce_3<WA extends string,S extends string,D extends string,Begin extends string,Rest extends string>=
	Begin extends ""? TI_SplitOnce_NB_2<WA,S,D>:TI_SplitOnce_2<WA,Begin,Rest>;
;
type TI_SplitOnce_2<WA extends string,Begin extends string,Rest extends string>=Rest extends WA? [Begin,WA]:never;
type TI_SplitOnce_NR_1<WA extends string,Begin extends string,Rest extends string>=Rest extends WA? [Begin,WA]:never;
type TI_SplitOnce_NB_1<WA extends string,Begin extends string>=Begin extends WA? [WA,""]:never;
type TI_SplitOnce_NB_2<WA extends string,S extends string,D extends string>=S extends `${D}${infer Rest}`? TI_SplitOnce_NR_2<WA,Rest>:[S];
type TI_SplitOnce_NR_2<WA extends string,Rest extends string>=Rest extends `${WA}${infer Rest2}`? ["",`${WA}${Rest2}`]:never;
