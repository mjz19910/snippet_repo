type R_Omit_Compact_Player={
	title: R_TextRuns;
	trackingParams: string;
	thumbnailOverlays: G_ThumbnailOverlayItem[];
};
type T_Omit_Compact_Player<T extends R_Omit_Compact_Player>=Omit<T,"title"|"trackingParams"|"thumbnailOverlays">;
type R_Omit_Compact_Video=R_Omit_Compact_Player&{
	videoId: string;
	shortViewCountText: R_TextRuns;
	publishedTimeText: R_TextRuns;
};
type T_Omit_Compact_Video<T extends R_Omit_Compact_Video>=Omit<T_Omit_Compact_Player<T>,"videoId"|"shortViewCountText"|"publishedTimeText">;
type R_Omit_Menu_Video={
	thumbnail: D_Thumbnail;
	longBylineText: R_TextRuns;
	lengthText: R_TextRuns;
	viewCountText: R_TextRuns;
	navigationEndpoint: E_Watch;
	ownerBadges: RMD_Badge[];
	shortBylineText: R_TextRuns;
	menu: R_Menu;
	richThumbnail: R_MovingThumbnail;
};