type DSS_Browse_MP={
	a: "SS:D"; b: "boxed_id"; j: "browse_id:MP";
	key: `boxed_id:browse_id:MP:${string}`;
	w: "/key/a/b/j/z";
	z: [DI_BrowseId_MP];
};
type DSS_Browse_FE={
	a: "SS:D"; b: "boxed_id"; j: "browse_id:FE";
	key: `boxed_id:browse_id:FE:${DI_BrowseId_FE["z"][1]["z"][0]["z"][0]}`;
	w: "/key/a/b/j/z";
	z: [DI_BrowseId_FE];
};