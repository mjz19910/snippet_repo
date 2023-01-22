type D$ThumbnailOverlayToggleButton={
	isToggled: false;
	untoggledIcon: T$Icon<"WATCH_LATER">;
	toggledIcon: T$Icon<"CHECK">;
	untoggledTooltip: "Watch Later";
	toggledTooltip: "Added";
	untoggledServiceEndpoint: PlaylistEditEndpoint;
	toggledServiceEndpoint: PlaylistEditEndpoint;
	untoggledAccessibility: A$Accessibility;
	toggledAccessibility: A$Accessibility;
	trackingParams: string;
}|{
	untoggledIcon: T$Icon<"ADD_TO_QUEUE_TAIL">;
	toggledIcon: T$Icon<"PLAYLIST_ADD_CHECK">;
	untoggledTooltip: "Add to queue";
	toggledTooltip: "Added";
	untoggledServiceEndpoint: E$SignalServiceEndpoint;
	untoggledAccessibility: A$Accessibility;
	toggledAccessibility: A$Accessibility;
	trackingParams: string;
};;
