type T_CopyArray_Modify<T extends any[],Acc extends any[]=[]>=T extends [infer F,...infer VR extends T[number][]]? T_CopyArray_Modify<VR,[KV_T_AKZ<F,T_PrimitiveBox<{}>>,...Acc]>:Acc;
type Test1_T_CopyArray_Modify=T_CopyArray_Modify<T_DistributedKeysOf_2<{a: any,b: any;}>>;
