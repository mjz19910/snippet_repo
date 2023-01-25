type P_param_category=P_LogItems[number] extends `[${string}] [${infer U}]`?U:never;
type P_param_missing=Exclude<P_param_category,P_known_param>;
type P_param=Extract<P_param_category,`${string}.params.${string}`>;
