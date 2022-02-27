export type FirstStr<T extends string> = T extends `${infer U}${string}` ? U : '';
