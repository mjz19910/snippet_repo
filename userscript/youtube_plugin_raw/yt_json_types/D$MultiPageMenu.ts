type D$MultiPageMenu={
	header: R$SimpleMenuHeader;
	sections?: D$MultiPageMenu$sections$items[];
	footer: T$R$MultiPageMenuSection<R$CompactLink>;
	style: D$MultiPageMenu$style['style'];
	trackingParams?: string;
	showLoadingSpinner?: true;
};