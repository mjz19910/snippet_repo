type AnyIcon=NonNullable<[
	Icon<AnyIconStr>,
	ButtonData['icon'],
	InfoRowData['expandIcon'],
	TopicLinkData['callToActionIcon'],
	Icon<"LIBRARY_REMOVE">,
	ThumbnailOverlayHoverTextData['icon'],
][number]>;
type MenuServiceIcon=Extract<[
	{icon: Icon<"FLAG">;},
	{}
][number],{icon:any}>;
type MenuServiceIconTypeStr=[
	"PLAYLIST_ADD",
	"VISIBILITY_OFF",
	"SHARE",
	"ALIGN_LEFT",
][number]|"WATCH_LATER"|"NOT_INTERESTED"|"LIBRARY_ADD"|"LIBRARY_REMOVE"|(MenuServiceIcon['icon']['iconType']);