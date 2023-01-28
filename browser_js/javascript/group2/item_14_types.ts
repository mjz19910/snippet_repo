/* --- version_list item 1 ---
v1 (cur): snippet_repo/javascript/group2/item_14_types.ts
*/
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
type JsonInputType = any[]|DataItemReturn|VueAppContainer | Element | Node;
type CacheItemType = { __cache_item: true; } | JsonInputType | Element;
type do_json_replace_functionType<T extends keyof ContentArgsType> = ((...t_args: [res_arr: [string, string | number][][], target_args: ContentArgsType[T]]) => void);

type DataItemReturn = | ["TAG::vnode_item", {}] | [
	"TAG::stringify_failed",
	["CONTENT::cache", CacheItemType[]],
	["CONTENT::empty"],
	["TAG::bad_array", any[]],
	["TAG::cache_item_result", CacheItemType],
	["TAG::cache_item_to_log", CacheItemType],
	["TAG::cache_item", number],
	["TAG::data", {}],
	["TAG::empty"],
	["TAG::failed", null],
	["TAG::null_arr", null[]],
	["TAG::null", null],
	["TAG::parsed_json", DataParsable],
	["TAG::stringify_range_error", RangeError],
	["TAG::stringify_result", string, InputObjBox],
	["TAG::stringify_seen_failed_obj",number],
	["TAG::unpack_vnode::1", {}],
	["TAG::unpack_vnode::2::res_arr", {}[]],
	["TAG::unpack_vnode::2::res", {}],
	["TAG::unpack_vnode::2", {}],
	["TAG::vnode_inner", {}],
	["TAG::vnode", {}],
	["TAG::error",string],
][number];