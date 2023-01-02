type EnsureHex<T extends `0x${string}`>=T extends `0x${infer G}`? Split<G,"">[number] extends Split<"0123456789abcdef","">[number]? T:never:never;
