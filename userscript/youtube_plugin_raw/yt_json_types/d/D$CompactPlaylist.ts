type D_CompactPlaylist={
	playlistId: `PL${string}`;
	thumbnail: D_Thumbnail;
	title: R_SimpleText;
	shortBylineText: R_TextWithRuns;
	videoCountText: R_TextWithRuns;
	navigationEndpoint: E_Watch;
	publishedTimeText?: R_SimpleText;
	videoCountShortText: R_SimpleText;
	trackingParams: string;
	sidebarThumbnails: D_Thumbnail[];
	thumbnailText: R_TextWithRuns;
	ownerBadges?: RMD_Badge[];
	menu: R_Menu;
	shareUrl: `https://www.youtube.com/watch?v=${string}&playnext=1&list=RDCMUC${string}`;
	thumbnailRenderer: R_PlaylistVideoThumbnail;
	longBylineText: R_TextWithRuns;
	thumbnailOverlays: G_ThumbnailOverlayItem[];
};