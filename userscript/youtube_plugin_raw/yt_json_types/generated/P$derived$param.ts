type P$param$category$=P$LogItems[number] extends `[${string}] [${infer U}]`?U:never;
type P$param$missing$=Exclude<P$param$category$,P$known$param>;
type P$param$=Extract<P$param$category$,`${string}.params.${string}`>;
