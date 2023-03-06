type DI_A_Playlist_PL={
	b: "playlist_id";
	c: "PL";
	z: [
		T_DI_FromObj<{raw_id: T_IdTemplate<"PL">;}>,
		T_DI_FromObj<{id: string;}>,
	];
};