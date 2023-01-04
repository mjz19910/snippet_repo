type ReelItemWatch={
	responseContext: ResponseContext;
	overlay: ReelPlayerOverlayRenderer;
	status: "REEL_ITEM_WATCH_STATUS_SUCCEEDED";
	trackingParams: string;
	replacementEndpoint: YtEndpoint;
	desktopTopbar: DesktopTopbarRenderer;
	engagementPanels: EngagementPanelItem[];
};