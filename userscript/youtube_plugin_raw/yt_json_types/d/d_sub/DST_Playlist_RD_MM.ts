type DST_Playlist_RD_MM={
	a: "ST:D";
	b: "boxed_id";
	j: "playlist_id:RD:MM";
	key: `boxed_id:playlist_id:RD:MM:${string}`;
	z: [DI_A_Playlist_RD_MM];
};
type DST_Playlist_RD_CM_UC={
	a: "ST:D";
	b: "boxed_id";
	j: "playlist_id:RD:CM:UC";
	key: `boxed_id:playlist_id:RD:CM:UC:${string}`;
	z: [DI_A_Playlist_RD_CM_UC];
};