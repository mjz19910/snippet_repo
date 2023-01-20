type FusionSearchboxData={
	icon: Icon<"SEARCH">;
	placeholderText: TextWithRuns;
	config: SearchboxConfig;
	trackingParams: string;
	searchEndpoint: E$SearchEndpoint;
	clearButton: ButtonRenderer;
};
