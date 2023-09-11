import {StoreDescription} from "../../zc_child_modules/YTPlugin_Support_Service.user.js";
import {D_ProtobufObj} from "../d/group_D.js";

export type V_ParamMapValue=number|string|Uint8Array|['bigint',number[],bigint]|['group',D_ProtobufObj[]]|["failed",D_ProtobufObj[]|null]|V_ParamMapType;
export type V_ParamMapType=Map<number,V_ParamMapValue[]>;
export type V_Bigint<T extends bigint>=T;
export type VW_Bigint<T extends bigint>=[T];
export type V_Uint8Array<_T>=Uint8Array;
export type V_StoreBigint=StoreDescription<"bigint">;
export type V_StoreVE=StoreDescription<"root_visual_element">;
export type V_StoreBool=StoreDescription<"boolean">;
export type V_StoreKeys=StoreDescription<"keys">;
export type V_StoreNumber=StoreDescription<"number">;
export type V_StoreString=StoreDescription<"string">;
export type V_RawValue=
	|["bigint",bigint]
	|["string",string]
	|["number",number]
	|["array",{}[]]
	|["V_ParamMapType",V_ParamMapType]
	|["binary",Uint8Array];
;
