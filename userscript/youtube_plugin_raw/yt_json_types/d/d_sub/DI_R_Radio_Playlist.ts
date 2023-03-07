type DI_R_Radio_Playlist={
	a: "DI:R";
	b: "raw";
	c: "playlist_id:RD";
	z: [T_DI_FromObj<{raw_id: Extract<DU_Playlist_Id,`RD${string}`>;}>];
};