type AnyIcon=NonNullable<[
	Icon<AnyIconStr>,
	ButtonData['icon'],
	InfoRowData['expandIcon'],
	TopicLinkData['callToActionIcon'],
	MenuServiceItemData['icon'],
][number]>;