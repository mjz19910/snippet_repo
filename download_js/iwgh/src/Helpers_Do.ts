import {H} from "../Helpers.ts";

type PageTypeShape={id: string;};
export type RunTakeAct<T extends H.ItemShape>={take: T;};
type PageWithActShape<T>={
	id: string;
	action: T;
};
type ExtractItemTakeAction<I extends number,T extends H.ItemShape>=PageWithActShape<H.ActionArrExt<Record<I,H.TakeAction<T>>>>;
export type RunTakeAct2<U extends ExtractItemTakeAction<I,T>,I extends number,T extends H.ItemShape>={
	target: U;
	index: I;
	take: T;
};
export type ActivateRoom<Room extends PageTypeShape,PosAfter=never>={room: Room; pos_after: PosAfter;};
export type UseInventory<T extends H.ItemShape>={target: T;};
export type UseAction<
	U extends PageWithActShape<H.UseAction<T>>,
	T extends H.ItemShape
>={
	pos: U["id"],target: U["action"];
};
type ExtractItemUseAction<
	I extends number,T extends H.ItemShape
>=PageWithActShape<H.ActionArrExt<Record<I,H.UseAction<T>>>>;

export type UseAction2<
	U extends ExtractItemUseAction<I,T>,
	I extends number,T extends H.ItemShape
>={
	target: U;
	index: I;
	use: T;
};
export type UseInventory2<T extends H.ItemShape[]>={targets: T;};
export type UseMenu<T extends PageTypeShape>={target: T;};
