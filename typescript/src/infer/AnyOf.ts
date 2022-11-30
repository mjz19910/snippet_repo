export type AnyOf<T>=T extends `${infer U}${infer X}`? X extends ''? U:AnyOf<X>|U:'';
