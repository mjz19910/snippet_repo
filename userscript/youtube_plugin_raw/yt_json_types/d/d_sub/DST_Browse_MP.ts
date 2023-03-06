type DSS_ABJ_Browse_MP={
	a: "K:ABJ"; b: "boxed_id"; j: "browse_id:MP";
	key: `boxed_id:browse_id:MP:${string}`;
	z: [DI_BrowseId_MP];
};
type DSS_Browse_FE={
	a: "K:ABJ"; b: "boxed_id"; j: "browse_id:FE";
	key: `boxed_id:browse_id:FE:${DI_BrowseId_FE["z"][1]["z"][0]["z"][0]}`;
	z: [DI_BrowseId_FE];
};