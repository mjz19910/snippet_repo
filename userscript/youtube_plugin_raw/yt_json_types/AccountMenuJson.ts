type AccountMenuResponse={
	responseContext: RC$ResponseContext;
	actions: T$OpenPopup<{}>[];
	trackingParams: string;
};
type T$OpenPopup<T>={
	clickTrackingParams: string;
	openPopupAction: T;
};
type T$AD$OpenPopup$Dialog<T>={
	popup: T;
  popupType: "DIALOG";
};
type T$OpenPopupAction$Dropdown<T>={
	popup: T;
	popupType: "DROPDOWN";
};
type T$OpenPopupAction$Toast<T>={
	popup: T;
	popupType: "TOAST";
};
type BT$OpenPopupAction$TopAligned<T extends string,T_Popup>={
	popup: T_Popup;
	popupType: `TOP_ALIGNED_${T}`;
};
type T$OpenPopupAction$TopAligned$Dialog<T>=BT$OpenPopupAction$TopAligned<"DIALOG",T>;