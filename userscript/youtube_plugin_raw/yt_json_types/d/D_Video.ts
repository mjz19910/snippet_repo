type MakeVideoAlt<T extends {}>=T&D_Video_Base_Check;
type D_Video_Base_Check={
	videoId: /**/string;
	thumbnail: /**/D_Thumbnail;
	title: /**/R_TextRuns;
	longBylineText: /**/R_TextRuns;
	navigationEndpoint: /**/E_Watch;
	ownerText: /**/R_TextRuns;
	shortBylineText: /**/R_TextRuns;
	trackingParams: /**/string;
	showActionMenu: /**/false;
	menu: /**/R_Menu;
	channelThumbnailSupportedRenderers: /**/R_ChannelThumbnailWithLink;
	thumbnailOverlays: /**/G_ThumbnailOverlayItem[];
	inlinePlaybackEndpoint: /**/E_Watch;
};
type D_Video=MakeVideoAlt<D_Video_Base>;
type D_Video_Base={
	descriptionSnippet: R_TextRuns;
	publishedTimeText: R_TextRuns;
	lengthText: R_TextRuns;
	viewCountText: R_TextRuns;
	ownerBadges: RMD_Badge[];
	shortViewCountText: R_TextRuns;
	richThumbnail: R_MovingThumbnail;
	owner: D_Video_Owner;
}|{
	publishedTimeText: R_SimpleText;
	lengthText: R_SimpleText;
	viewCountText: R_SimpleText;
	shortViewCountText: R_SimpleText;
	owner: D_Video_Owner;
}|{
	descriptionSnippet: R_TextRuns;
	publishedTimeText: R_SimpleText;
	lengthText: R_SimpleText;
	viewCountText: R_SimpleText;
	shortViewCountText: R_SimpleText;
}|{
	descriptionSnippet: R_TextRuns;
	publishedTimeText: R_SimpleText;
	lengthText: R_SimpleText;
	viewCountText: R_SimpleText;
	ownerBadges: RMD_Badge[];
	shortViewCountText: R_SimpleText;
	owner: D_Video_Owner;
}|{
	descriptionSnippet: R_TextRuns;
	publishedTimeText: R_SimpleText;
	lengthText: R_SimpleText;
	viewCountText: R_SimpleText;
	shortViewCountText: R_SimpleText;
	richThumbnail: R_MovingThumbnail;
	owner: D_Video_Owner;
}|{
	descriptionSnippet: R_TextRuns;
	viewCountText: R_TextRuns;
	badges: RMD_Badge[];
	shortViewCountText: R_TextRuns;
}|{
	descriptionSnippet: R_TextRuns;
	publishedTimeText: R_SimpleText;
	lengthText: R_SimpleText;
	viewCountText: R_SimpleText;
	shortViewCountText: R_SimpleText;
	topStandaloneBadge: RMD_Badge;
	richThumbnail: R_MovingThumbnail;
};