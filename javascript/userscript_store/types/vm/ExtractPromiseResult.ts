export type ExtractPromiseResult<T> = T extends Promise<infer U> ? U : never
