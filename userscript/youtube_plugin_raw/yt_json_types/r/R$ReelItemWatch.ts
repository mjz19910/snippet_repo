type D_ReelItemWatch={
	responseContext: RC$ResponseContext;
	overlay: R_ReelPlayerOverlay;
	status: "REEL_ITEM_WATCH_STATUS_SUCCEEDED";
	trackingParams: string;
	replacementEndpoint?: E_ReelWatchEndpoint;
	sequenceContinuation?: string;
	desktopTopbar: R_DesktopTopbar;
	engagementPanels: G_EngagementPanelItem[];
};