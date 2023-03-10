type DST_Playlist_PL={
	a: DST_KStr_AKLZ; k: "boxed_id"; l: "playlist_id"; m: "PL";
	key: `boxed_id:playlist_id:PL:${string}`;
	z: [DI_A_Playlist_PL];
};
type GetKJType<T extends {key: any; l: any;},_PK=any>=Pick<T,"key"|"l">;