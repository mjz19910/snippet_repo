type DI_A_Playlist_RD_GM_EM={
	b: "playlist_id";
	c: "RD:GM:EM";
	z: [
		T_DI_FromObj<{raw_id: `RDGMEM${string}`}>,
		T_DI_FromObj<{id: string;}>,
	];
};