type DIT_Item<T,T_InfoItem>={
	type: T;
	info_arr: [T_InfoItem];
};
type DIT_Item_3<T,T_Tag,T_InfoItem>={
	type: T;
	tag: T_Tag;
	info_arr: [T_InfoItem];
};
