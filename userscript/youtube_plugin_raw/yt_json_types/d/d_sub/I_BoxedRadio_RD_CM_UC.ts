type I_BoxedRadio_RD_CM_UC={
	type: "playlist_id";
	type_parts: ["playlist_id","RD","CM","UC"];
	id: `UC${string}`;
	raw_id: `RDCMUC${string}`;
	info_arr: [{
		type: "RD";
		raw_id: `RDCMUC${string}`;
	},{type: "CM";},{
		type: "UC";
		id: string;
	}];
};
