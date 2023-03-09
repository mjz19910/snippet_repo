type DI_A_VideoId={
	a: "/di/k/z";
	// ^ a = is
	k: "video_id";
	// ^ k = type
	z: [T_DI_FromObj<{raw_id: string;}>];
}|T_DI_FromObj2<{
	video_id: T_DI_FromObj<{
		raw_id: string;
	}>;
}>;;