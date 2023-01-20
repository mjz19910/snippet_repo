type ThumbnailOverlayResumePlayback={
	percentDurationWatched: Percent;
};
type Percent=[
	10|100,
][number];
type tz<T extends (any[]|undefined)>=NonNullable<T>[number];