//#region DE_VE
export type DE_VE<T>={browseId: T;};
export type DE_VE3611_BaseUrl=
	|`/@${string}`
	|`/channel/UC${string}`
	;
;
export type DE_VE3611={
	params?: string; browseId: T_IdTemplate<"UC",D_UserIdStr>;
	canonicalBaseUrl?: DE_VE3611_BaseUrl;
	query?: string;
};
export type DE_VE3854=DE_VE<"FEwhat_to_watch">;
export type DE_VE5754=DE_VE<T_IdTemplate<"VL">>|{
	browseId: T_IdTemplate<"VL">;
	canonicalBaseUrl: `/playlist?list=PL${string}`;
};
export type DE_VE6827={
	browseId: GU_VE6827_Id;
	params?: string;
	query?: "";
};
export type DE_VE11487=DE_VE<"SPunlimited">;
export type DE_VE23462=DE_VE<GU_VE23462_Id>;
export type DE_VE42352=DE_VE<"FEdownloads">;
export type DE_VE96368=DE_VE<"FEsubscriptions">;
//#endregion
