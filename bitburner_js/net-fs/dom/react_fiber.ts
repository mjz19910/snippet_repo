type HtmlReactElementType="ul"|"div";
type ElementMap={
	div: HTMLDivElement;
	ul: HTMLUListElement;
};
const react_element_symbol=Symbol("react.element");
type react_element_symbol=typeof react_element_symbol;
type ReactElement2={
	"$$typeof": react_element_symbol;
};
type ReactFiberElement<ElementType extends HtmlReactElementType>={
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
type ReactFiberElement_UList=ReactFiberElement<"ul">;

type ReactFiber5=ReactFiberElement_UList|ReactFiberElement<"div">;

type ReactFiber=ReactFiber5|ReactFiber11|ReactFiber7;

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