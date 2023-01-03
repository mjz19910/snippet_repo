type ExtractParamObj<T extends number,U extends any[]>=ExtractSingleParamKey<U[T],U[T]["key"]>;
