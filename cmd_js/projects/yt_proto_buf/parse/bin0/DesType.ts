import {ItemType} from "./ItemType.js";

export type DesType={
	items: (ItemType)[];
	keys: number[];
	keysAlt: number[];
	valueMap: {key: number; value: number;}[];
};
