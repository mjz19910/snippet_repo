type G_Boxed_StrArr=[
	Join<Extract<G_Boxed_StrExtract,[any,any]>,":">,
	// 3
	Join<Extract<G_Boxed_StrExtract,[any,any,any]>,":">,
	// 4
	Join<Exclude<Extract<G_Boxed_StrExtract,[any,any,any,any]>,[any,any,"FE",any]>,":">,
	Join<Extract<Extract<G_Boxed_StrExtract,[any,any,any,any]>,[any,any,"FE",any]>,":">,
	// 5
	Join<Extract<G_Boxed_StrExtract,[any,any,any,any,any]>,":">,
	// 6
	Join<Extract<G_Boxed_StrExtract,[any,any,any,any,any,any]>,":">
];
