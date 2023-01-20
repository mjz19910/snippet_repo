type MetadataBadgeData={
	icon: Icon<"PRIVACY_UNLISTED">;
	style: "BADGE_STYLE_TYPE_SIMPLE";
	label: "Unlisted";
	tooltip?: string;
	trackingParams: string;
	accessibilityData?: LabelData;
}|{
	style: "BADGE_STYLE_TYPE_SHORTS_PLAYER";
	label: "Includes paid promotion";
	trackingParams: string;
	accessibilityData: LabelData
};