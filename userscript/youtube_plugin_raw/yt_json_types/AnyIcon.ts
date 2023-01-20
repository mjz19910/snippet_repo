type AnyIcon=NonNullable<[
	Icon<AnyIconStr>,
	ButtonData['icon'],
	InfoRowData['expandIcon'],
	TopicLinkData['callToActionIcon'],
	Icon<"LIBRARY_REMOVE">,
	ThumbnailOverlayHoverTextData['icon'],
][number]>;
type MenuServiceIconTypeStr="NOT_INTERESTED"|"LIBRARY_ADD"|"LIBRARY_REMOVE";