type DI_A_VideoId={
	a: "DI:A";
	// ^ a = is
	b: "video_id";
	// ^ b = type
	w: "/item/a/b/w/z";
	z: [T_DI_FromObj<{raw_id: string;}>];
};
type DI_T_abz<K>=DI_T_abwz_item<K,T_DI_FromObj<{raw_id: string;}>>;
type DI_T_abwz_item<K,T>={a: "DI:A"; b: K; w: "/item/a/b/w/z"; z: [T];};
