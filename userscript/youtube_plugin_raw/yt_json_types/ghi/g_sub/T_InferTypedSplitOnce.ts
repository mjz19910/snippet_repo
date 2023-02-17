// T_SplitOnce<T,D>
// @template {string} WA @template {string} S @template {string} D 
type T_InferTypedSplitOnce<WA extends string,S extends string,D extends string>=S extends `${D}${infer U}`? U extends `${WA}${infer A}`? ["",`${WA}${A}`]:never:[S];
