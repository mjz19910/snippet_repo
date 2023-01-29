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
	| JsonEventResult
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
type UnpackUnitArgs = {
	[U in JsonUnpackValue[0]]: Extract<JsonUnpackValue, [U, any]> extends infer V extends Extract<JsonUnpackValue, [U, any]> ? [V[0], V[1][number]] : never;
}[JsonUnpackValue[0]];

type UnpackUnitCommand = ["COMMAND::unpack_unit", UnpackUnitArgs];
type NodeContentInfo = ["CONTENT::Node", string, 3, string | null];
type Alt<T extends string> = `${T}:1`;
type MakeAlt<T extends [any, ...any]> = T extends [infer F, ...infer R] ? [Alt<`${F & string}`>, ...R] : never;
type DataItemReturnAlt = MakeAlt<DataItemReturn>
	| MakeAlt<["TYPE::wrap", WhatInfoItem | NodeContentInfo | UnpackUnitCommand | UnpackCommand]>
	;
type WhatInfoObj = {
	__what: true;
};
type WhatInfoItem = ["TYPE::DBG_What", WhatInfoObj];

type JsonEventResult = [type: "handle_result", from: DataItemReturn extends infer U extends DataItemReturn ? { [Symbol.toStringTag]: U[0] } : never, data: [results: string[], command_results: string[]]] | ["string", string[]];
type DataItemTag = DataItemReturn;
type DataItemReturn =
	| WhatInfoItem
	| ["TYPE::DataItemReturn", ["DataItemReturn", DataItemReturn[]]]
	| ["EVENT::input", ["Element", Element[]]]
	| ["EVENT::vue_app", ["VueApp", VueApp[]]]
	| ["EVENT::vnodes", ["VueVnode", VueVnode[]]]
	| ["EVENT::dom_nodes", ["Node", Node[]]]
	| ["EVENT::json_cache", ["JsonInputType", JsonInputType[]]]
	| ["RESULT::handle_json_event", JsonEventResult]
	| NodeContentInfo
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

type IterHistoryResult = ReturnType<typeof iter_history_result>;
type JsonHistoryType = { id: number; items: {}[] };
namespace NS_NumRange {
	export type NextMakeNum_3<U extends any[], T> = [any, ...U]['length'] extends T ? [any, any, ...U]['length'] : NextMakeNum_3<[any, ...U], T>;
	type NumRange_1<T, E> = T extends E ? T : NextMakeNum_3<[], T> extends E ? E : T | NextMakeNum_3<[], T> | NumRange_1<NextMakeNum_3<[], T>, E>;
	export type NumRange<T, E> = T extends E ? T : T | NextMakeNum_3<[], T> | NumRange_1<NextMakeNum_3<[], T>, E>;
	type NextMakeNum_2<T> = T extends `${infer C extends number}` ? `-${NS_NumRange.NextMakeNum_3<[], C>}` extends `${infer V extends number}` ? V : never : never;
	type NextMakeNum_1<U extends any[], T> = [any, ...U]['length'] extends T ? [U, T][0]['length'] : NextMakeNum_1<[any, ...U], T>;
	type NextMakeNum<T extends number> = [any]["length"] extends T ? 0 : NextMakeNum_1<[any], T>;
	type MakeNumRange<T extends number> = `${T}` extends `-${infer NotNeg}` ? NextMakeNum_2<NotNeg> : []["length"] extends T ? -1 : NextMakeNum<T>;
	export type MakeNumRes = MakeNumRange<1>;
	export type MakeNum2 = NextMakeNum_2<`5`>;
	export type NumAddRes = NS_NumRange.NextMakeNum_3<[], 3>;
	type MR = NumRange<1, 8>;
	type MR2 = NumRange<2, 3>;
	type MR2_1<T, E> = T | NextMakeNum_3<[], T> | NumRange_1<NextMakeNum_3<[], T>, E>;
	type MR2d = MR2_1<2, 3>;
	export type CC = `${MR}`;
	export type CC_Arr = [
		`${MR2}`,
		`${MR2d}`,
	];
}
type NumRange<T, E> = NS_NumRange.NumRange<T, E>;
interface ChromeDomNode extends Node {
	get wholeText(): string;
}