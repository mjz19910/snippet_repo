export type AnyOf<T>=T extends `${infer U}${infer X}`? X extends ''? never:U|AnyOf<X>:''
