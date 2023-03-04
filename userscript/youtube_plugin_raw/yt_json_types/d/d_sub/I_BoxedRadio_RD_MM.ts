type I_BoxedRadio_RD_MM={
	type: "playlist_id";
	type_parts: ["playlist_id","RD","MM"];
	key: `playlist_id:RD:MM:${string}`;
	info_arr: [{
		type: "RD";
		raw_id: `RDMM${string}`;
	},{
		type: "MM";
		id: string;
	}];
};
