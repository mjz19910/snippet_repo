type D$ToggleMenuServiceItem={
	defaultText: D$TextWithRuns;
	defaultIcon: Icon<"LIBRARY_ADD">;
	defaultServiceEndpoint: E$LikeEndpoint;
	toggledText: D$TextWithRuns;
	toggledIcon: Icon<"LIBRARY_REMOVE">;
	toggledServiceEndpoint: E$LikeEndpoint;
	trackingParams: string;
	isToggled: boolean;
};
