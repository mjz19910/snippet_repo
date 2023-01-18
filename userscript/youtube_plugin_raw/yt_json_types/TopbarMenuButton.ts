type TopbarMenuButton={
	icon: Icon<"VIDEO_CALL">;
	menuRenderer: MultiPageMenuRenderer;
	trackingParams: string;
	accessibility: Accessibility;
	tooltip: string;
	style: "STYLE_DEFAULT";
}|{
	avatar: Thumbnail;
	menuRequest: SignalServiceEndpoint;
	trackingParams: string;
	accessibility: Accessibility;
	tooltip: string;
};
