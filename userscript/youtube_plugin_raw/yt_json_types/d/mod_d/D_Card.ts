type D_Card={
	teaser: R_SimpleCardTeaser;
	content?: D_Card_Content;
	cueRanges: D_CueRangeItem[];
	icon?: R_InfoCardIcon;
	trackingParams: string;
	cardId?: `${bigint}`;
	feature?: "cards";
};