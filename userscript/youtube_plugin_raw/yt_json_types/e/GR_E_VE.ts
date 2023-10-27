// deno-lint-ignore-file
import {B_Hack} from "../abc/group_B.ts";
import {DE_VE3611,DE_VE3854,DE_Search,DE_VE5754,DE_VE6827,DE_VE11487,DE_VE23462,DE_ReelWatch,DE_VE42352,DE_VE96368} from "../d/group_DE.ts";
import {GM_VE37414} from "../ghi/group_G.ts";
import {M_VE3611,M_VE3854,M_Search,M_VE5754,M_VE6827,M_VE11487,M_VE23462,M_VE42352,M_VE96368} from "../m/M.ts";
import {M_VE12924} from "../r/group_R.ts";
import {TM_Gen,TE_Endpoint_3} from "../stu/group_T.ts";

export type TM_VE<T extends number>=TM_Gen<{rootVe: T;}>;
export type TE_VE<T extends number>=TE_Endpoint_3<"browseEndpoint",any,TM_VE<T>>;
export type TE_VE_In=TE_Endpoint_3<"browseEndpoint",any,TM_VE<number>>;
//#region E_VE
export type E_VE3611=TE_Endpoint_3<"browseEndpoint",DE_VE3611,M_VE3611>;
export type E_VE3854=TE_Endpoint_3<"browseEndpoint",DE_VE3854,M_VE3854>;
export type E_Search=TE_Endpoint_3<"searchEndpoint",DE_Search,M_Search>;
export type E_VE5754=TE_Endpoint_3<"browseEndpoint",DE_VE5754,M_VE5754>;
export type E_VE6827={
	clickTrackingParams: string;
	commandMetadata: M_VE6827;
	browseEndpoint: DE_VE6827;
	trackingParams?: string;
};
export type E_VE11487=TE_Endpoint_3<"browseEndpoint",DE_VE11487,M_VE11487>;
export type DE_ApplicationSettings=B_Hack;
export type E_ApplicationSettings=TE_Endpoint_3<"applicationSettingsEndpoint",DE_ApplicationSettings,M_VE12924>;
export type E_VE23462=TE_Endpoint_3<"browseEndpoint",DE_VE23462,M_VE23462>;
export type E_VE37414_ReelWatch=TE_Endpoint_3<"reelWatchEndpoint",DE_ReelWatch,TM_Gen<GM_VE37414>>;
export type E_VE42352=TE_Endpoint_3<"browseEndpoint",DE_VE42352,M_VE42352>;
export type E_VE96368=TE_Endpoint_3<"browseEndpoint",DE_VE96368,M_VE96368>;
//#endregion
