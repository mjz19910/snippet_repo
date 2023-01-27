type R_Omit_Compact_Player={
	title: G_Text;
	trackingParams: string;
	thumbnailOverlays: G_ThumbnailOverlayItem[];
};
type T_Omit_Compact_Player<T extends R_Omit_Compact_Player>=Omit<T,"title"|"trackingParams"|"thumbnailOverlays">;
type R_Omit_Compact_Video=R_Omit_Compact_Player&{
	videoId: string;
	shortViewCountText: G_Text;
	publishedTimeText: G_Text;
};
type T_Omit_Compact_Video<T extends R_Omit_Compact_Video>=Omit<T_Omit_Compact_Player<T>,"videoId"|"shortViewCountText"|"publishedTimeText">;
type R_Omit_Menu_Video={
	thumbnail: R_Thumbnail;
	longBylineText: R_TextRuns;
	viewCountText: G_Text;
	navigationEndpoint: E_Watch;
	shortBylineText: R_TextRuns;
	menu: R_Menu;
};
type R_Omit_Menu_Radio={
	navigationEndpoint: E_Watch;
	menu: R_Menu;
};
type R_Omit_Menu_Video_Ex={
	ownerBadges: RMD_Badge[];
};