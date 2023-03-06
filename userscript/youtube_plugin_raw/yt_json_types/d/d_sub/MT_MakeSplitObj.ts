type MT_MakeSplitObj<T>={
	[U in make_item_group<T>["c"]]: Extract<make_item_group<T>,{u: U;}>|null;
};
