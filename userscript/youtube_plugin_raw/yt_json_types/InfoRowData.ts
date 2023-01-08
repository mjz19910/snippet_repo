type InfoRowData={
	title: SimpleText;
	defaultMetadata?: SimpleText;
	expandedMetadata?: SimpleText;
	expandIcon?: Icon<"EXPAND">;
	trackingParams: string;
	infoRowExpandStatusKey?: EnumForExpandStatusKey;
};