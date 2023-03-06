type DI_A_Playlist_RD_GM_EM={
	b: "playlist_id";
	c: "RD:GM:EM";
	z: [
		DIT_Item_AB<"raw_id",T_BoxTypeof<`RDGMEM${string}`>>,
		DIT_Item_AB<"id",T_BoxTypeof<string>>,
	];
};