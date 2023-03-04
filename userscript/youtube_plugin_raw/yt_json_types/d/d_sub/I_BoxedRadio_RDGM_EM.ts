type I_BoxedRadio_RDGM_EM={
	type: "playlist_id";
	type_parts: ["playlist_id","RDGM","EM"];
	key: `playlist_id:RDGM:EM:${string}`;
	info_arr: [{
		type: "RDGM";
		raw_id: `RDGMEM${string}`;
	},{
		type: "EM";
		id: string;
	}];
};
