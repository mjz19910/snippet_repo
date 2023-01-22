type D$ReelItemWatch={
	responseContext: RC$ResponseContext;
	overlay: R$ReelPlayerOverlay;
	status: "REEL_ITEM_WATCH_STATUS_SUCCEEDED";
	trackingParams: string;
	replacementEndpoint?: E$ReelWatchEndpoint;
	sequenceContinuation?: string;
	desktopTopbar: R$DesktopTopbar;
	engagementPanels: EngagementPanelItem[];
};