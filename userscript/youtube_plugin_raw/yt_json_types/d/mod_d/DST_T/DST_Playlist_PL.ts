type DST_Playlist_PL={
	a: "/db/key/a/b/l/z"; b: "boxed_id"; l: "playlist_id:PL";
	key: `boxed_id:playlist_id:PL:${string}`;
	z: [DI_A_Playlist_PL];
};
type GetKJType<T extends {key: any; l: any;},_PK=any>=Pick<T,"key"|"l">;