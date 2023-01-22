type AnyIcon=NonNullable<[
	T$Icon<AnyIconStr>,
	D__Button['icon'],
	D__InfoRow['expandIcon'],
	D__TopicLink['callToActionIcon'],
	T$Icon<"LIBRARY_REMOVE">,
	D__ThumbnailOverlayHoverText['icon'],
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