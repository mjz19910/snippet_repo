type D_Video={
	videoId: /**/string;
	thumbnail: /**/R_Thumbnail;
	title: /**/G_Text;
	descriptionSnippet?: G_Text;
	longBylineText: /**/G_Text;
	publishedTimeText?: G_Text;
	lengthText?: G_Text;
	viewCountText?: G_Text;
	navigationEndpoint: /**/E_Watch;
	ownerBadges?: RMD_Badge[];
	badges?: RMD_Badge[];
	ownerText: /**/G_Text;
	upcomingEventData?: D_UpcomingEvent;
	shortBylineText: /**/G_Text;
	trackingParams: /**/string;
	showActionMenu: /**/false;
	shortViewCountText?: G_Text;
	isWatched?: true;
	menu: /**/R_Menu;
	channelThumbnailSupportedRenderers: /**/R_ChannelThumbnailWithLink;
	thumbnailOverlays: /**/G_ThumbnailOverlayItem[];
	topStandaloneBadge?: RMD_Badge;
	richThumbnail?: R_MovingThumbnail;
	inlinePlaybackEndpoint?: E_Watch;
	owner?: D_Video_Owner;
	buttons?: R_ToggleButton[];
};