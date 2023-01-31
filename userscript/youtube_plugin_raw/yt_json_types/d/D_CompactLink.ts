type EG_CompactLink$1=E_Upload|E_SignalNavigation;

type D_CompactLink={
	icon: T_Icon<"PERSON_ADD">;
	title: G_Text;
	trackingParams: string;
}|{
	title: G_Text;
	navigationEndpoint: GE_Browse;
	trackingParams: string;
	style: "COMPACT_LINK_STYLE_TYPE_SETTINGS_SIDEBAR";
}|{
	icon: T_Icon<"CREATION_UPLOAD">;
	title: G_Text;
	navigationEndpoint: E_Upload;
	trackingParams: string;
	style: "COMPACT_LINK_STYLE_TYPE_CREATION_MENU";
}|{
	icon: T_Icon<"CREATION_LIVE">;
	title: G_Text;
	navigationEndpoint: E_SignalNavigation;
	trackingParams: string;
	style: "COMPACT_LINK_STYLE_TYPE_CREATION_MENU";
};