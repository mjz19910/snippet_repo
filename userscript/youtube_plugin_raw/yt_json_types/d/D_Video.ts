type D_Video={
	videoId: /**/string;
	thumbnail: /**/D_Thumbnail;
	title: /**/R_TextRuns;
	descriptionSnippet?: R_TextRuns;
	longBylineText: /**/R_TextRuns;
	publishedTimeText?: R_SimpleText;
	lengthText?: R_SimpleText;
	viewCountText?: R_TextRuns;
	navigationEndpoint: /**/E_Watch;
	ownerBadges?: RMD_Badge[];
	badges?: RMD_Badge[];
	ownerText: /**/R_TextRuns;
	shortBylineText: /**/R_TextRuns;
	trackingParams: /**/string;
	showActionMenu: /**/false;
	shortViewCountText?: R_TextRuns;
	menu: /**/R_Menu;
	channelThumbnailSupportedRenderers: /**/R_ChannelThumbnailWithLink;
	thumbnailOverlays: /**/G_ThumbnailOverlayItem[];
	richThumbnail?: R_MovingThumbnail;
	inlinePlaybackEndpoint: /**/E_Watch;
	owner?: D_Video_Owner;
};