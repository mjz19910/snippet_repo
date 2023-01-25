type T_EnsureHex<T extends `0x${string}`>=T extends `0x${infer G}`? T_Split<G,"">[number] extends T_Split<"0123456789abcdef","">[number]? T:never:never;
