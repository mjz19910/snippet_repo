// --- Misc ---
type SkipItem0_t<T extends [f: string, ...v: any[]], X> = T extends [X, ...infer U] ? U : T[1];
export type SkipItem0<T extends [f: any, ...v: any[]]> = SkipItem0_t<T, T[0]>;