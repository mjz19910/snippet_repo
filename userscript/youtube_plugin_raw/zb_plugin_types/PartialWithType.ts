type PartialWithType<T,S=JsonFilterRet<any,any>>=Extract<S,{a: T;}>;
