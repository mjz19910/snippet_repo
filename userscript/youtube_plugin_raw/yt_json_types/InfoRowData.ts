type InfoRowData={
	title: D$SimpleText;
	defaultMetadata?: D$SimpleText;
	expandedMetadata?: D$SimpleText;
	expandIcon?: Icon<"EXPAND">;
	trackingParams: string;
	infoRowExpandStatusKey?: EnumForExpandStatusKey;
};