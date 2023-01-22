type D__ThumbnailOverlayToggleButton={
	isToggled: false;
	untoggledIcon: T_Icon<"WATCH_LATER">;
	toggledIcon: T_Icon<"CHECK">;
	untoggledTooltip: "Watch Later";
	toggledTooltip: "Added";
	untoggledServiceEndpoint: PlaylistEditEndpoint;
	toggledServiceEndpoint: PlaylistEditEndpoint;
	untoggledAccessibility: D__Accessibility;
	toggledAccessibility: D__Accessibility;
	trackingParams: string;
}|{
	untoggledIcon: T_Icon<"ADD_TO_QUEUE_TAIL">;
	toggledIcon: T_Icon<"PLAYLIST_ADD_CHECK">;
	untoggledTooltip: "Add to queue";
	toggledTooltip: "Added";
	untoggledServiceEndpoint: E_T$SignalService<Signal$ClientSignal>;
	untoggledAccessibility: D__Accessibility;
	toggledAccessibility: D__Accessibility;
	trackingParams: string;
};;
