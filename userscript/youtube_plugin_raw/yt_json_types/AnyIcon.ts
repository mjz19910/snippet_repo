type AnyIcon=NonNullable<[
	T$Icon<AnyIconStr>,
	D$Button['icon'],
	D$InfoRow['expandIcon'],
	D$TopicLink['callToActionIcon'],
	T$Icon<"LIBRARY_REMOVE">,
	D$ThumbnailOverlayHoverText['icon'],
][number]>;
type MenuServiceIcon=Extract<[
	{icon: T$Icon<"FLAG">;},
	{}
][number],{icon:any}>;
type MenuServiceIconTypeStr=[
	"SUBTITLES",
	"PLAYLIST_ADD",
	"VISIBILITY_OFF",
	"SHARE",
	"ALIGN_LEFT",
][number]|"WATCH_LATER"|"NOT_INTERESTED"|"LIBRARY_ADD"|"LIBRARY_REMOVE"|(MenuServiceIcon['icon']['iconType']);