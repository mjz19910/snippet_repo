type TP_ParseUrlSearchParams<T extends string>=T extends `?${infer V}`? TP_ParseUrlItems<V>:T extends `${infer V}`? TP_ParseUrlItems<V>:never;
type UC=TP_ParseUrlItems<"x=3&r=12">;