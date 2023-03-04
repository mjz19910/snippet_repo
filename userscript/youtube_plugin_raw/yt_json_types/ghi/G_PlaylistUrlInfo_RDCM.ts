type G_PlaylistUrlInfo_RDCM={
	type: "playlist_id";
	tag: "RDCM";
	type_parts: ["playlist_id","RDCM","UC"];
	info_arr: [
		{
			type: "RDCM";
			raw_id: `RDCMUC${string}`;
		},
		{
			type: "UC";
			id: string;
			raw_id: `UC${string}`;
		}
	];
};
