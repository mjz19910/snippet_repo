type CompactPlaylistData={
	playlistId: string;
	thumbnail: Thumbnail<{}>;
	title: SimpleText;
	shortBylineText: TextT;
	videoCountText: TextT;
	navigationEndpoint: WatchEndpoint;
	videoCountShortText: SimpleText;
	trackingParams: string;
	sidebarThumbnails: Thumbnail<{}>[];
	thumbnailText: TextT;
	menu: MenuRenderer;
	shareUrl: string;
	thumbnailRenderer: PlaylistVideoThumbnailRenderer;
	longBylineText: TextT;
	thumbnailOverlays: {}[];
};
