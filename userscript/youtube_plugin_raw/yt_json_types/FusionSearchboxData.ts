type FusionSearchboxData={
	icon: Icon<"SEARCH">;
	placeholderText: TextWithRuns;
	config: SearchboxConfig;
	trackingParams: string;
	searchEndpoint: E_SearchEndpoint;
	clearButton: ButtonRenderer;
};
