export type ItemShape={
	type: "item";
	id: string;
};
export type TakeAction<T extends ItemShape>={
	fn: "take";
	item: T;
};
export type TakeActionStr<T extends string>={
	fn: "take";
	item: T;
};
export type UseAction<T extends ItemShape>={
	fn: "use";
	usingItem: T;
};
export type UseActionStr<T extends string>={
	fn: "use";
	usingItem: T;
};
export type UseAction2<P extends {
	v: ItemShape;
	caption: string;
}>={
	fn: "use";
	usingItem: P["v"];
	caption: P["caption"];
};
type UseActionShape={
	fn: "use";
	usingItem: ItemShape|string;
};
export type Decay<T>={[U in keyof T]: T[U];};
export type StoryEventShape={
	type: "story_event";
	id: string;
	value: StoryEvent<{
		required: ItemShape;
	}>,
};
type StoryPosShape={
	type: "story_pos";
	pos: string;
};
export type TakeActionR<ActionProps extends {
	item: ItemShape;
	required: ItemShape|StoryEventShape|StoryPosShape;
}>={
	fn: "take";
	item: ActionProps["item"];
	required: ActionProps['required'];
};
type TakeActionShape={
	fn: "take";
	item: ItemShape;
};
type ActionShape=UseActionShape|TakeActionShape;
export type TakeActionR2<ActionProps extends {
	item: ItemShape;
	requirements: ItemShape[];
}>={
	fn: "take";
	item: ActionProps["item"];
	requirements: ActionProps['requirements'];
};
export type ActionArr<T extends ActionShape[]>={
	type: "multi";
	arr: T;
};
export type StoryEvent<ActionProps extends {
	required: ItemShape;
}>={
	type: "story";
	activate: "load";
	required: ActionProps['required'];
};
export type Not<T>={
	type: "not";
	v: T;
};
