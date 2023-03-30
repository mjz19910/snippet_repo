import {ClassComponent} from "../net-fs/api/v100/react_internal/ReactWorkTags.js";
export type mixed=string|number|object;

type HtmlReactElementType="ul"|"div";
type ElementMap={
	div: HTMLDivElement;
	ul: HTMLUListElement;
};
const react_element_symbol=Symbol("react.element");
type react_element_symbol=typeof react_element_symbol;
const react_memo_symbol=Symbol("react.memo");
type react_memo_symbol=typeof react_memo_symbol;
const react_forward_ref_symbol=Symbol("react.forward_ref");
type react_forward_ref_symbol=typeof react_forward_ref_symbol;
export type ReactForwardRef={
	$$typeof: react_forward_ref_symbol;
	render: (n: {},i: null) => any;
};
type ReactMemo={
	$$typeof: react_memo_symbol;
	compare: null;
	type: ReactForwardRef;
};
type ReactElementClasses={
	active: "jss101";
	listitem: "jss102";
};
export type ReactElementProps2={
	key_: "Hacking";
	page: "Terminal";
	classes: ReactElementClasses;
	clickPage: (e: any) => any;
	flash: null;
	icon: ReactMemo;
	items: [
		{key_: "Terminal"; icon: ReactMemo;},
		{key_: "Script Editor"; icon: ReactMemo;},
		{key_: "Active Scripts"; icon: ReactMemo;},
		{key_: "Create Program"; icon: ReactMemo; count: -6;},
	];
	sidebarOpen: boolean;
};
export type ReactElement2={
	$$typeof: react_element_symbol;
	type: ((e: any) => any)|ReactForwardRef;
	key: null;
	ref: null;
	props: ReactElementProps2;
	_owner: null;
};
type ReactFiberElement<ElementType extends HtmlReactElementType,_ClassName extends string>={
	tag: 5;
	key: null;
	elementType: ElementType;
	type: ElementType;
	stateNode: ElementMap[ElementType];
	return: ReactFiberForwardRef;
	child: ReactFiberFragment;
	sibling: null;
	index: number;
	ref: null;
	pendingProps: {
		className: "MuiList-root MuiList-padding";
		children: [undefined,ReactElement2[]]|[ReactElement2,ReactElement2];
	};
	memoizedProps: {
		className: "MuiList-root MuiList-padding";
		children: [undefined,ReactElement2[]]|[ReactElement2,ReactElement2];
	};
	updateQueue: null;
	memoizedState: null;
	dependencies: null;
	mode: 0;
	flags: 0;
	nextEffect: null;
	firstEffect: {};
	lastEffect: {};
	lanes: 0;
	childLanes: 0;
	alternate: {};
};
export type ReactElementProps={
	className: string;
	children: (ReactElement2[]|ReactElement2|undefined)[];
};
type ReactFiberElement_UList={
	tag: 5;
	key: null;
	elementType: "ul";
	type: "ul";
	stateNode: ElementMap["ul"];
	return: ReactFiberForwardRef;
	child: ReactFiberFragment;
	sibling: null;
	index: number;
	ref: null;
	pendingProps: ReactElementProps;
	memoizedProps: {
		className: "MuiList-root MuiList-padding";
		children: [undefined,ReactElement2[]]|[ReactElement2,ReactElement2];
	};
	updateQueue: null;
	memoizedState: null;
	dependencies: null;
	mode: 0;
	flags: 0;
	nextEffect: null;
	firstEffect: ReactFiberClassComponent;
	lastEffect: ReactFiberFunctionComponent;
	lanes: 0;
	childLanes: 0;
	alternate: ReactFiberElement_UList;
};

export type ReactFiberHostComponent=ReactFiberElement_UList|ReactFiberElement<"div","MuiBox-root css-1ik4laa">;
type ReactFiberClassComponent={
	tag: typeof ClassComponent;
};
type ReactElementProps3={
	page: "Terminal";
};
type ReactFiberFunctionComponent={
	tag: 0;
	key: null;
	elementType: (x: any) => any;
	type: (x: any) => any;
	stateNode: null;
	return: ReactFiberElement<"div","MuiBox-root css-1ik4laa">;
	child: ReactFiberFragment;
	sibling: ReactFiberForwardRef;
	index: number;
	ref: null;
	pendingProps: ReactElementProps3;
	memoizedProps: ReactElementProps3;
	updateQueue: null;
	memoizedState: null;
	dependencies: null;
	mode: 0;
	flags: 0;
	nextEffect: null;
	firstEffect: ReactFiberClassComponent;
	lastEffect: ReactFiberClassComponent;
	lanes: 0;
	childLanes: 0;
	alternate: ReactFiberFunctionComponent;
};
export type ReactFiberForwardRef={
	tag: 11;
	key: null;
	elementType: {};
	type: {};
	stateNode: {};
	return: ReactFiberForwardRef;
	child: ReactFiberFragment;
	sibling: null;
	index: number;
	ref: null;
	pendingProps: {};
	memoizedProps: {};
	updateQueue: null;
	memoizedState: null;
	dependencies: null;
	mode: 0;
	flags: 0;
	nextEffect: null;
	firstEffect: {};
	lastEffect: {};
	lanes: 0;
	childLanes: 0;
	alternate: {};
};
export type ReactFiberFragment={
	tag: 7;
	key: null;
	elementType: {};
	type: {};
	stateNode: {};
	return: ReactFiberForwardRef;
	child: ReactFiberFragment;
	sibling: null;
	index: number;
	ref: null;
	pendingProps: {};
	memoizedProps: {};
	updateQueue: null;
	memoizedState: null;
	dependencies: null;
	mode: 0;
	flags: 0;
	nextEffect: null;
	firstEffect: {};
	lastEffect: {};
	lanes: 0;
	childLanes: 0;
	alternate: {};
};
export type Dependencies={__not_impl: true;};
export type Source={__not_impl: true;};
export type HookType={__not_impl: true;};
export type Lanes={__not_impl: true;};
export type TypeOfMode={__not_impl: true;};
export type Flags={__not_impl: true;};