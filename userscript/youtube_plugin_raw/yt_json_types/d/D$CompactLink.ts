type EG_CompactLink$1=E_UploadEndpoint|E_SignalNavigation;

type D_CompactLink={
	icon: T_Icon<"PERSON_ADD"|"CREATION_UPLOAD">;
	title: G_Text;
	navigationEndpoint?: EG_CompactLink$1;
	trackingParams: string;
	style?: D_CompactLinkStyle;
};