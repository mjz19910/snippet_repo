type ParamMapValue=number|string|['bigint',number[],bigint]|['group',D_DecTypeNum[]]|["failed",D_DecTypeNum[]|null]|ParamMapType;
type ParamMapType=Map<number,ParamMapValue[]>;
