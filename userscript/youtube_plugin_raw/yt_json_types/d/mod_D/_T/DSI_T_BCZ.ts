export type DSI_T_BCZ<T_Tag extends string,T_InfoItem>={
	a: "SI:T:D"; b: "boxed_id"; c: T_Tag;
	key: `boxed_id:${T_Tag}`;
	z: [T_InfoItem];
	descriptive_name?: "generic";
};