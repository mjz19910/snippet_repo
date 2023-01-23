type D_CompactPlaylist={
	playlistId: string;
	thumbnail: D_Thumbnail;
	title: R_SimpleText;
	shortBylineText: R_TextWithRuns;
	videoCountText: R_TextWithRuns;
	navigationEndpoint: E_Watch;
	videoCountShortText: R_SimpleText;
	trackingParams: string;
	sidebarThumbnails: D_Thumbnail[];
	thumbnailText: R_TextWithRuns;
	ownerBadges?: R_MetadataBadge[];
	menu: R_Menu;
	shareUrl: string;
	thumbnailRenderer: R_PlaylistVideoThumbnail;
	longBylineText: R_TextWithRuns;
	thumbnailOverlays: {}[];
};
type D_CompactPlaylist$PublishedTimeText={
	publishedTimeText: R_SimpleText;
};