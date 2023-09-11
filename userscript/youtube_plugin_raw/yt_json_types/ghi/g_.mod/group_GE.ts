import {A_AppendContinuationItems} from "../../abc/A.js";
import {C_Continuation,C_AdsControlFlowOpportunityReceived,C_ChangeKeyedMarkersVisibility,C_LoadMarkers,C_ReloadContinuationItems} from "../../abc/C.js";
import {E_GetNotificationMenu,E_GetTranscript,E_SignalService_SendPost} from "../../e/E.js";
import {E_VE3611,E_VE3854,E_VE5754,E_VE6827,E_VE11487,E_VE23462,E_VE42352,E_VE96368} from "../../e/GR_E_VE.js";
import {R_Notification,R_ContinuationItem} from "../../r/group_R.js";

export type GE_Browse=
	|E_VE3611
	|E_VE3854
	|E_VE5754
	|E_VE6827
	|E_VE11487
	|E_VE23462
	|E_VE42352
	|E_VE96368
	|E_VE6827
	;
;
export type GE_Continuation=E_GetNotificationMenu|C_Continuation|E_GetTranscript;
export type GE_ResponseReceived=
	|A_AppendContinuationItems
	|C_AdsControlFlowOpportunityReceived
	|C_ChangeKeyedMarkersVisibility
	|C_LoadMarkers
	|C_ReloadContinuationItems
	|C_ReloadContinuationItems
	|E_SignalService_SendPost
	;
;
export type GR_MP_MenuNotificationSection_Item=R_Notification|R_ContinuationItem;
export type GE_Browse_WCM=GE_Browse["commandMetadata"];
