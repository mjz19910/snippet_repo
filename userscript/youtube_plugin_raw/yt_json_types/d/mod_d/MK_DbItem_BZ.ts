type MK_DbItem_BZ<T extends {b: string; z: [T_DI_FromObj<{raw_id: string;}>];},J extends string=T["b"],K extends string=T extends {b: string; z: [T_DI_FromObj<{raw_id: infer I;}>];}? I:never>={
	key: `boxed_id:${J}:${K}`;
	a: "ST:D"; b: "boxed_id"; j: J; w: "/db/key/a/b/j/w/z"; z: [T];
};
