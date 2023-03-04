type D_BrowseIdInfo_VL_PL={
	type: "browse_id";
	tag: "VL";
	type_parts: ["browse_id","VL","PL"];
	raw_id: GU_VE5754_PlaylistBrowseId;
}|{
	type: "browse_id";
	tag: "VL";
	type_parts: ["browse_id","VL","UU"];
	raw_id: `VLUU${string}`;
}|{
	type: "browse_id";
	tag: "VL";
	type_parts: ["browse_id","VL"];
	raw_id: "VLLL";
}|{
	type: "browse_id";
	tag: "VL";
	type_parts: ["browse_id","VL"];
	raw_id: "VLWL";
};
type D_BrowseIdInfo_FE={
	type: "browse_id";
	tag: "FE";
	type_parts: ["browse_id","FE"];
	raw_id: G_BrowseIdStr_FE;
};
type D_BrowseIdInfo_SP={
	type: "browse_id";
	tag: "SP";
	type_parts: ["browse_id","SP"];
	raw_id: G_BrowseIdStr_SP;
};
type D_BrowseIdInfo_MP={
	type: "browse_id";
	tag: "MP";
	type_parts: ["browse_id","MP"];
	raw_id: `MP${string}_${string}`;
};
type D_BrowseIdInfo=D_BrowseIdInfo_VL_PL|D_BrowseIdInfo_FE|D_BrowseIdInfo_SP|D_BrowseIdInfo_MP;
