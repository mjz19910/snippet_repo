type D__MultiPageMenu={
	header: R$SimpleMenuHeader;
	sections?: D__MultiPageMenu$sections$items[];
	footer: T$R$MultiPageMenuSection<R$CompactLink>;
	style: D__MultiPageMenu$style['style'];
	trackingParams?: string;
	showLoadingSpinner?: true;
};