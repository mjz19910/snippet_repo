type RSW_ReelItem={
	responseContext: RC_ResponseContext;
	overlay: R_ReelPlayerOverlay;
	status: "REEL_ITEM_WATCH_STATUS_SUCCEEDED";
	trackingParams: string;
	replacementEndpoint?: E_ReelWatch;
	sequenceContinuation?: string;
	desktopTopbar: R_DesktopTopbar;
	engagementPanels: R_EngagementPanelSectionList[];
};