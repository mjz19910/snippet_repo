type PlaylistSidebarPrimaryInfo={
	thumbnailRenderer: PlaylistVideoThumbnailRenderer;
	title: TextWithRuns;
	stats: TextWithRuns[];
	menu: MenuRenderer;
	thumbnailOverlays: ThumbnailOverlaySidePanelRenderer[];
	navigationEndpoint: E$WatchEndpoint;
	badges: MetadataBadgeRenderer[];
	description: {};
	showMoreText: TextWithRuns;
};
