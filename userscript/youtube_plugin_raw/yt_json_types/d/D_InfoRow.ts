type D_InfoRow={
	title: R_SimpleText;
	defaultMetadata?: R_SimpleText;
	expandedMetadata?: R_SimpleText;
	expandIcon?: T_Icon<"EXPAND">;
	trackingParams: string;
	infoRowExpandStatusKey?: DE_ExpandStatusKey;
};