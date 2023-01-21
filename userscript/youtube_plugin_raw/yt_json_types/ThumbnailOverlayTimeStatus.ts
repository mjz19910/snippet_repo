type ThumbnailOverlayTimeStatus={
	text: D$SimpleText;
	style: "DEFAULT";
}|{
	text: D$TextWithRuns;
	style: "LIVE";
	icon: Icon<"LIVE">;
}|{
	text: D$SimpleText;
	style: "SHORTS";
	icon: Icon<"YOUTUBE_SHORTS_FILL_NO_TRIANGLE_RED_16">;
};