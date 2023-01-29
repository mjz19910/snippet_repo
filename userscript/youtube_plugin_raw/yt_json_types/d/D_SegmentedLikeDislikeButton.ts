type D_SegmentedLikeDislikeButton={
	likeButton: R_ToggleButton;
	dislikeButton: R_ToggleButton;
}|{
	style: "STYLE_DEFAULT";
	size: "SIZE_DEFAULT";
	isDisabled: false;
	text: D_Text;
	serviceEndpoint: SE_ShareEntity;
	icon: T_Icon<"SHARE">;
	tooltip: "Share";
	trackingParams: string;
	accessibilityData: D_Accessibility;
};