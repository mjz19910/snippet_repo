type ReelItemWatch={
	responseContext: ResponseContext;
	overlay: ReelPlayerOverlayRenderer;
	status: "REEL_ITEM_WATCH_STATUS_SUCCEEDED";
	trackingParams: string;
	replacementEndpoint: YtEndpoint;
	sequenceContinuation?: string;
	desktopTopbar: DesktopTopbarRenderer;
	engagementPanels: EngagementPanelItem[];
};