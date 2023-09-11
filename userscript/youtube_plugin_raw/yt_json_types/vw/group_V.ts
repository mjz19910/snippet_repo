export type V_ParamMapValue=number|string|Uint8Array|['bigint',number[],bigint]|['group',D_ProtobufObj[]]|["failed",D_ProtobufObj[]|null]|V_ParamMapType;
export type V_ParamMapType=Map<number,V_ParamMapValue[]>;
export type V_Bigint<T extends bigint>=T;
export type VW_Bigint<T extends bigint>=[T];
export type V_Uint8Array<_T>=Uint8Array;
