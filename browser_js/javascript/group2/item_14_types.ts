/* --- version_list item 1 ---
v1 (cur): snippet_repo/javascript/group2/item_14_types.ts
*/
type DataParsable = {
	__parsable_tag: true;
};
type VueApp = {
	_instance: {
		uid: number;
		vnode: VueVnode;
	};
};
type VueVnode = {
	__v_isVNode: true;
	__v_skip: true;
	type: {};
	props: null;
};
type VueComponent = {
	vnode: VueVnode;
};
type VueAppContainer = {
	component: VueComponent;
	_container: null;
	__Z_ignore_replacement?: boolean;
	__vue_app__: VueApp;
};
type StackLimitReturn = {
	target: number,
	min: number,
	required_start: number,
	start: number,
	zero: number,
	last_crash: number,
	max: number,
	tries: number,
	requested_start: number,
	requested_target: number,
};
type JsonInputType =
	| VueAppContainer
	| Element
	| Node
	| HTMLDivElement;
type CacheItemType = JsonInputType;
type DataItemReturn =
	| ["TYPE::DBG::What", { __what: true; }]
	| ["TYPE::DataItemReturn", DataItemReturn]
	| ["TYPE::JsonInputType", JsonInputType]
	| ["EVENT::input", Element]
	| ["EVENT::vue_app", VueApp]
	| ["EVENT::vnodes", VueVnode[]]
	| ["EVENT::dom_nodes", Node[]]
	| ["EVENT::json_cache", JsonInputType[]]
null;
type MakeTagBoxForNonObject<V, K> = { _inner_tag: K, value: V & { _tag: K } }
type IndexBoxMap = {
	InputObjBox: MakeTagBoxForNonObject<number, "InputObjBox">;
};
type IndexUnboxMap<T, O, U> = Map<T, { _inner_tag: U, value: O & { _tag: U } }>;
type InputObjBoxItem = { __tag: "InputObjBox"; item_level: 2; };
type CacheIndexWithArr = {
	cache_index: number;
};

type IterObjectStoreType = {
	cache_index: number;
	arr: CacheIndexWithArr[][];
};

type IterHistoryResult = {
	cache: CacheIndexWithArr[];
	result_history: JsonHistoryType[];
	object_store: {}[];
	x1: number[];
};
type JsonHistoryType = { id: number; items: {}[] };