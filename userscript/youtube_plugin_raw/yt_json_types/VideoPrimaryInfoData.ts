type VideoPrimaryInfoData={
	title: D$TextWithRuns;
	viewCount: VideoViewCountRenderer;
	videoActions: R$Menu;
	trackingParams: string;
	superTitleLink?: D$TextWithRuns;
	badges?: R$MetadataBadgeRenderer[];
	dateText: D$SimpleText;
	relativeDateText: D$SimpleText;
};