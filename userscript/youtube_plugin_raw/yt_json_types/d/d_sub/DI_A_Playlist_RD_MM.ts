type DI_A_Playlist_RD_MM={
	b: "playlist_id";
	c: "RD:MM";
	z: [
		T_DI_FromObj<{raw_id: `RDMM${string}`}>,
		T_DI_FromObj<{id: string;}>,
	];
};