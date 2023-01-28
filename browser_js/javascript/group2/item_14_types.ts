/* --- version_list item 1 ---
v1 (cur): snippet_repo/javascript/group2/item_14_types.ts
*/
type Join<T extends string[], U_arg extends string = ","> =
	string[] extends T ? string : T extends [] ? "" : T extends [infer U extends string, infer C extends string, ...infer Z] ? Z extends string[] ?
	Join<Z, U_arg> extends "" ? `${U}${U_arg}${C}` :
	Join<Z, U_arg> extends string ? `${U}${U_arg}${C}${U_arg}${Join<Z, U_arg>}` : `${U}${U_arg}${C}` : `${U}${U_arg}${C}` :
	T extends [infer C extends string, ...infer U] ?
	U extends string[] ? Join<U, U_arg> extends "" ? `${C}` : Join<U, U_arg> extends string ? `${C}${U_arg}${Join<U, U_arg>}` : C : C :
	T[0]
	;
;
function join_as_js<T extends string[], U_arg extends string = ",">(t: T, u_arg: U_arg) {
	function is<_U>(x: string[], _e: "extends", _f: (x: _U) => void) { x; return Math.random() > 0.5; }
	if (is(t, "extends", (_u: string[]) => void 0)) {

	}
	u_arg;
}
type ContentArgsType = {
	empty: ["empty", []];
	cache: ["cache", CacheItemType[]];
	input: ["input", Element];
	vue_app: ["vue_app", {}];
	dom_nodes: ["dom_nodes", Node[]];
	vnodes: ["vnodes", {}];
};
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
type JsonInputType = DataItemReturn | VueAppContainer | Element | Node;
type CacheItemType = { __cache_item: true; } | JsonInputType | Element | HTMLDivElement;
type do_json_replace_functionType<T extends keyof ContentArgsType> = ((...t_args: [res_arr: [string, string | number][][], target_args: ContentArgsType[T]]) => void);
type DataItemReturnBase = | ["TAG::unpack_vnode::2::res", {}[]];
type TagVNodeRes_2 = ["TAG::unpack_vnode::2::res", {}[]];

type TagVNode = ["TAG::vnode", ["CONTENT::cache", HTMLDivElement[]]];

type TagUnpackVNode_1 = ["TAG::unpack_vnode::1", {}];

type TagUnpackVNode_Arr_2 = ["TAG::unpack_vnode::2::res_arr", {}[]];

type TagUnpackVNode_2 = ["TAG::unpack_vnode::2", {}];

type TagVnodeItem = ["TAG::vnode_item", TagVNodeInner];

type DataItemReturn =
	| DataItemReturnBase
	| ["CONTENT::cache", CacheItemType[]]
	| ["CONTENT::empty"]
	| ["TAG::bad_array", any[]]
	| ["TAG::cache_item_result", CacheItemType]
	| ["TAG::cache_item_to_log", CacheItemType]
	| ["TAG::cache_item", number]
	| ["TAG::data", {}]
	| ["TAG::empty"]
	| ["TAG::error", string]
	| ["TAG::failed", null]
	| ["TAG::null_arr", null[]]
	| ["TAG::null", null]
	| ["TAG::parsed_json", DataParsable]
	| ["TAG::result", DataItemReturn]
	| ["TAG::stringify_failed"]
	| ["TAG::stringify_range_error", RangeError]
	| ["TAG::stringify_result", string, number & { _tag: "InputObjBox" }]
	| ["TAG::stringify_seen_failed_obj", number]
	| TagUnpackVNode_1
	| TagUnpackVNode_Arr_2
	| TagVNodeRes_2
	| TagUnpackVNode_2
	| TagVnodeItem
	| TagVNode
	| ["TYPE::parsable_json", string]
	| TagVNodeInner
	| ["TAG::vnode_parse_1", HTMLDivElement[]]
	;
;
type TagVNodeInner = ["TAG::vnode_inner", ["CONTENT::cache", HTMLDivElement[]]];
type TaggedJsonHistory = ["TAG::json_result_history", JsonReplacerState[]];
type MakeTagBoxForNonObject<V, K> = { _inner_tag: K, value: V & { _tag: K } }
type IndexBoxMap = {
	InputObjBox: MakeTagBoxForNonObject<number, "InputObjBox">;
};
type IndexUnboxMap<T, O, U> = Map<T, { _inner_tag: U, value: O & { _tag: U } }>;