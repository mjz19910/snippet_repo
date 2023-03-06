type G_StoredChangeItem={
	a: "root_visual_element"; d: string;
	z: [make_item_group<number>];
}|{
	a: "number"; d: string;
	z: [make_item_group<number>];
}|{
	a: "string"; d: string;
	z: [make_item_group<string>];
}|{
	a: "keys"; d: string;
	z: [make_item_group<number|string>];
}|{
	a: "boolean"; d: string;
	z: [make_item_group<boolean>];
};
