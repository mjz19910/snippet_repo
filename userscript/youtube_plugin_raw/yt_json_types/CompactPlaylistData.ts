type CompactPlaylistData={
	playlistId: string;
	thumbnail: Thumbnail;
	title: SimpleText;
	shortBylineText: TextWithRuns;
	videoCountText: TextWithRuns;
	navigationEndpoint: WatchEndpoint;
	videoCountShortText: SimpleText;
	trackingParams: string;
	sidebarThumbnails: Thumbnail[];
	thumbnailText: TextWithRuns;
	menu: MenuRenderer;
	shareUrl: string;
	thumbnailRenderer: PlaylistVideoThumbnailRenderer;
	longBylineText: TextWithRuns;
	thumbnailOverlays: {}[];
};
