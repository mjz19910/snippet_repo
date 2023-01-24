type Replace<T extends string,S extends string,R extends string>=T extends `${S}${infer N}`? `${R}${Replace<N,S,R>}`:T extends `${infer B}${S}${infer N}`? `${B}${R}${Replace<N,S,R>}`:T;
