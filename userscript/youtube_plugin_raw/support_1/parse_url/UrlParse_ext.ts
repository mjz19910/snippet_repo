type UrlParse_ext<T extends string>=T extends `${infer Pathname}?${infer Search}`? UrlParseRes_2<T,Search,Pathname>:never;
