// cspell:ignoreRegexp: /css-1ontqvh/
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
type ReactForwardRef={
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
type ReactElementProps2={
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
type ReactElement2={
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
	return: ReactFiber11;
	child: ReactFiber7;
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
type ReactElementProps={
	className: string;
	children: (ReactElement2[]|ReactElement2|undefined)[];
};

type ReactFiberElement_UList={
	tag: 5;
	key: null;
	elementType: "ul";
	type: "ul";
	stateNode: ElementMap["ul"];
	return: ReactFiber11;
	child: ReactFiber7;
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
	firstEffect: ReactFiber1;
	lastEffect: ReactFiber0;
	lanes: 0;
	childLanes: 0;
	alternate: ReactFiberElement_UList;
};

type ReactFiber5=ReactFiberElement_UList|ReactFiberElement<"div","MuiBox-root css-1ik4laa">;

type ReactFiber1={
	tag: 1;
};

type ReactFiber0_Props={
	page: "Terminal";
};

type ReactFiber0={
	tag: 0;
	key: null;
	elementType: (x: any) => any;
	type: (x: any) => any;
	stateNode: null;
	return: ReactFiberElement<"div","MuiBox-root css-1ik4laa">;
	child: ReactFiber7;
	sibling: ReactFiber11;
	index: number;
	ref: null;
	pendingProps: ReactFiber0_Props;
	memoizedProps: ReactFiber0_Props;
	updateQueue: null;
	memoizedState: null;
	dependencies: null;
	mode: 0;
	flags: 0;
	nextEffect: null;
	firstEffect: ReactFiber1;
	lastEffect: ReactFiber1;
	lanes: 0;
	childLanes: 0;
	alternate: ReactFiber0;
};

type ReactFiber=ReactFiber5|ReactFiber11|ReactFiber7|ReactFiber0;

type ReactFiber11={
	tag: 11;
	key: null;
	elementType: {};
	type: {};
	stateNode: {};
	return: ReactFiber11;
	child: ReactFiber7;
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
type ReactFiber7={
	tag: 7;
	key: null;
	elementType: {};
	type: {};
	stateNode: {};
	return: ReactFiber11;
	child: ReactFiber7;
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