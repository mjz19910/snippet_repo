type T_Replace<T extends string,S extends string,R extends string>=T extends `${S}${infer N}`? `${R}${T_Replace<N,S,R>}`:T extends `${infer B}${S}${infer N}`? `${B}${R}${T_Replace<N,S,R>}`:T;
