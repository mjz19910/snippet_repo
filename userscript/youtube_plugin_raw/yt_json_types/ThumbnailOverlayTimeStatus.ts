type ThumbnailOverlayTimeStatus={
	text: SimpleText;
	style: "DEFAULT";
}|{
	text: TextWithRuns;
	style: "LIVE";
	icon: Icon<"LIVE">;
}|{
	text: SimpleText;
	style: "SHORTS";
	icon: Icon<"YOUTUBE_SHORTS_FILL_NO_TRIANGLE_RED_16">;
};