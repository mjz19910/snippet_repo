type G_PlaylistUrlInfo_1={
	type: "playlist_id";
	type_parts: ["playlist_id","WL"];
	id: "WL";
};

type G_PlaylistUrlInfo_2={
	type: "playlist_id";
	type_parts: ["playlist_id","LL"];
	id: "LL";
};

type G_PlaylistUrlInfo_RDMM={
	type: "playlist_id";
	type_parts: ["playlist_id","RDMM"];
	id: string;
	raw_id: `RDMM${string}`;
};

type G_PlaylistUrlInfo_RDCM={
	type: "playlist_id";
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

type G_PlaylistUrlInfo_RDGM={
	type: "playlist_id";
	type_parts: ["playlist_id","RDGM","EM"];
	id: `EM${string}`;
	raw_id: `RDGMEM${string}`;
	info_arr: [
		{
			type: "RDGM";
			raw_id: `RDGMEM${string}`;
		},
		{
			type: "EM";
			id: string;
			raw_id: `EM${string}`;
		}
	];
};

type G_PlaylistUrlInfo_RD={
	type: "playlist_id";
	type_parts: ["playlist_id","RD"];
	id: string;
	raw_id: `RD${string}`;
};

type G_PlaylistUrlInfo_PL={
	type: "playlist_id";
	type_parts: ["playlist_id","PL"];
	id: string;
	raw_id: `PL${string}`;
};

type G_PlaylistUrlInfo_UU={
	type: "playlist_id";
	type_parts: ["playlist_id","UU"];
	id: string;
	raw_id: `UU${string}`;
};

type G_PlaylistUrlInfo=
	|G_PlaylistUrlInfo_1
	|G_PlaylistUrlInfo_2
	|G_PlaylistUrlInfo_RDMM
	|G_PlaylistUrlInfo_RDCM
	|G_PlaylistUrlInfo_RDGM
	|G_PlaylistUrlInfo_RD
	|G_PlaylistUrlInfo_PL
	|G_PlaylistUrlInfo_UU
	;
;
