type G_StoredChangeItem={
	a: "store_change"; b: "root_visual_element"; d: string;
	z: [make_item_group<number>];
}|{
	a: "store_change"; b: "number"; d: string;
	z: [make_item_group<number>];
}|{
	a: "store_change"; b: "string"; d: string;
	z: [make_item_group<string>];
}|{
	a: "store_change"; b: "keys"; d: string;
	z: [make_item_group<number|string>];
}|{
	a: "store_change"; b: "boolean"; d: string;
	z: [make_item_group<boolean>];
};
