type D_CompactLink={
	icon: T_Icon<"CREATION_POST">;
	title: G_Text;
	navigationEndpoint: E_VE3611;
	trackingParams: string;
	style: "COMPACT_LINK_STYLE_TYPE_CREATION_MENU";
}|{
	title: G_Text;
	navigationEndpoint: E_Url;
	trackingParams: string;
	style: "COMPACT_LINK_STYLE_TYPE_HISTORY_MY_ACTIVITY_LINK";
}|{
	icon: T_Icon<"PERSON_ADD">;
	title: G_Text;
	trackingParams: string;
}|{
	title: G_Text;
	navigationEndpoint: E_VE23462;
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
