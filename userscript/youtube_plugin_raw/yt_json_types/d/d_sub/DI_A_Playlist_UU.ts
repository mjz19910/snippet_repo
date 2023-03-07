type DI_A_Playlist_UU={
	b: "playlist_id";
	c: "UU";
	z: [
		T_DI_FromObj<{raw_id: `UU${string}`}>,
		T_DI_FromObj<{id: string;}>
	];
};