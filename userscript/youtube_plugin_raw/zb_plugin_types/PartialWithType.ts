type PartialWithType<T,S=JsonFilterRet<any>>=Extract<S,{a: T;}>;
