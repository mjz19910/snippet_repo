type DMD_Badge=(DMD_Badge_<"CHECK_CIRCLE_THICK">&{
	style: "BADGE_STYLE_TYPE_VERIFIED";
	tooltip: string;
	trackingParams: string;
	accessibilityData: D_Label;

})|(DMD_Badge_<"LIVE">&{
	style: "BADGE_STYLE_TYPE_LIVE_NOW";
	label: "LIVE";
	trackingParams: string;
});
type DMD_Badge_<T extends string>={
	icon: T_Icon<T>;
};