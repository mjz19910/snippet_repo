export type PageTypeShape={
	id: string;
};
export type ItemShape={
	type: "item";
	id: string;
}|{
	type: "item";
	item: {
		type: string;
		id: string;
	};
};
export type TakeAction<T extends ItemShape>={
	fn: "take";
	item: T;
};
export type WallPostAct={
	dst: "wall_post.php",
	message: string,
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
	required: ItemShape|StoryEventShape|StoryPosShape|UseActionShape;
}>={
	fn: "take";
	item: ActionProps["item"];
	required: ActionProps['required'];
};
type TakeActionShape={
	fn: "take";
	item: ItemShape;
};
type ActionShape=UseActionShape|TakeActionShape|StoryEvent<{required: ItemShape;}>;
export type TakeActionR2<ActionProps extends {
	item: ItemShape;
	requirements: ItemShape[];
}>={
	fn: "take";
	item: ActionProps["item"];
	requirements: ActionProps['requirements'];
};
export type ActionArrExt<T>={
	type: "multi";
	arr: T;
};
export type ActionArrExt2<T>=PageWithActShape<ActionArrExt<T>>;
export type ActionArr<T extends ActionShape[]>=ActionArrExt<T>;
export type StoryEvent<ActionProps extends {
	required: ItemShape|{
		type: "story_pos";
		pos: "after lockdown";
	};
}>={
	type: "story";
	activate: "load";
	required: ActionProps['required'];
};
export type Not<T>={
	type: "not";
	v: T;
};
export type PageWithActShape<T>={
	id: string;
	action: T;
};
