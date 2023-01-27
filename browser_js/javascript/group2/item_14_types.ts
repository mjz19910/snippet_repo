/* --- version_list item 1 ---
v1 (cur): snippet_repo/javascript/group2/item_14_types.ts
*/
type ContentArgsType={
	empty: ["empty",[]];
	cache: ["cache",CacheItemType[]];
	input: ["input",[Element|null]];
	vue_app: ["vue_app",{}];
	dom_nodes: ["dom_nodes",Node[]];
	vnodes: ["vnodes",{}];
};
type DataParsable={
	__parsable_tag: true;
};
type VueApp={
	_instance: {
		uid: number;
		vnode: VueVnode;
	};
};
type VueVnode={
	__v_isVNode: true;
	__v_skip: true;
	type: {};
	props: null;
};
type VueComponent={
	vnode: VueVnode;
};
type JsonInputType={
	component: VueComponent;
	_container: null;
	__Z_ignore_replacement?: boolean;
	__vue_app__: VueApp;
}|Node;
type CacheItemType={__cache_item: true;}|JsonInputType|Element;
type JsonParseArgs<T extends keyof ContentArgsType>=ContentArgsType[T];
type do_json_replace_functionType<T extends keyof ContentArgsType>=((...t_args: [res_arr: [string,string|number][][],target_args: JsonParseArgs<T>]) => void);

type DataItemReturn=|["TAG::vnode_item",{}]|[
	["TAG::unpack_vnode::1",{}],
	["TAG::vnode",{}],
	["TAG::vnode_inner",{}],
	["TAG::unpack_vnode::2",{}],
	["TAG::unpack_vnode::2::res",{}],
	["TAG::unpack_vnode::2::res_arr",{}[]],
	["TAG::failed",null],
	["TAG::null_arr",null[]],
	["TAG::cache_item",number],
	["TAG::null",null],
	["TAG::stringify_result",string],
	["TAG::parsed_json",DataParsable],
	["CONTENT::empty"],
	["CONTENT::cache",CacheItemType[]],
	["TAG::cache_item_to_log",CacheItemType],
	["TAG::cache_item_result",CacheItemType],
	["TAG::bad_array",any[]],
	["TAG::data",{}],
	["TAG::empty"],
][number];