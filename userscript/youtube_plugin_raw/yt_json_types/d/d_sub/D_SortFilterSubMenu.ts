type D_ActionSetPlaylistVideoOrder={
	title: string;
	selected: boolean;
	continuation?: CD_Reload;
	serviceEndpoint?: C_Continuation;
	accessibility?: D_Accessibility;
	trackingParams: string;
};
type D_SubMenuItem={
	title: "Top chat replay";
	selected: boolean;
	continuation: D_ReloadContinuationData;
	accessibility: TD_Accessibility<"Top chat replay">;
	subtitle: "Some messages, such as potential spam, may not be visible";
	trackingParams: string;
};
type D_SortFilterSubMenu={
	subMenuItems: D_ActionSetPlaylistVideoOrder[];
	title?: string;
	icon?: T_Icon<"SORT">;
	accessibility?: D_Accessibility;
	tooltip?: string;
	trackingParams: string;
}|{
	subMenuItems: D_SubMenuItem[];
	accessibility: TD_Accessibility<"Live Chat mode selection">;
	trackingParams: string;
	targetId: "live-chat-view-selector-sub-menu";
};
