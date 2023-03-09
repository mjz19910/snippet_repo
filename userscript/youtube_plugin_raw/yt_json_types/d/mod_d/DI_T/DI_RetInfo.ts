type DI_RetInfo={
	a: "tag"; k: "any"; c: "FE";
	raw_id: T_IdTemplate<"FE">;
}|{
	a: "tag"; k: "any"; c: "SP";
	raw_id: T_IdTemplate<"SP">;
}|{
	a: "tag"; k: "any"; c: "VL";
	raw_id: T_IdTemplate<"VL">;
}|{
	a: "tag"; k: "any"; c: "UC";
	raw_id: T_IdTemplate<"UC">;
}|{
	a: "tag"; k: "any"; c: "PL";
	raw_id: T_IdTemplate<"PL">;
}|{
	a: "tag"; k: "any"; c: "MP";
	raw_id: T_IdTemplate<"MP">;
}|{
	a: "tag"; k: "any"; c: "UU";
	raw_id: T_IdTemplate<"UU">;
}|{
	a: "tag"; k: "any"; c: "RD";
	raw_id: Extract<DU_Playlist_Id,`RD${string}`>;
}|{
	a: "tag"; k: "any"; c: null;
	raw_id: DU_Playlist_Static;
}|DI_Ret_AnyString|{
	a: "tag"; k: "start_radio";
	raw_id: DU_StartRadio;
}|{
	a: null;
};
