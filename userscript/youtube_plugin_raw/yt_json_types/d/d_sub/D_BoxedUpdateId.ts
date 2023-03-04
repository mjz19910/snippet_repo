type D_BoxedUpdateId={
	key: "boxed_id:a:update_id";
	type: "update_id";
	base: "boxed_id";
	id: number;
}|{
	key: "boxed_id:a:load_id";
	type: "load_id";
	base: "boxed_id";
	id: number;
}|{
	key: "boxed_id:a:save_id";
	type: "save_id";
	base: "boxed_id";
	id: number;
};
