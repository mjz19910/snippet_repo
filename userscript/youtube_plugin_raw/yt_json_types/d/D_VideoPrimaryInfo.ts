type D_VideoPrimaryInfo={
	title: G_Text;
	viewCount: R_VideoViewCount;
	videoActions: R_Menu;
	trackingParams: string;
	updatedMetadataEndpoint?: E_UpdatedMetadata;
	superTitleLink?: G_Text;
	badges?: RMD_Badge[];
	dateText: G_Text;
	relativeDateText?: G_Text;
};
type GM_UpdatedMetadata={
	sendPost: true;
	apiUrl: "/youtubei/v1/updated_metadata";
};
type M_UpdatedMetadata={webCommandMetadata: GM_UpdatedMetadata;};
type E_UpdatedMetadata={
	clickTrackingParams: string;
	commandMetadata: M_UpdatedMetadata|M_UpdatedMetadata;
	updatedMetadataEndpoint: D_VideoId;
};
type D_VideoId={videoId: D_VideoIdStr;};
