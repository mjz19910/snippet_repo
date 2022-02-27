export type RemoveFirstStr<T extends string> = T extends `${string}${infer U}` ? U : '';
