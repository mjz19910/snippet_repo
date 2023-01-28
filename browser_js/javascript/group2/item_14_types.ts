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
type JsonUnpackValue =
	| ["JsonInputType", JsonInputType[]]
	| ["Element", Element[]]
	| ["VueApp", VueApp[]]
	| ["DataItemReturn", DataItemReturn[]]
	| ["Node", Node[]]
	| ["string", string[]]
	| ["VueVnode", VueVnode[]]
	| ["any", any[]]
	;
;
type UnpackCommand = ["COMMAND::unpack", JsonUnpackValue];
type PendingCommandItem =
	| ["unpack", UnpackCommand]
	| ["unit", UnpackUnitCommand]
	;
;
type UnpackUnitCommand = [
	"COMMAND::unpack_unit",
	{
		[U in JsonUnpackValue[0]]:
		Extract<JsonUnpackValue, [U, any]> extends infer V extends Extract<JsonUnpackValue, [U, any]> ? [V[0], V[1][number]] : never
	}[JsonUnpackValue[0]]
]
type DataItemReturn =
	| ["TYPE::DBG_What", { __what: true; }]
	| ["TYPE::DataItemReturn", ["DataItemReturn", DataItemReturn[]]]
	| ["EVENT::input", ["Element", Element[]]]
	| ["EVENT::vue_app", ["VueApp", VueApp[]]]
	| ["EVENT::vnodes", ["VueVnode", VueVnode[]]]
	| ["EVENT::dom_nodes", ["Node", Node[]]]
	| ["EVENT::json_cache", ["JsonInputType", JsonInputType[]]]
	| ["RESULT::handle_json_event", ["string", string[]]]
	| UnpackCommand
	| UnpackUnitCommand
	;
;
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