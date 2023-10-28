import {H} from "../Helpers.ts";

export type RunTakeAct<U extends H.PageWithActShape<H.TakeAction<T>>,T extends H.ItemShape>={
	target: U;
	take: T;
};
type ExtractItemTakeAction<I extends number,T extends H.ItemShape>=H.ActionArrExt2<Record<I,H.TakeAction<T>>>;
export type RunTakeAct2<U extends ExtractItemTakeAction<I,T>,I extends number,T extends H.ItemShape>={
	target: U;
	index: I;
	take: T;
};
export type ActivateRoom<Room extends {
	id: string;
	action: H.TakeAction<H.ItemShape>|
	H.StoryEvent<{
		required: H.ItemShape;
	}>|
	H.ActionArr<(
		H.TakeAction<H.ItemShape>|
		H.UseAction<H.ItemShape>|
		H.StoryEvent<{
			required: H.ItemShape;
		}>
	)[]>;
},PosAfter=never>={
	room: Room;
	pos_after: PosAfter;
};
export type ActivateStory<T extends {
	type: "story";
}>={
	type: "activate_story"; target: T;
};
export type UseInventory<T extends H.ItemShape>={target: T;};
export type UseAction<
	U extends H.PageWithActShape<H.UseAction<T>>,
	T extends H.ItemShape
>={
	pos: U["id"];
	target: U["action"];
};
type ExtractItemUseAction<
	I extends number,T extends H.ItemShape
>=H.ActionArrExt2<Record<I,H.UseAction<T>>>;

export type UseAction2<
	U extends ExtractItemUseAction<I,T>,
	I extends number,T extends H.ItemShape
>={
	target: U;
	index: I;
	use: T;
};
export type UseInventory2<T extends H.ItemShape[]>={targets: T;};
export type UseMenu<T extends H.PageTypeShape>={target: T;};
