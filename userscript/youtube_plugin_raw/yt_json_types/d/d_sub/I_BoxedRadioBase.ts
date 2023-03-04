type I_BoxedRadioBase={
	key: `playlist_id:${D_PlaylistIdTypeBase}:${string}`;
	base: "playlist_id";
	type: `playlist_id:${D_PlaylistIdTypeBase}`;
	id: string;
	raw_id: `${D_PlaylistIdTypeBase}${string}`;
}|{
	key: `playlist_id:RDMM:${string}`;
	base: "playlist_id";
	type: `playlist_id:RDMM`;
	info: {
		type: "RDMM";
		id: string;
		raw_id: `RDMM${string}`;
	};
};
