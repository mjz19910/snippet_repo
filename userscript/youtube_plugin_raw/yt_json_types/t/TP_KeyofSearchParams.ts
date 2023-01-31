type TP_KeyofSearchParams<T extends string>=T extends ""? []:T extends `${infer U}&${infer Z}`? [keyof TP_ParseUrlValue<U>,...TP_KeyofSearchParams<Z>]:[keyof TP_ParseUrlValue<T>];
