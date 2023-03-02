type D_VideoInfoCardContent={
	videoThumbnail: D_Thumbnail;
	lengthString: G_Text;
	videoTitle: G_Text;
	channelName: G_Text;
	viewCountText: G_Text;
	action: E_Watch;
	trackingParams: string;
};
type R_VideoInfoCardContent={videoInfoCardContentRenderer: D_VideoInfoCardContent;};
