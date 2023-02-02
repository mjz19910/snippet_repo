type V_ParamMapType=Map<number,V_ParamMapValue[]>;
type V_ParamMapValue=number|string|['bigint',number[],bigint]|['group',D_DecTypeNum[]]|["failed",D_DecTypeNum[]|null]|V_ParamMapType;
