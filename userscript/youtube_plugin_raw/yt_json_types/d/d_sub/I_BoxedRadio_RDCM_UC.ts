type I_BoxedRadio_RDCM_UC={
	key: `playlist_id:RDCM:UC:${string}`;
	base: "playlist_id";
	type: "playlist_id:RDCM";
	id: `UC${string}`;
	raw_id: `RDCMUC${string}`;
	id_info: {
		type: "UC";
		id: string;
		raw_id: `UC${string}`;
	};
};
