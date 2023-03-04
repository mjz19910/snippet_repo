type D_PlaylistInfo_RD_CM_UC={
	type: "playlist_id";
	tag: "RD";
	type_parts: ["playlist_id","RD","CM","UC"];
	info_arr: [
		{
			type: "RD";
			raw_id: `RDCMUC${string}`;
		},
		{type: "CM";},
		{
			type: "UC";
			id: string;
			raw_id: `UC${string}`;
		}
	];
};
