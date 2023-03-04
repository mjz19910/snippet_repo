type G_PlaylistUrlInfo={
	type: "playlist_id";
	type_parts: ["playlist_id","WL"];
	id: "WL";
}|{
	type: "playlist_id";
	type_parts: ["playlist_id","LL"];
	id: "LL";
}|{
	type: "playlist_id";
	type_parts: ["playlist_id","RDMM"];
	id: string;
	raw_id: `RDMM${string}`;
}|{
	type: "playlist_id";
	type_parts: ["playlist_id","RDCM","UC"];
	info_arr: [{
		type: "RDCM";
		raw_id: `RDCMUC${string}`;
	},{
		type: "UC";
		id: string;
		raw_id: `UC${string}`;
	}];
}|{
	type: "playlist_id";
	type_parts: ["playlist_id","RDGM","EM"];
	id: `EM${string}`;
	raw_id: `RDGMEM${string}`;
	info_arr: [{
		type: "RDGM";
		raw_id: `RDGMEM${string}`;
	},{
		type: "EM";
		id: string;
		raw_id: `EM${string}`;
	}];
}|{
	type: "playlist_id";
	type_parts: ["playlist_id","RD"];
	id: string; raw_id: `RD${string}`;
}|{
	type: "playlist_id";
	type_parts: ["playlist_id","PL"];
	id: string;
	raw_id: `PL${string}`;
}|{
	type: "playlist_id";
	type_parts: ["playlist_id","UU"];
	id: string;
	raw_id: `UU${string}`;
};
