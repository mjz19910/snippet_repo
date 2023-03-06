type DSI_Item_BoxedId<T_Tag extends string,T_InfoItem>={
	b: "boxed_id";
	tag: T_Tag;
	key: `boxed_id:${T_Tag}`;
	z: [T_InfoItem];
};
