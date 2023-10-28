import {H} from "../Helpers.ts";

type PageMenuItems=[
	{id: "main";},{id: "dictionary";},{id: "communication";},
	{id: "members";},
	{id: "faq";},
];
type PageTypeShape={id: string;};
export type RunTakeAct<T extends H.ItemShape>={take: T;};
export type ActivateRoom<Room extends PageTypeShape,PosAfter=never>={room: Room; pos_after: PosAfter;};
export type UseInventory<T extends H.ItemShape>={target: T;};
export type UseAction<U extends {
	id: string,
	action: {
		fn: "use",
		usingItem: T;
	},
},T extends H.ItemShape>={pos: U["id"],target: U["action"];};
export type UseInventory2<T extends H.ItemShape[]>={targets: T;};
export type UseMenu<T extends PageMenuItems[number]>={target: T;};
export type UseBold<T>={target: T;};
export type FollowChain<T extends {
	quest_chain: ({
		id: string;
	}|{
		take: H.ItemShape;
	}|{
		target: H.ItemShape;
	}|{
		target: {
			id: string;
		};
	})[];
}>={
	do: {
		type: "follow";
		dst: "quest_chain";
	};
	follow_chain: Pick<T,"quest_chain">;
};
export type AssertPageIs<T>={is: T;};
