import {D_BrowseEndpointPages,D_Settings_Id} from "../../group_D/D.js";
import {D_UserIdStr} from "./DU.js";

//#region Templates
export type T_ChannelIdStr<T extends string>=`UC${T}`;
export type T_FeedEntry<T extends D_BrowseEndpointPages=D_BrowseEndpointPages>=T_IdTemplate<"FE",T>;
export type T_IdTemplate<B extends keyof B_IdTemplateArgs,T extends B_IdTemplateArgs[B]=B_IdTemplateArgs[B]>=`${B}${T}`;
export type B_IdTemplateArgs={
	VL: T_IdTemplate<"PL">|DU_Playlist_Static;
	UC: D_UserIdStr;
	FE: D_BrowseEndpointPages;
	PL: string;
	RD: string;
	RDCMUC: string;
	RDGMEM: string;
	RDMM: string;
	UU: string;
	SP: D_Settings_Id;
	MP: `${string}_${string}`;
};
//#endregion
export type DU_PlaylistId_Base=
	|"PL"
	|"RD"
	|"RDCMUC"
	|"RDGMEM"
	|"RDMM"
	|"UU"
	;
;
//#region DU Template String
export type DU_Browse_Id=T_IdTemplate<"FE">|T_IdTemplate<"VL">|T_IdTemplate<"UC">|T_IdTemplate<"MP">|T_IdTemplate<"SP">;
export type DU_ChannelId=T_IdTemplate<"UC">;
export type DU_GuideEntry_Id=DU_Playlist_Static|T_IdTemplate<"UC">|T_IdTemplate<"PL">|"VLLL";
export type DU_HashtagId=string;
export type DU_Playlist_Id=DU_Playlist_Static|T_IdTemplate<DU_PlaylistId_Base>;
export type DU_Playlist_Radio_Id=T_IdTemplate<Extract<DU_PlaylistId_Base,`RD${string}`>>;
export type DU_Playlist_Static="WL"|"LL";
export type DU_StartRadio=0|1;
//#endregion
