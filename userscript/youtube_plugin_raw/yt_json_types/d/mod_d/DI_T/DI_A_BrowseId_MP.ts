type DI_BrowseId_MP={
	b: "browse_id";
	c: "MP";
	z: [
		T_DI_FromObj<{raw_id: `MP${string}_${string}`;}>,
		T_DI_FromObj<{id: string;}>,
		T_DI_FromObj<{data: "_";}>,
		T_DI_FromObj<{id: string;}>,
	];
};
