type D_ChildVideo={
	title: D_Text;
	navigationEndpoint: E_Watch;
	lengthText: D_Text;
	videoId: string;
};
type R_ChildVideo_Omit={
	title: D_Text;
	navigationEndpoint: E_Watch;
	lengthText: D_Text;
	videoId: string;
};
type D_ThumbnailOverlay_Omit_Keys=[
	"thumbnailOverlays",
	"trackingParams",
	"shortViewCountText",
	"menu",
	"title",
	"videoId",
	"navigationEndpoint",
	"thumbnail",
	"longBylineText",
	"viewCountText",
	"shortBylineText",
][number];
type D_Video_Omit_Keys=D_ThumbnailOverlay_Omit_Keys|[
	"ownerText",
	"showActionMenu",
	"channelThumbnailSupportedRenderers",
	"inlinePlaybackEndpoint",
][number];
type D_Video_Omit_Owner_Keys=D_ThumbnailOverlay_Omit_Keys|"owner";