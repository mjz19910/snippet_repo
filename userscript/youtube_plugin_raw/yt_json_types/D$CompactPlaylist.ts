type D$CompactPlaylist={
	playlistId: string;
	thumbnail: D$Thumbnail;
	title: D$SimpleText;
	shortBylineText: D$TextWithRuns;
	videoCountText: D$TextWithRuns;
	navigationEndpoint: E$WatchEndpoint;
	videoCountShortText: D$SimpleText;
	trackingParams: string;
	sidebarThumbnails: D$Thumbnail[];
	thumbnailText: D$TextWithRuns;
	menu: R$Menu;
	shareUrl: string;
	thumbnailRenderer: R$PlaylistVideoThumbnail;
	longBylineText: D$TextWithRuns;
	thumbnailOverlays: {}[];
};