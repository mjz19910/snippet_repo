import {C_ScrollToEngagementPanel} from "../abc/group_C.ts";
import {DU_Browse_Id,DU_TargetId_ShoppingPanel_EntryPoint,D_ChanLoc,D_LoggingDirectives} from "../d/group_D.ts";
import {G_EngagementPanelSectionShowCommands} from "../ghi/group_G.ts";
import {A_LoadingAccountMenu,A_LoadingNotificationsMenu} from "../nop_q/Popup.ts";
import {R_AdsEngagementPanelContent,R_ClipSection,R_ContinuationItem,R_EngagementPanelTitleHeader,R_MacroMarkersList,R_ProductList,R_SectionList,R_StructuredDescriptionContent,ToKeyValue} from "../r/group_R.ts";
import {T_ShortsSurfaceIdentifier} from "./group_T.ts";

//#region S
export type S_GetAccountMenu={signal: "GET_ACCOUNT_MENU"; actions: A_LoadingAccountMenu[];};
//#endregion
//#region SI_DB
export type SI_DB_EngagementPanel_Ads={
	content: R_AdsEngagementPanelContent;
	targetId: "engagement-panel-ads";
	visibility: "ENGAGEMENT_PANEL_VISIBILITY_HIDDEN";
	loggingDirectives: D_LoggingDirectives;
};
export type SI_DB_EngagementPanel_MacroMarkers_DescriptionChapters={
	panelIdentifier: "engagement-panel-macro-markers-description-chapters";
	header: R_EngagementPanelTitleHeader;
	content: R_MacroMarkersList;
	targetId: "engagement-panel-macro-markers-description-chapters";
	visibility: "ENGAGEMENT_PANEL_VISIBILITY_HIDDEN";
	loggingDirectives: D_LoggingDirectives;
};
export type SI_DB_EngagementPanel_ClipCreate={
	panelIdentifier: "engagement-panel-clip-create";
	header: R_EngagementPanelTitleHeader;
	content: R_ClipSection;
	targetId: "engagement-panel-clip-create";
	visibility: "ENGAGEMENT_PANEL_VISIBILITY_HIDDEN";
	onShowCommands: G_EngagementPanelSectionShowCommands[];
	loggingDirectives: D_LoggingDirectives;
};
export type SI_DB_EngagementPanel_MacroMarkers_AutoChapters={
	panelIdentifier: "engagement-panel-macro-markers-auto-chapters";
	header: R_EngagementPanelTitleHeader;
	content: R_MacroMarkersList;
	targetId: "engagement-panel-macro-markers-auto-chapters";
	visibility: "ENGAGEMENT_PANEL_VISIBILITY_HIDDEN";
	loggingDirectives: D_LoggingDirectives;
};
//#endregion
//#region SI_VE
export type SI_VE76278_EngagementPanel={
	panelIdentifier: "comment-item-section";
	header: R_EngagementPanelTitleHeader;
	content: R_SectionList;
	veType: 76278;
	targetId: "engagement-panel-comments-section";
	visibility: "ENGAGEMENT_PANEL_VISIBILITY_HIDDEN";
	loggingDirectives: D_LoggingDirectives;
};
export type SI_VE99999_EngagementPanel={
	panelIdentifier: DU_TargetId_ShoppingPanel_EntryPoint;
	header: R_EngagementPanelTitleHeader;
	content: R_ProductList;
	veType: 99999;
	targetId: DU_TargetId_ShoppingPanel_EntryPoint;
	visibility: "ENGAGEMENT_PANEL_VISIBILITY_HIDDEN";
	loggingDirectives: D_LoggingDirectives;
};
export type SI_VE126250_EngagementPanel={
	panelIdentifier: "engagement-panel-searchable-transcript";
	header: R_EngagementPanelTitleHeader;
	content: R_ContinuationItem;
	veType: 126250;
	targetId: "engagement-panel-searchable-transcript";
	visibility: "ENGAGEMENT_PANEL_VISIBILITY_HIDDEN";
	onShowCommands: C_ScrollToEngagementPanel[];
	loggingDirectives: D_LoggingDirectives;
};
export type SI_VE124975_EngagementPanel={
	panelIdentifier: "engagement-panel-structured-description";
	header: R_EngagementPanelTitleHeader;
	content: R_StructuredDescriptionContent;
	veType: 124975;
	targetId: "engagement-panel-structured-description";
	visibility: "ENGAGEMENT_PANEL_VISIBILITY_HIDDEN";
	identifier?: T_ShortsSurfaceIdentifier<"engagement-panel-structured-description">;
	loggingDirectives: D_LoggingDirectives;
};
export type SI_VE139722_EngagementPanel={
	header: R_EngagementPanelTitleHeader;
	content: R_SectionList;
	veType: 139722;
	targetId: SI_VE76278_EngagementPanel["targetId"];
	visibility: "ENGAGEMENT_PANEL_VISIBILITY_HIDDEN";
	continuationService: "ENGAGEMENT_PANEL_CONTINUATION_SERVICE_BROWSE";
	identifier: T_ShortsSurfaceIdentifier<"shorts-comments-panel">;
	loggingDirectives: D_LoggingDirectives;
};
//#endregion
//#region SP_
export type SP_GFeedbackServiceRouteParam={
	key: "route";
	value: D_ChanLoc;
};
export type SP_GFeedbackVarMap={
	browse_id_prefix: "";
	browse_id: DU_Browse_Id;
	context: "yt_web_unknown_form_factor_kevlar_w2w";
	e: string;
	has_alc_entitlement: "false";
	has_unlimited_entitlement: "False";
	has_premium_lite_entitlement: "False";
	ipcc: "0";
	is_alc_surface: "false";
	is_casual: "false";
	is_monetization_enabled: "true";
	is_owner: "false";
	is_viewed_live: "false";
	logged_in: "0"|"1";
	num_shelves: "1";
	premium_membership: "non_member";
};
export type SP_GFeedbackServiceParams=SP_GFeedbackServiceRouteParam|ToKeyValue<SP_GFeedbackVarMap>;
export type SP_GoogleHelpServiceObj={
	browse_id: DU_Browse_Id;
	browse_id_prefix: "";
};
export type SP_GuidedHelp_SPs={
	service: "GUIDED_HELP";
	params: ToKeyValue<SP_GuidedHelpState>[];
};
export type SP_GuidedHelpState={
	logged_in: "0"|"1";
	context: "yt_web_unknown_form_factor_kevlar_w2w";
};
//#endregion
//#region String Union
export type SU_SignalStr=
	|"ENABLE_CHROME_NOTIFICATIONS"
	|"HELP"
	|"HISTORY_BACK"
	|"HISTORY_FORWARD"
	|"SKIP_NAVIGATION"
	|"TOGGLE_TRANSCRIPT_TIMESTAMPS";
//#endregion

export interface S_MapState {
	set_entry(key_pos: number,value_pos: number): void;
}
export type S_VideoGoodPutShape={
	id: string;
	source: string;
	range: string;
	expire: `${number}`;
	ip: string;
	ms: string;
	mm: string;
	pl: string;
	nh: string;
	sparams: string;
	signature: `${string}.${string}`;
	key: string;
};
//#endregion
//#region Signal
export type Signal_GetNotificationsMenu={signal: "GET_NOTIFICATIONS_MENU"; actions: A_LoadingNotificationsMenu[];};
//#endregion
