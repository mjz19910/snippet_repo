type RC$SomeVer<T extends string>=T extends `${infer V0}.${infer V1}.${string}.${string}`? `${V0}.${V1}`:T;
