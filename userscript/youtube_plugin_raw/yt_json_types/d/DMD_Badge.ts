type DMD_Badge=(DMD_Badge_<"CHECK_CIRCLE_THICK">&{
	style: "BADGE_STYLE_TYPE_VERIFIED";
	tooltip: "Verified";
	trackingParams: string;
	accessibilityData: D_Label;

})|(DMD_Badge_<"LIVE">&{
	style: "BADGE_STYLE_TYPE_LIVE_NOW";
	label: "LIVE";
	trackingParams: string;
})|{
	style: "BADGE_STYLE_TYPE_COLLECTION";
	label: string;
	trackingParams: string;
}|{
	icon: T_Icon<"OFFICIAL_ARTIST_BADGE">;
	style: "BADGE_STYLE_TYPE_VERIFIED_ARTIST";
	tooltip: "Official Artist Channel";
	trackingParams: string;
	accessibilityData: TD_Label<"Official Artist Channel">;
}|{
	style: "BADGE_STYLE_TYPE_YPC";
	label: "Fundraiser";
	trackingParams: string;
};
type DMD_Badge_<T extends string>={
	icon: T_Icon<T>;
};