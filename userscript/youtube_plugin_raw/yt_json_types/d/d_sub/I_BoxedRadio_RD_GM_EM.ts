type I_BoxedRadio_RD_GM_EM={
	type: "playlist_id";
	type_parts: ["playlist_id","RD","GM","EM"];
	key: `playlist_id:RD:GM:EM:${string}`;
	info_arr: [{
		type: "RD";
		raw_id: `RDGMEM${string}`;
	},{type: "GM";},{
		type: "EM";
		id: string;
	}];
};
