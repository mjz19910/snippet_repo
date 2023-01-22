type D$CompactPlaylist={
	playlistId: string;
	thumbnail: D$Thumbnail;
	title: R$SimpleText;
	shortBylineText: R$TextWithRuns;
	videoCountText: R$TextWithRuns;
	navigationEndpoint: E$WatchEndpoint;
	videoCountShortText: R$SimpleText;
	trackingParams: string;
	sidebarThumbnails: D$Thumbnail[];
	thumbnailText: R$TextWithRuns;
	menu: R$Menu;
	shareUrl: string;
	thumbnailRenderer: R$PlaylistVideoThumbnail;
	longBylineText: R$TextWithRuns;
	thumbnailOverlays: {}[];
};