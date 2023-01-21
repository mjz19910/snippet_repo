type CompactPlaylistData={
	playlistId: string;
	thumbnail: Thumbnail;
	title: D$SimpleText;
	shortBylineText: D$TextWithRuns;
	videoCountText: D$TextWithRuns;
	navigationEndpoint: E$WatchEndpoint;
	videoCountShortText: D$SimpleText;
	trackingParams: string;
	sidebarThumbnails: Thumbnail[];
	thumbnailText: D$TextWithRuns;
	menu: MenuRenderer;
	shareUrl: string;
	thumbnailRenderer: PlaylistVideoThumbnailRenderer;
	longBylineText: D$TextWithRuns;
	thumbnailOverlays: {}[];
};
