type CompactLinkRendererData={
	title: TextT;
	navigationEndpoint: YtEndpoint;
	trackingParams: string;
	style: CompactLinkStyle;
}|{
	title: TextT;
	navigationEndpoint: YtEndpoint;
}|{
	icon: Icon<"PERSON_ADD">;
	title: TextT;
	navigationEndpoint: YtEndpoint;
	style: CompactLinkStyle;
};