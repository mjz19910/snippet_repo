//#region Discriminated Unions
type DU_ExternalUrl={url: GU_VE83769_Url_External;target: "TARGET_NEW_WINDOW";};
type DU_RedirectUrl={url: `https://www.youtube.com/redirect?${string}`;target: "TARGET_NEW_WINDOW";nofollow: true;};
type DU_D_EntityMutationItem=DU_MutationReplace|DU_MutationDelete;
type DU_Url=DU_RedirectUrl|DU_ExternalUrl;
type DU_MutationDelete={type: T_MutType<"DELETE">; entityKey: string; options: O_DU_Persistence;};
type DU_MutationReplace={type: T_MutType<"REPLACE">; entityKey: string; payload: G_EY_Entity;};
//#endregion
//#region Partial Objects from Discriminated Unions
type DE_MutationItem=T_UnionToPartial<DU_D_EntityMutationItem>;
//#endregion
//#region Discriminated String Unions
type DU_SignalStr=
	|"ENABLE_CHROME_NOTIFICATIONS"
	|"HELP"
	|"HISTORY_BACK"
	|"HISTORY_FORWARD"
	|"SKIP_NAVIGATION"
	|"TOGGLE_TRANSCRIPT_TIMESTAMPS"
	;
;
//#endregion
