type D_Tab_History={
	selected: true;
	content: R_SectionList;
	tabIdentifier: "FEhistory";
	accessibility: TD_Accessibility<"history">;
	trackingParams: string;
};
type D_Tab_Home={
	endpoint: E_VE3611;
	title: "Home";
	trackingParams: string;
};
type D_Tab_WhatToWatch={
	selected: true;
	content: R_RichGrid;
	tabIdentifier: "FEwhat_to_watch";
	trackingParams: string;
};
type D_Tab_ContentSectionList={
	selected: true;
	content: R_SectionList;
	trackingParams: string;
};
type D_Tab_Subscriptions={
	endpoint: E_VE96368;
	selected: true;
	content: R_SectionList;
	tabIdentifier: "FEsubscriptions";
	accessibility: D_Accessibility;
	trackingParams: string;
};
type D_Tab_ContentMusicQueue={
	content: R_MusicQueue;
	trackingParams: string;
};
type D_Tab_Library={
	endpoint: E_VE6827;
	selected: true;
	content: R_SectionList;
	tabIdentifier: "FElibrary";
	accessibility: TD_Accessibility<"library">;
	trackingParams: string;
};
type D_Tab=D_Tab_Library|D_Tab_Home|D_Tab_WhatToWatch|D_Tab_History|D_Tab_ContentSectionList|D_Tab_Subscriptions|D_Tab_ContentMusicQueue;
