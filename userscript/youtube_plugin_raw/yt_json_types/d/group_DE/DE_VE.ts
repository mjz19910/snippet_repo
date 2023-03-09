//#region DE_VE
type DE_VE<T>={browseId: T;};
type DE_VE3611_BaseUrl=
	|`/@${string}`
	|`/channel/UC${string}`
	;
;
type DE_VE3611={
	params?: string; browseId: T_IdTemplate<"UC",D_UserIdStr>;
	canonicalBaseUrl?: DE_VE3611_BaseUrl;
	query?: string;
};
type DE_VE3854=DE_VE<"FEwhat_to_watch">;
type DE_VE5754=DE_VE<T_IdTemplate<"VL">>|{
	browseId: T_IdTemplate<"VL">;
	canonicalBaseUrl: `/playlist?list=PL${string}`;
};
type DE_VE6827={
	browseId: GU_VE6827_Id;
	params?: string;
	query?: "";
};
type DE_VE11487=DE_VE<"SPunlimited">;
type DE_VE23462=DE_VE<GU_VE23462_Id>;
type DE_VE42352=DE_VE<"FEdownloads">;
type DE_VE96368=DE_VE<"FEsubscriptions">;
//#endregion
