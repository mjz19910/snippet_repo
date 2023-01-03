type CompactLinkRendererData={
	title: YtTextType;
	navigationEndpoint: YtEndpoint;
	trackingParams: string;
	style: CompactLinkStyle;
}|{
	title: YtTextType;
	navigationEndpoint: YtEndpoint;
}|{
	icon: Icon<"PERSON_ADD">;
	title: YtTextType;
	navigationEndpoint: YtEndpoint;
	style: CompactLinkStyle;
};