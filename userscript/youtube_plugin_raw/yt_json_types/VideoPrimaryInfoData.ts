type VideoPrimaryInfoData={
	title: D$TextWithRuns;
	viewCount: VideoViewCountRenderer;
	videoActions: R$MenuRenderer;
	trackingParams: string;
	superTitleLink?: D$TextWithRuns;
	badges?: R$MetadataBadgeRenderer[];
	dateText: D$SimpleText;
	relativeDateText: D$SimpleText;
};