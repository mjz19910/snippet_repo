type D__MultiPageMenu={
	header: R_SimpleMenuHeader;
	sections?: D__MultiPageMenu$sections$items[];
	footer: T$R_MultiPageMenuSection<R_CompactLink>;
	style: D__MultiPageMenu$style['style'];
	trackingParams?: string;
	showLoadingSpinner?: true;
};