type D_MP_Menu={
	header: R_SimpleMenuHeader;
	sections?: D_MP_Menu$sections$items[];
	footer: TR_MP_MenuSection<R_CompactLink>;
	style: D_MP_Menu$style['style'];
	trackingParams?: string;
	showLoadingSpinner?: true;
};