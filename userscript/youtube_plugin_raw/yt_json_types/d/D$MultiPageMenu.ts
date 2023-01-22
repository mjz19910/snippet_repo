type D_MultiPageMenu={
	header: R_SimpleMenuHeader;
	sections?: D_MultiPageMenu$sections$items[];
	footer: TR_MultiPageMenuSection<R_CompactLink>;
	style: D_MultiPageMenu$style['style'];
	trackingParams?: string;
	showLoadingSpinner?: true;
};