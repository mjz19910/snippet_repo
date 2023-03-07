//#region Discriminated Object Union
type DE_U_ExternalUrl={url: GU_VE83769_Url_External; target: "TARGET_NEW_WINDOW";};
type DE_U_RedirectUrl={url: `https://www.youtube.com/redirect?${string}`; target: "TARGET_NEW_WINDOW"; nofollow: true;};
type DE_U_InternalUrl={url: GU_InternalUrl; nofollow: true;};
type DE_U_ChannelUrl={url: DU_Str_ChannelUrl; nofollow: true;};
type DE_MutationDelete={type: T_MutType<"DELETE">; entityKey: string; options: O_DU_Persistence;};
type DE_MutationReplace={type: T_MutType<"REPLACE">; entityKey: string; payload: G_EY_Entity;};
//#endregion
