// TI_SplitOnce<T,D>
// @template {string} WA @template {string} S @template {string} D
type TI_SplitOnce<WA extends string,S extends string,D extends string>=
	S extends `${infer Begin}${D}${infer Rest}`? TI_SplitOnce_1<WA,S,D,Begin,Rest>:[S];
;
type TI_SplitOnce_2arg<A1 extends string,A2 extends string,S extends string,D extends string>=
	S extends `${infer Begin}${D}${infer Rest}`? TI_SplitOnce_2arg_1<A1,A2,S,D,Begin,Rest>:[S];
;
type TI_SplitOnce_2arg_1<A1 extends string,A2 extends string,S extends string,D extends string,Begin extends string,Rest extends string>=
	Begin extends A1
	? TI_SplitOnce_NR_3<A1,Rest>
	:TI_SplitOnce_2arg_3<A1,A2,S,D,[Begin,Rest]>;
;
type TI_SplitOnce_2arg_3<A1 extends string,A2 extends string,S extends string,D extends string,Split extends [string,string]>=
	Split[0] extends ""? TI_SplitOnce_NB_2<A1,S,D>:TI_SplitOnce_2arg_2<A1,A2,Split>;
;
type TI_SplitOnce_2arg_2<A1 extends string,A2 extends string,Split extends [string,string]>=Split extends [A1,A2]? [A1,A2]:never;
type TI_SplitOnce_1<WA extends string,S extends string,D extends string,Begin extends string,Rest extends string>=
	Begin extends WA
	? TI_SplitOnce_NR_3<WA,Rest>
	:TI_SplitOnce_3<WA,S,D,[Begin,Rest]>;
;
type TI_SplitOnce_3<WA extends string,S extends string,D extends string,Split extends [string,string]>=
	Split[0] extends ""? TI_SplitOnce_NB_2<WA,S,D>:TI_SplitOnce_2<WA,Split>;
;
type TD_XX<X extends string,A extends X extends `${string}:${infer W}:${B}`? W:never,B extends X extends `${string}:${A}:${infer W}`? W:never>=TI_SplitOnce<`${A}:${B}`,X,":">;
type TD_X1=TD_XX<`boxed_id:num:tt`,"num","tt">;
// S extends `${infer Begin}${D}`? TI_SplitOnce_NB_1<WA,Begin>:S extends `${D}${WA}${infer Rest}`?["",`${WA}${Rest}`]:[S]
type TI_SplitOnce_NE<WA extends string,S extends string,D extends string>=S extends `${infer Begin}${D}`? TI_SplitOnce_NB_1<WA,Begin>:TI_SplitOnce_NE_1<WA,S,D>;
type TI_SplitOnce_NE_1<WA extends string,S extends string,D extends string>=S extends `${D}${WA}${infer Rest}`? ["",`${WA}${Rest}`]:[S];
type TI_SplitOnce_2<WA extends string,Split extends [string,string]>=Split[1] extends WA? [Split[0],WA]:never;
type TI_SplitOnce_NB_1<WA extends string,S extends string>=S extends WA? [WA,""]:never;
type TI_SplitOnce_NR_3<WA extends string,S extends string>=S extends ""? [WA,""]:never;
type TI_SplitOnce_NB_2<WA extends string,S extends string,D extends string>=S extends `${D}${infer Rest}`? Rest extends `${WA}${infer Rest2}`? ["",`${WA}${Rest2}`]:never:[S];
type TI_SplitOnce_NR_2<WA extends string,Rest extends string>=Rest extends `${WA}${infer Rest2}`? ["",`${WA}${Rest2}`]:never;


type TI_SplitOnce_2_v2<WA extends [string,string],Split extends [string,string]>=Split[0] extends WA[0]? Split[1] extends WA[1]? [WA[0],WA[1]]:never:never;
type TI_SplitOnce_NB_2_v2<WA extends [string,string],S extends string,D extends string>=S extends `${D}${infer Rest}`? Rest extends `${WA[0]}${infer Rest2}`? ["",`${WA[0]}${Rest2}`]:never:[S];
type TI_SplitOnce_3_v2<WA extends [string,string],S extends string,D extends string,Split extends [string,string]>=
	Split[0] extends ""? TI_SplitOnce_NB_2_v2<WA,S,D>:TI_SplitOnce_2_v2<WA,Split>;
;
type TI_SplitOnce_1_v2<WA extends [string,string],S extends string,D extends string,Begin extends string,Rest extends string>=
	Begin extends WA[0]
	? TI_SplitOnce_NR_3<WA[1],Rest>
	:TI_SplitOnce_3_v2<WA,S,D,[Begin,Rest]>;
;
type TI_SplitOnce_v2<WA extends [string,string],S extends string,D extends string>=
	S extends `${infer Begin}${D}${infer Rest}`? TI_SplitOnce_1_v2<WA,S,D,Begin,Rest>:["not extends `${infer Begin}${D}${infer Rest}`",S];
;
