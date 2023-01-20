type AnyIcon=NonNullable<[
	Icon<AnyIconStr>,
	ButtonData['icon'],
	InfoRowData['expandIcon'],
	TopicLinkData['callToActionIcon'],
	Extract<MenuServiceItemData,{icon:any}>['icon'],
	ThumbnailOverlayHoverTextData['icon'],
][number]>;