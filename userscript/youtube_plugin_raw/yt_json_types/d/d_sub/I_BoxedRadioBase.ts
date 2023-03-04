type I_BoxedRadioBase={
	key: `playlist_id:RD:${string}`;
	base: "playlist_id";
	type: `playlist_id:RD`;
	id: string;
	raw_id: `RD${string}`;
}|{
	key: `playlist_id:PL:${string}`;
	base: "playlist_id";
	type: `playlist_id:PL`;
	id: string;
	raw_id: `PL${string}`;
}|{
	key: `playlist_id:UU:${string}`;
	base: "playlist_id";
	type: `playlist_id:UU`;
	id: string;
	raw_id: `UU${string}`;
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
