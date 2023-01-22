type E_CompactLink$navigationEndpoint=E_UploadEndpoint|E_SignalNavigation;

type D__CompactLink={
	icon: T_Icon<"PERSON_ADD"|"CREATION_UPLOAD">;
	title: G_Text;
	navigationEndpoint?: E_CompactLink$navigationEndpoint;
	trackingParams: string;
	style?: D_CompactLinkStyle;
};