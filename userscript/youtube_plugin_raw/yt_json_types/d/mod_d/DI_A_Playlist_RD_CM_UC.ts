type DI_A_Playlist_RD_CM_UC={
	b: "playlist_id";
	c: "RD:CM:UC";
	z: [
		T_DI_FromObj<{raw_id: `RDCMUC${string}`;}>,
		T_DI_FromObj<{id: string;}>,
	];
};
