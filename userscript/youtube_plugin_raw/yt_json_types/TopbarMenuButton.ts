type TopbarMenuButton={
	icon: Icon<"VIDEO_CALL">;
	menuRenderer: MultiPageMenuRenderer;
	trackingParams: string;
	accessibility: A$Accessibility;
	tooltip: string;
	style: "STYLE_DEFAULT";
}|{
	avatar: Thumbnail;
	menuRequest: E$SignalServiceEndpoint;
	trackingParams: string;
	accessibility: A$Accessibility;
	tooltip: string;
};
