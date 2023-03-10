export type IndexOrNever<T,U>=U extends keyof T? T[U]:never;
