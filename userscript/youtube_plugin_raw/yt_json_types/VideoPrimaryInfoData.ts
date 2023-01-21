type VideoPrimaryInfoData={
	title: D$TextWithRuns;
	viewCount: VideoViewCountRenderer;
	videoActions: MenuRenderer;
	trackingParams: string;
	superTitleLink?: D$TextWithRuns;
	badges?: MetadataBadgeRenderer[];
	dateText: D$SimpleText;
	relativeDateText: D$SimpleText;
};