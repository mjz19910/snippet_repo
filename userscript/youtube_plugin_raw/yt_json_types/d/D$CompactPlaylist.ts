type D__CompactPlaylist={
	playlistId: string;
	thumbnail: D__Thumbnail;
	title: R_SimpleText;
	shortBylineText: R_TextWithRuns;
	videoCountText: R_TextWithRuns;
	navigationEndpoint: E$WatchEndpoint;
	videoCountShortText: R_SimpleText;
	trackingParams: string;
	sidebarThumbnails: D__Thumbnail[];
	thumbnailText: R_TextWithRuns;
	menu: R_Menu;
	shareUrl: string;
	thumbnailRenderer: R_PlaylistVideoThumbnail;
	longBylineText: R_TextWithRuns;
	thumbnailOverlays: {}[];
};