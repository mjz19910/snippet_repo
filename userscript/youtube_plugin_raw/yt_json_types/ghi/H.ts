type KeyMap={
	1: "tag",
	2: "id",
};
type O0=G_PR_TrackingObj;
type H_TrackingObj={
	t: import("../../zc_child_modules/YTPlugin_HandleTypes.user.js").HandleTypes,
	num(
		x: T_D32<number>,
		k: `${keyof ({[U in keyof O0 as KeyMap[Extract<keyof KeyMap,U>]|`f${O0[U] extends (T_D32<any>|undefined)?Exclude<U,keyof KeyMap>:never}`]: U})}`
	): void;
	h_tagged_2(o: {tag: P_RT_TK_f1,id: P_RT_TK_f2;}): void;
	handle_timestamp(x: VW_BinaryTimestamp): void;
	handle_f3(x: P_RT_TK_f3): void;
	handle_f6(x: P_RT_TK_f6): void;
};
