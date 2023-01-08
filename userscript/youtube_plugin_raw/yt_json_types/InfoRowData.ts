type InfoRowData={
	title: SimpleText;
	defaultMetadata?: SimpleText;
	expandedMetadata?: SimpleText;
	expandIcon: Icon<"EXPAND">;
	trackingParams: string;
	infoRowExpandStatusKey?: "structured-description-music-section-artists-row-state-id"|"structured-description-music-section-licenses-row-state-id";
};
type EnumForExpandStatusKey=MakeEnum<
"structured-description-music-section",
MakeEnum<"artists","row-state-id">
>;