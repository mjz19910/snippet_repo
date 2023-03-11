type D_ManyValue={
	l: "many";
	z: [any[][]];
};
type D_ArrValue={
	l: "arr";
	z: [any[]];
};
type D_ExactValue={
	l: "one";
	z: [any];
};
type DST_Group={
	key: `boxed_id:${string}:${string}`;
	z: [make_item_group<any>];
	_z: [string,string];
};
type DST_SaveId={
	key: "boxed_id:save_id";
	z: [number];
	_z: ["save_id"];
};
type DST_LoadId={
	key: "boxed_id:load_id";
	z: [number];
	_z: ["load_id"];
};
type G_BoxedDatabaseData=DST_SaveId|DST_LoadId|DST_Group;
