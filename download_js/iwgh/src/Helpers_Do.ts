import {H} from "../Helpers.ts";

type PageMenuItems=[
	{id: "main";},{id: "dictionary";},{id: "communication";},
	{id: "members";},
	{id: "faq";},
];
type PageTypeShape={id: string;};
export type RunTakeAct<T extends H.ItemShape>={take: T;};
type ExtractItemTakeAction<I extends number,T extends H.ItemShape>={
	id: string,
	action: H.ActionArrExt<{[Z in I]: H.TakeAction<T>;}>;
};
export type RunTakeAct2<U extends ExtractItemTakeAction<I,T>,I extends number,T extends H.ItemShape>={
	target: U;
	index: I;
	take: T;
};
export type ActivateRoom<Room extends PageTypeShape,PosAfter=never>={room: Room; pos_after: PosAfter;};
export type UseInventory<T extends H.ItemShape>={target: T;};
export type UseAction<U extends {
	id: string,
	action: H.UseAction<T>,
},T extends H.ItemShape>={pos: U["id"],target: U["action"];};
type ExtractItemUseAction<I extends number,T extends H.ItemShape>={
	id: string,
	action: H.ActionArrExt<{[Z in I]: H.UseAction<T>;}>;
};

export type UseAction2<U extends ExtractItemUseAction<I,T>,I extends number,T extends H.ItemShape>={
	target: U;
	index: I;
	use: T;
};
export type UseInventory2<T extends H.ItemShape[]>={targets: T;};
export type UseMenu<T extends {id: string;}>={target: T;};
