type DI_A_VideoId={
	a: "DI:A";
	// ^ a = is
	b: "video_id";
	// ^ b = type
	w: "a/b/w/z";
	z: [T_DI_FromObj<{raw_id: string;}>];
};
type DI_T_abz<T>={a: "DI:A"; b: T; w: "a/b/w/z"; z: [T_DI_FromObj<{raw_id: string;}>];};
