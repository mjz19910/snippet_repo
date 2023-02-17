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
	:TI_SplitOnce_4<WA,S,D,[Begin,Rest]>;
;
type TI_SplitOnce_4<WA extends string,S extends string,D extends string,Split extends [string,string]>=
	Split[0] extends ""
	? TI_SplitOnce_NB_2<WA,S,D>
	:TI_SplitOnce_2<WA,Split>;
type TI_SplitOnce_3<WA extends string,S extends string,D extends string,Split extends [string,string]>=
	Split[0] extends ""? TI_SplitOnce_NB_2<WA,S,D>:TI_SplitOnce_2<WA,Split>;
;
// S extends `${infer Begin}${D}`? TI_SplitOnce_NB_1<WA,Begin>:S extends `${D}${WA}${infer Rest}`?["",`${WA}${Rest}`]:[S]
type TI_SplitOnce_NE<WA extends string,S extends string,D extends string>=S extends `${infer Begin}${D}`? TI_SplitOnce_NB_1<WA,Begin>:TI_SplitOnce_NE_1<WA,S,D>;
type TI_SplitOnce_NE_1<WA extends string,S extends string,D extends string>=S extends `${D}${WA}${infer Rest}`? ["",`${WA}${Rest}`]:[S];
type TI_SplitOnce_2<WA extends string,Split extends [string,string]>=Split[1] extends WA? [Split[0],WA]:never;
type TI_SplitOnce_NB_1<WA extends string,Begin extends string>=Begin extends WA? [WA,""]:never;
type TI_SplitOnce_NB_2<WA extends string,S extends string,D extends string>=S extends `${D}${infer Rest}`? Rest extends `${WA}${infer Rest2}`? ["",`${WA}${Rest2}`]:never:[S];
type TI_SplitOnce_NR_2<WA extends string,Rest extends string>=Rest extends `${WA}${infer Rest2}`? ["",`${WA}${Rest2}`]:never;
