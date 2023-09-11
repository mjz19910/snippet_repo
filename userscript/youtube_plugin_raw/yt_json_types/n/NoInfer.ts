export type NoInfer<T>=T extends infer NoInferT? NoInferT:never;
