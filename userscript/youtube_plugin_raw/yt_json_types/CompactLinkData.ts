type CompactLinkData={
	icon: Icon<"PERSON_ADD"|"CREATION_UPLOAD">;
	title: TextT;
	navigationEndpoint: UploadEndpoint|SignalNavigationEndpoint;
	trackingParams: string;
	style: CompactLinkStyle|"COMPACT_LINK_STYLE_TYPE_CREATION_MENU";
};
