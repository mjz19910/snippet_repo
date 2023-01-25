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
type D_Video_1={
	descriptionSnippet: R_TextRuns;
	publishedTimeText: G_Text;
	lengthText: G_Text;
	viewCountText: G_Text;
	ownerBadges: RMD_Badge[];
	shortViewCountText: G_Text;
	richThumbnail: R_MovingThumbnail;
	owner: D_Video_Owner;
};
type D_Video_2={
	publishedTimeText: R_SimpleText;
	lengthText: R_SimpleText;
	viewCountText: R_SimpleText;
	shortViewCountText: R_SimpleText;
	owner: D_Video_Owner;
};

type D_Video_3={
	descriptionSnippet: R_TextRuns;
	publishedTimeText: R_SimpleText;
	lengthText: R_SimpleText;
	viewCountText: R_SimpleText;
	shortViewCountText: R_SimpleText;
};

type D_Video_4={
	descriptionSnippet: R_TextRuns;
	publishedTimeText: R_SimpleText;
	lengthText: R_SimpleText;
	viewCountText: R_SimpleText;
	ownerBadges: RMD_Badge[];
	shortViewCountText: R_SimpleText;
	owner: D_Video_Owner;
};

type D_Video_5={
	descriptionSnippet: R_TextRuns;
	publishedTimeText: R_SimpleText;
	lengthText: R_SimpleText;
	viewCountText: R_SimpleText;
	shortViewCountText: R_SimpleText;
	richThumbnail: R_MovingThumbnail;
	owner: D_Video_Owner;
};

type D_Video_6={
	descriptionSnippet: R_TextRuns;
	viewCountText: R_TextRuns;
	badges: RMD_Badge[];
	shortViewCountText: R_TextRuns;
};

type D_Video_7={
	descriptionSnippet: R_TextRuns;
	publishedTimeText: R_SimpleText;
	lengthText: R_SimpleText;
	viewCountText: R_SimpleText;
	shortViewCountText: R_SimpleText;
	topStandaloneBadge: RMD_Badge;
	richThumbnail: R_MovingThumbnail;
};

type D_Video_8={
	descriptionSnippet: R_TextRuns;
	badges: RMD_Badge[];
	owner: D_Video_Owner;
};

type D_Video_Base=D_Video_1|D_Video_2|D_Video_3|D_Video_4|D_Video_5|D_Video_6|D_Video_7|D_Video_8;