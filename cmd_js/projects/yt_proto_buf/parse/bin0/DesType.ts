import {ItemType} from "./ItemType.ts";

export type DesType={
	items: (ItemType)[];
	keys: number[];
	keysAlt: number[];
	valueMap: {key: number; value: number;}[];
};
