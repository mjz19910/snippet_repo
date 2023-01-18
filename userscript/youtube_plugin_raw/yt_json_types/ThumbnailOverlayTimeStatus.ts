type ThumbnailOverlayTimeStatus={
	text: SimpleText;
	style: "DEFAULT";
}|{
	text: TextWithRuns;
	style: "LIVE";
	icon: Icon<"LIVE">;
};